import { readingResultRequest, readingTodayRequest } from "@/apis";
import type {
  ReadingCardsRequestDTO,
  ReadingResultRequestDTO,
  ReadingTodayRequestDTO,
} from "@/apis/request/reading";
import type { ReadingResultResponseDTO } from "@/apis/response/reading";
import type {
  ReadingCard,
  ReadingCardWithImg,
  TarotCardResponseDTO,
} from "@/apis/response/tarotcard";
import SpeechBubble from "@/components/bubble/Bubble";
import PageTitle from "@/components/common/PageTitle";
import SkeletonPageTitle from "@/components/skeletons/SkeletonPageTitle";
import CardDeck from "@/components/tarotcard/CardDeck";
import CardItem from "@/components/tarotcard/CardItem";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { TAROT_CARDS_CONST } from "@/constants/tarotCards";
import { useGlobalAlertDialog } from "@/stores/useGlobalAlertDialog";
import { useTarotCardStore } from "@/stores/useTarotCardStore";
import { ResponseCode } from "@/types/enums";
import { getCardImg } from "@/utils/imageMapper";
import { RefreshCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Button } from "../../components/ui/button";
import LoadingScreen from "./LoadingScreen";

type PickState = {
  categoryId: number;
  category: string;
  spreadPosition: string[];
  questionText: string;
  spreadType: string;
  spreadCount: number;
};

type ActiveCard = ReadingCardWithImg & {
  position: number;
};

function ReadingPick() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PickState;

  const { showDialog } = useGlobalAlertDialog();
  const { cards, loadingCards, fetchCards } = useTarotCardStore();

  const {
    categoryId,
    category,
    spreadPosition,
    questionText,
    spreadType,
    spreadCount,
  } = state;

  const MAX_SELECT = spreadCount;

  // 리딩 타로 카드 설정
  const tarotCards = TAROT_CARDS_CONST["tarotCardList"];
  const [cardList, setCardList] = useState<TarotCardResponseDTO[]>(tarotCards);
  const total = cardList.length;

  const [shuffledCard, setShuffledCard] = useState<ReadingCard[]>([]);
  const [activeList, setActiveList] = useState<ActiveCard[]>([]);
  const [nextPosition, setNextPosition] = useState<number | null>(1);

  // 덱/애니메이션 관련
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [spread, setSpread] = useState<boolean>(false);
  const [hoverEnabled, setHoverEnabled] = useState<boolean>(false);
  const spreadTimerRef = useRef<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);
  const [lastSelectedId, setLastSelectedId] = useState<number | null>(null);

  // 덱 버전 관리 (spread reset에 사용)
  const [deckKey, setDeckKey] = useState(0);

  // 카드 선택 완료 및 제출 상태
  const [confirmCard, setConfirmCard] = useState<boolean>(false); // 선택완료
  const [readingSubmit, setReadingSubmit] = useState<boolean>(false); // api요청 성공 여부
  const [viewLoading, setViewLoading] = useState<boolean>(false);

  // 해설 결과 응답 상태 및 로딩 스크린 종료 상태
  const [resultResponse, setResultResponse] =
    useState<ReadingResultResponseDTO | null>(null);
  const [loadingScreenFinished, setLoadingScreenFinished] =
    useState<boolean>(false);
  const loadingTimerRef = useRef<number | null>(null);

  // UI show/hide
  const isBeforeSpread = !spread; // 펼치기 전 단계인지
  const isAfterSpread = spread; // 펼친 후 단계인지
  const isSpreadDisabled = shuffle; // 셔플 중엔 펼치기 비활성
  const canConfirm = activeList.length === MAX_SELECT && !confirmCard;
  const isAllFilled = activeList.length === MAX_SELECT;

  // 카드 로딩 상태 (스토어 기반 + 로컬)
  const cardLoading = loadingCards || cardList.length === 0;

  useEffect(() => {
    if (!cards.length) {
      void fetchCards();
    }
  }, [cards.length, fetchCards]);

  // 초기 로딩 시 덱 세팅 + 첫 셔플 애니메이션
  useEffect(() => {
    if (!cards.length) return;

    setCardList(cards);
    const timer = startShuffleAnimation(cards);

    return () => {
      clearTimeout(timer);
      if (spreadTimerRef.current) {
        clearInterval(spreadTimerRef.current);
      }
    };
  }, [cards]);

  // resultResponse + loadingScreenFinished이면 result로 이동
  useEffect(() => {
    if (!resultResponse || !loadingScreenFinished) return;

    navigate(`/reading/result/${resultResponse.uuid}`, {
      state: resultResponse,
      replace: true,
    });
  }, [
    resultResponse,
    loadingScreenFinished,
    navigate,
    categoryId,
    category,
    questionText,
    spreadType,
    spreadCount,
  ]);

  if (!state) return <Navigate to="/401" replace />;

  // 카드 배열 랜덤 함수
  const fisherYatesShuffle = (list: TarotCardResponseDTO[] | ReadingCard[]) => {
    const newCard = [...list];

    for (let i = 0; i < newCard.length; i++) {
      const rnd = Math.floor(Math.random() * (i + 1));
      const tmp = newCard[i];
      newCard[i] = newCard[rnd];
      newCard[rnd] = tmp;
    }

    const result: ReadingCard[] = newCard.map((card) => ({
      ...(card as ReadingCard),
      reverse: Math.random() < 0.5,
      isSelected: false,
    }));

    console.log("", result);
    setShuffledCard(result);
  };

  // 카드 셔플 함수
  const startShuffleAnimation = (
    list: TarotCardResponseDTO[] | ReadingCard[]
  ) => {
    fisherYatesShuffle(list);
    setShuffle(true);

    const timer = window.setTimeout(() => {
      setShuffle(false);
    }, 2000);

    return timer;
  };

  // 빈 position 찾기
  const getNextPosition = (list: ActiveCard[], max: number): number | null => {
    const used = list.map((c) => c.position);
    for (let i = 1; i <= max; i++) {
      if (!used.includes(i)) return i;
    }
    return null;
  };

  // 결과 해석 요청에 담을 카드 객체
  const toReadingCardsRequest = (
    list: ActiveCard[]
  ): ReadingCardsRequestDTO[] => {
    return list.map((card, index) => ({
      position: index + 1,
      positionName: spreadPosition[index],
      cardId: card.id,
      nameEn: card.nameEn,
      nameKr: card.nameKr,
      arcanaType: card.arcanaType,
      cardNumber: card.cardNumber,
      reverse: card.reverse,
      reverseText: `${card.reverse ? "역방향" : "정방향"}`,
      description: card.description,
      keyword: card.keyword,
      reverseKeyword: card.reverseKeyword,
    }));
  };

  // 결과 해석 요청 바디
  const requestBody = (list: ActiveCard[]): ReadingResultRequestDTO => {
    return {
      categoryId,
      category,
      questionText,
      spreadType,
      spreadCount,
      cardList: toReadingCardsRequest(list),
    };
  };

  // 서버 에러 코드 처리
  const handleErrorByCode = (code: ResponseCode) => {
    switch (code) {
      case ResponseCode.AI_ERROR:
        showDialog({
          title: "AI 응답 오류",
          description:
            "AI 응답 생성 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
          confirmText: "확인",
        });
        break;
      case ResponseCode.VALIDATION_FAIL:
        showDialog({
          title: "잘못된 요청",
          description: "필수 정보가 누락되었어요. 잠시 후 다시 시도해주세요.",
          confirmText: "확인",
        });
        break;
      case ResponseCode.DATABASE_ERROR:
        showDialog({
          title: "DB 오류",
          description:
            "서버에서 데이터를 저장하는 중 문제가 발생했어요.  잠시 후 다시 시도해주세요.",
          confirmText: "확인",
        });
        break;
      default:
        showDialog({
          title: "알 수 없는 오류",
          description: "예상하지 못한 오류가 발생했어요.",
          confirmText: "확인",
        });
    }
  };

  // 리셋 + 셔플
  const hardResetAndShuffle = () => {
    if (spreadTimerRef.current) {
      clearInterval(spreadTimerRef.current);
      spreadTimerRef.current = null;
    }

    setSpread(false);
    setProgress(0);
    setAngle(0);

    setActiveList([]);
    setConfirmCard(false);
    setReadingSubmit(false);
    setNextPosition(1);

    setShuffledCard((prev) =>
      prev.map((card) => ({
        ...card,
        isSelected: false,
      }))
    );

    setDeckKey((prev) => prev + 1);
    startShuffleAnimation(cardList);
  };

  // 카드 섞기
  const handleShuffle = () => {
    const baseList = shuffledCard.length ? shuffledCard : cardList;
    startShuffleAnimation(baseList);
  };

  // 카드 펼치기
  const handleSpread = () => {
    if (spreadTimerRef.current) {
      clearInterval(spreadTimerRef.current);
    }

    setSpread(true);
    setHoverEnabled(false);
    setProgress(0);
    setAngle(0);

    setNextPosition(getNextPosition(activeList, MAX_SELECT));

    let i = 0;
    const intervalId = window.setInterval(() => {
      setProgress(i);
      i++;
      if (i >= total) {
        clearInterval(intervalId);
        spreadTimerRef.current = null;
        setHoverEnabled(true);
      }
    }, 16);

    spreadTimerRef.current = intervalId;
  };

  // 덱 카드 클릭
  const handleDeckCardClick = (clickedCard: ReadingCard) => {
    if (!spread) {
      handleSpread();
      return;
    }
    handleSelectCard(clickedCard);
  };

  // 카드 선택
  const handleSelectCard = (clickedCard: ReadingCard) => {
    if (!spread) return;
    if (confirmCard) return;

    let action: "select" | "unselect" | "noop" = "noop";

    setActiveList((prev) => {
      const alreadySelected = prev.some((c) => c.id === clickedCard.id);

      // 이미 선택된 카드면 -> 해제
      if (alreadySelected) {
        action = "unselect";
        const updated = prev.filter((c) => c.id !== clickedCard.id);
        setNextPosition(getNextPosition(updated, MAX_SELECT));
        return updated;
      }

      // 선택 슬롯 꽉 찼으면 -> 아무것도 하지 않음(덱도 건드리지 말기)
      if (prev.length >= MAX_SELECT) {
        toast.warning("모든 카드를 선택했어요!");
        action = "noop";
        setNextPosition(null);
        return prev;
      }

      // 선택 가능 -> 추가
      action = "select";
      const pos = getNextPosition(prev, MAX_SELECT);
      if (!pos) {
        action = "noop";
        setNextPosition(null);
        return prev;
      }

      const cardWithImgBase: ReadingCardWithImg = {
        ...(clickedCard as ReadingCardWithImg),
        imgUrl: getCardImg(clickedCard.id) ?? "",
      };

      const next: ActiveCard[] = [
        ...prev,
        { ...cardWithImgBase, position: pos },
      ];

      setNextPosition(getNextPosition(next, MAX_SELECT));
      setLastSelectedId(clickedCard.id);

      return next;
    });

    if (action === "noop") return;

    setShuffledCard((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id
          ? { ...card, isSelected: action === "select" }
          : card
      )
    );
  };

  // 카드 선택 해제
  const handleUnSelectCard = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    activeCard: ActiveCard
  ) => {
    if (confirmCard) return;

    const cardItem = e.currentTarget.querySelector(".card_item");
    cardItem?.classList.add("unselected");

    setTimeout(() => {
      cardItem?.classList.remove("unselected");

      setActiveList((prev) => {
        const updated = prev.filter((card) => card.id !== activeCard.id);
        setNextPosition(getNextPosition(updated, MAX_SELECT));
        return updated;
      });
    }, 300);

    setShuffledCard((prev) =>
      prev.map((card) =>
        card.id === activeCard.id ? { ...card, isSelected: false } : card
      )
    );
  };

  // 결과 보내기
  const handleOnConfirm = () => {
    if (confirmCard || readingSubmit) return;
    setConfirmCard(true);

    // 오늘의 운세 결과 요청
    if (category === "today") {
      const oneCard = activeList[0];
      const todayRequestBody: ReadingTodayRequestDTO = {
        cardId: oneCard.id,
        reverse: oneCard.reverse,
      };

      console.log("[ReadingPick] today요청:", todayRequestBody);
      readingTodayRequest(todayRequestBody)
        .then((res) => {
          if (res.code !== ResponseCode.SUCCESS || !res.data) {
            handleErrorByCode(res.code);
            if (loadingTimerRef.current) {
              clearTimeout(loadingTimerRef.current);
              loadingTimerRef.current = null;
            }
            setViewLoading(false);
            setConfirmCard(false);
            return;
          }

          const responseBody: ReadingResultResponseDTO = res.data;
          setTimeout(() => {
            navigate(`/reading/result/${responseBody.uuid}`, {
              state: responseBody,
            });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          if (loadingTimerRef.current) {
            clearTimeout(loadingTimerRef.current);
            loadingTimerRef.current = null;
          }
          setViewLoading(false);
          setConfirmCard(false);
          showDialog({
            title: "오류 발생",
            description:
              "서버 연결에 문제가 있어요. 잠시 후 다시 시도해주세요.",
            confirmText: "확인",
          });
        });

      return;
    }

    // open ai 해석 요청
    const request = requestBody(activeList);
    console.log(request);
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    loadingTimerRef.current = window.setTimeout(() => {
      setViewLoading(true);
    }, 3000);

    readingResultRequest(request)
      .then((res) => {
        if (res.code !== ResponseCode.SUCCESS || !res.data) {
          handleErrorByCode(res.code);
          if (loadingTimerRef.current) {
            clearTimeout(loadingTimerRef.current);
            loadingTimerRef.current = null;
          }
          setViewLoading(false);
          setConfirmCard(false);
          return;
        }

        const responseBody: ReadingResultResponseDTO = res.data;
        setReadingSubmit(true);
        setResultResponse(responseBody);
      })
      .catch((err) => {
        console.log(err);
        if (loadingTimerRef.current) {
          clearTimeout(loadingTimerRef.current);
          loadingTimerRef.current = null;
        }
        setViewLoading(false);
        setConfirmCard(false);
        showDialog({
          title: "오류 발생",
          description: "서버 연결에 문제가 있어요. 잠시 후 다시 시도해주세요.",
          confirmText: "확인",
        });
      });
  };

  return (
    <div className="ReadingPick relative h-full overflow-x-hidden bg-violet-100">
      <section className="absolute z-9 top- left-1/2 -translate-x-1/2 px-4 py-6 w-full">
        {cardLoading ? (
          <SkeletonPageTitle />
        ) : (
          <PageTitle
            wrapClassName={"text-center"}
            title={
              <>
                {category === "today" ? (
                  <>
                    <span className="text-violet-700 font-bold">
                      오늘의 운세
                    </span>
                    를 볼게요!
                  </>
                ) : (
                  <>
                    <span className="text-violet-700 font-bold">
                      {category}
                    </span>{" "}
                    운세를 볼게요
                  </>
                )}
              </>
            }
            subtitle={
              <>
                {category === "today" ? (
                  <p>카드를 펼친 뒤 가장 끌리는 {MAX_SELECT}장을 골라주세요</p>
                ) : (
                  <>
                    <p className="relative w-fit h-auto m-auto">
                      <span className="absolute z-0 bg-violet-400 w-full h-2 left-0 bottom-0.5 animate-pulse opacity-50"></span>
                      <span className="relative z-1">"{questionText}"</span>
                    </p>
                    <p>
                      질문을 마음속으로 생각하며 카드를 {MAX_SELECT}장
                      골라주세요
                    </p>
                  </>
                )}
              </>
            }
          />
        )}
      </section>
      <section className="relative w-full h-full z-9">
        <div className="flex flex-col gap-12 justify-center items-stretch">
          <div
            className="card_deck_wrap"
            style={{ height: "40dvh", minHeight: "300px" }}
          >
            <CardDeck
              key={deckKey}
              shuffle={shuffle}
              spread={spread}
              progress={progress}
              angle={angle}
              setAngle={setAngle}
              hoverEnabled={hoverEnabled}
              onCardClick={handleDeckCardClick}
              cardList={shuffledCard}
            />
          </div>
          <div className="active_list_wrap w-full">
            {spread && (
              <ul
                className="max-w-3xl w-full flex flex-row justify-center items-start gap-3"
                style={{ height: "40vh", minHeight: "280px" }}
              >
                <>
                  {Array.from({ length: MAX_SELECT }).map((_, index) => {
                    const slotPosition = index + 1;

                    // 이 포지션에 해당하는 카드 찾기
                    const activeCard = activeList.find(
                      (card) => card.position === slotPosition
                    );
                    const isNext =
                      spread && !confirmCard && nextPosition === slotPosition;

                    return (
                      <li
                        key={slotPosition}
                        className="flex flex-col justify-start  gap-1 h-full"
                      >
                        {/* 포지션 라벨 (과거/현재/미래) */}
                        <div className="text-center">
                          {isNext && !activeCard ? (
                            <Badge className="animate-bounce">
                              {spreadPosition[index]}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-background">
                              {spreadPosition[index]}
                            </Badge>
                          )}
                        </div>

                        {/* 카드가 채워진 경우 */}
                        <div
                          className={`card_slot rounded-sm ${
                            activeCard && isAllFilled
                              ? "bg-transparent"
                              : isNext && !activeCard
                              ? "bg-violet-300 animate-pulse"
                              : "bg-neutral-100"
                          }`}
                        >
                          {activeCard ? (
                            <div
                              className={[
                                "card_wrap",
                                "card_selected",
                                "cursor-pointer",
                                confirmCard ? "show_card" : "",
                                activeCard.id === lastSelectedId
                                  ? "selected-in"
                                  : "",
                              ].join(" ")}
                              onClick={(e) => handleUnSelectCard(e, activeCard)}
                            >
                              <CardItem card={activeCard} />
                              {confirmCard && (
                                <div className="tooltip absolute w-4/5 left-1/2 bottom-0 -translate-x-1/2 translate-y-full">
                                  <SpeechBubble
                                    fullWidth
                                    side="top"
                                    pointerSize={6}
                                    bubbleClassName="rounded-sm bg-violet-500"
                                    childClassName="rounded-sm"
                                  >
                                    <div className="text-accent p-1.5 rounded-sm text-xs text-center border-b border-e border-violet-500 shadow-sm">
                                      <p className="leading-tight">
                                        {activeCard.nameEn}
                                      </p>
                                      <p className="mt-0.5">
                                        {activeCard.reverse
                                          ? "역방향"
                                          : "정방향"}
                                      </p>
                                    </div>
                                  </SpeechBubble>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="card_wrap"></div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </>
              </ul>
            )}
          </div>
        </div>
      </section>
      <section className="z-9 fixed left-1/2 bottom-[67px] -translate-x-1/2 max-w-3xl w-full">
        <div className="flex gap-2 p-2 md:px-3 md:py-5 mx-auto max-w-sm w-full">
          {/* 1단계: 카드 섞기/펼치기 */}
          {isBeforeSpread && (
            <>
              <Button
                variant="outline"
                size="lg"
                className="w-24 h-12"
                onClick={handleShuffle}
                disabled={shuffle}
              >
                {shuffle ? "셔플 중..." : "카드 섞기"}
              </Button>
              <Button
                size="lg"
                className="grow h-12"
                disabled={isSpreadDisabled}
                onClick={handleSpread}
              >
                펼치기
              </Button>
            </>
          )}

          {/* 2단계: 리셋/카드 선택 & 선택 완료 */}
          {isAfterSpread && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="size-12"
                disabled={confirmCard}
                onClick={hardResetAndShuffle}
              >
                <RefreshCcw />
              </Button>
              <Button
                size="lg"
                className="grow h-12"
                disabled={!canConfirm}
                onClick={handleOnConfirm}
              >
                {confirmCard && !readingSubmit ? (
                  <Spinner className="size-4" />
                ) : (
                  "선택 완료"
                )}
              </Button>
            </>
          )}
        </div>
      </section>

      {viewLoading && (
        <LoadingScreen
          request={requestBody(activeList)}
          activeList={activeList}
          isResultReady={!!resultResponse}
          onFinish={() => setLoadingScreenFinished(true)}
        />
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default ReadingPick;
