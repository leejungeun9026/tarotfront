import { readingResultRequest, tarotCardRequest } from "@/apis";
import type {
  ReadingCardsRequestDTO,
  ReadingResultRequestDTO,
} from "@/apis/request/reading";
import type ReadingResultResponseDTO from "@/apis/response/reading/reading-result.response";
import type {
  ReadingCard,
  ReadingCardWithImg,
  TarotCardBase,
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
import { ResponseCode } from "@/types/enums";
import { getCardImg } from "@/utils/imageMapper";
import { RefreshCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Button } from "../../components/ui/button";
import "../../styles/tarotcard.css";
import LoadingScreen from "./LoadingScreen";

type Props = {
  categoryId: number;
  category: string;
  question: string;
  spreadType: string;
  spreadCount: number;
};

type ActiveCard = ReadingCardWithImg & {
  position: number;
};



function ReadingPick({
  categoryId,
  category,
  question,
  spreadType,
  spreadCount,
}: Props) {
  const navigate = useNavigate();
  const { showDialog } = useGlobalAlertDialog();

  // 스프레드 타입 및 카드 갯수 설정
  const spreadPosition = ["과거", "현재", "미래"];
  const MAX_SELECT = spreadCount;

  // 리딩 타로 카드 설정
  const tarotCards = TAROT_CARDS_CONST;
  const [cardLoading, setCardLoading] = useState<boolean>(true);
  const [cardList, setCardList] = useState<TarotCardBase[]>(tarotCards);
  const total = cardList.length;
  const [shuffledCard, setShuffledCard] = useState<ReadingCard[]>([]);
  const [activeList, setActiveList] = useState<ActiveCard[]>([]);
  const [nextPosition, setNextPosition] = useState<number | null>(1);

  // 덱/애니메이션 관련
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [spread, setSpread] = useState<boolean>(false);
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
  const [resultResponse, setResultResponse] = useState<ReadingResultResponseDTO | null>(null);
  const [loadingScreenFinished, setLoadingScreenFinished] = useState<boolean>(false);

  // UI show/hide
  const isBeforeSpread = !spread; // 펼치기 전 단계인지
  const isAfterSpread = spread; // 펼친 후 단계인지
  const isSpreadDisabled = shuffle; // 셔플 중엔 펼치기 비활성
  const canConfirm = activeList.length === MAX_SELECT && !confirmCard;
  const isAllFilled = activeList.length === MAX_SELECT;


  // 초기 로딩 시 카드 셔플
  useEffect(() => {
    const firstTimer = startShuffleAnimation(TAROT_CARDS_CONST);
    let secondTimer: number | null = null;

    tarotCardRequest()
      .then((data) => {
        const dbCardsList = data.tarotCardList;
        setCardList(dbCardsList);
        secondTimer = startShuffleAnimation(dbCardsList);
      })
      .catch((err) => {
        console.log(err);
        setCardList(TAROT_CARDS_CONST);
      })
      .finally(() => {
        setCardLoading(false);
      });

    return () => {
      clearTimeout(firstTimer);
      if (secondTimer) clearTimeout(secondTimer);
      if (spreadTimerRef.current) {
        clearInterval(spreadTimerRef.current);
      }
    };
  }, []);


  // 타로 해석 응답 결과가 있거나 로딩 스크린이 끝나면 응답 처리하기
  useEffect(() => {
    if (resultResponse && loadingScreenFinished) {
      navigate("/reading", {
        state: {
          screen: "result",
          result: resultResponse,
          questions: {
            categoryId,
            category,
            question,
            spreadType,
            spreadCount,
          }
        },
      });
    }
  }, [resultResponse, loadingScreenFinished]);


  // 결과 해석 요청에 담을 질문 객체
  const requestBody = (activeList: ActiveCard[]): ReadingResultRequestDTO => {
    return {
      categoryId,
      category,
      question,
      spreadType,
      spreadCount,
      cardList: toReadingCardsRequest(activeList),
    }
  };

  // 결과 해석 요청에 담을 카드 객체
  const toReadingCardsRequest = (
    activeList: ActiveCard[]
  ): ReadingCardsRequestDTO[] => {
    return activeList.map((card, index) => ({
      position: index + 1,
      positionName: spreadPosition[index],
      cardId: card.id,
      nameEn: card.nameEn,
      nameKr: card.nameKr,
      reverse: card.reverse,
      reverseText: `${card.reverse ? "역방향" : "정방향"}`,
      description: card.description,
      keyword: card.keyword,
      reverseKeyword: card.reverseKeyword,
    }));
  };


  // 서버에서 응답 온 에러코드 처리하는 핸들러
  const handleErrorByCode = (code: ResponseCode) => {
    switch (code) {
      case ResponseCode.AI_ERROR:
        showDialog({
          title: "AI 응답 오류",
          description: "AI 응답 생성 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
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
          description: "서버에서 데이터를 저장하는 중 문제가 발생했어요.  잠시 후 다시 시도해주세요.",
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



  // 카드 배열 랜덤 함수
  const fisherYatesShuffle = (cardList: TarotCardBase[] | ReadingCard[]) => {
    const newCard = [...cardList];
    //Fisher-Yates shuffle
    for (let i = 0; i < newCard.length; i++) {
      const rnd = Math.floor(Math.random() * (i + 1));
      const tmp = newCard[i];
      newCard[i] = newCard[rnd];
      newCard[rnd] = tmp;
    }
    // 정방향, 역방향 설정
    const result: ReadingCard[] = newCard.map((card) => ({
      ...card,
      reverse: Math.random() < 0.5, // true 또는 false
      isSelected: false,
    }));
    setShuffledCard(result);
  };

  // 카드 셔플 함수
  const startShuffleAnimation = (list: TarotCardBase[] | ReadingCard[]) => {
    // 카드 실제 순서 섞기
    fisherYatesShuffle(list);
    // 셔플 애니메이션 ON
    setShuffle(true);

    const timer = window.setTimeout(() => {
      setShuffle(false);
    }, 2000);

    return timer;
  };

  // 빈 position 찾기 (1 ~ MAX_SELECT 중 비어있는 가장 작은 숫자)
  const getNextPosition = (list: ActiveCard[], max: number): number | null => {
    const used = list.map((c) => c.position);
    for (let i = 1; i <= max; i++) {
      if (!used.includes(i)) return i;
    }
    return null;
  };


  // 리셋 + 셔플
  const hardResetAndShuffle = () => {
    if (spreadTimerRef.current) {
      clearInterval(spreadTimerRef.current);
      spreadTimerRef.current = null;
    }

    // 1단계 상태로 초기화
    setSpread(false);
    setProgress(0);
    setAngle(0);

    setActiveList([]);
    setConfirmCard(false);
    setReadingSubmit(false);
    setNextPosition(1);

    // 선택 플래그도 초기화 (필요하면)
    setShuffledCard((prev) =>
      prev.map((card) => ({
        ...card,
        isSelected: false,
      }))
    );

    // CardDeck 강제 리마운트
    setDeckKey((prev) => prev + 1);

    // 새 덱 기준으로 셔플 애니메이션 시작
    startShuffleAnimation(cardList);
  };


  ///// 이벤트 핸들러 모음 /////
  // 카드 섞기
  const handleShuffle = () => {
    // 이미 한 번 섞인 덱이 있다면 그걸 기준으로 다시 섞고,
    // 아니면 cardList(현재 보유한 카드 전체)를 기준으로 섞기
    const baseList = shuffledCard.length ? shuffledCard : cardList;
    startShuffleAnimation(baseList);
  };

  // 카드 펼치기
  const handleSpread = () => {
    // 이전 타이머 있으면 삭제
    if (spreadTimerRef.current) {
      clearInterval(spreadTimerRef.current);
    }

    setSpread(true);
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
      }
    }, 16);

    spreadTimerRef.current = intervalId;
  };

  // 카드 선택
  const handleSelectCard = (clickedCard: ReadingCard) => {
    if (!spread) return;
    if (confirmCard) return;

    const wasSelected = clickedCard.isSelected;

    // 선택 토글
    setShuffledCard((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id
          ? { ...card, isSelected: !card.isSelected }
          : card
      )
    );

    // 카드 기본 정보 + img
    const cardWithImgBase: ReadingCardWithImg = {
      ...(clickedCard as ReadingCardWithImg),
      imgUrl: getCardImg(clickedCard.id) ?? "",
    };

    setActiveList((prev) => {
      // 이미 선택된 카드였다면 → 해제
      if (wasSelected) {
        const updated = prev.filter((c) => c.id !== clickedCard.id);
        setNextPosition(getNextPosition(updated, MAX_SELECT)); // 다음 포지션 재계산
        return updated;
      }

      // 새로 선택
      if (prev.length >= MAX_SELECT) {
        toast.warning("모든 카드를 선택했어요!");
        setNextPosition(null);
        return prev;
      }

      const pos = getNextPosition(prev, MAX_SELECT);
      if (!pos) {
        setNextPosition(null);
        return prev;
      }

      const next: ActiveCard[] = [
        ...prev,
        {
          ...cardWithImgBase,
          position: pos,
        },
      ];

      setNextPosition(getNextPosition(next, MAX_SELECT));
      setLastSelectedId(clickedCard.id);

      return next;
    });
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
        setNextPosition(getNextPosition(updated, MAX_SELECT)); // 해제 후 nextPosition 재계산
        return updated;
      });
    }, 300);

    setShuffledCard((prev) =>
      prev.map((card) =>
        card.id === activeCard.id
          ? { ...card, isSelected: !card.isSelected }
          : card
      )
    );
  };

  // 결과 보내기
  const handleOnConfirm = () => {
    if (confirmCard || readingSubmit) return;
    setConfirmCard(true);

    const request = requestBody(activeList)
    console.log("activeList", activeList)
    console.log("requestQuestion.cardList", request.cardList)
    console.log(request);

    // 카드 결과 보여주고 로딩스크린 show
    setTimeout(() => {
      setViewLoading(true)
    }, 1500);

    // axios요청 -> 응답오면 해설 페이지 이동하기
    readingResultRequest(request)
      .then((res) => {
        // 서버 응답 코드가 SUCCESS가 아닐 때 실행 로직
        if (res.code !== ResponseCode.SUCCESS) {
          handleErrorByCode(res.code);
          return;
        }

        // 결과 상태에 응답 객체 담기
        // 응답객체 상태가 변경되면 useEffect가 감지하여
        // readingResultResponse(결과 페이지 이동)을 실행
        setResultResponse(res);
      })
      .catch(err => {
        console.log(err);
        showDialog({
          title: "오류 발생",
          description: "서버 연결에 문제가 있어요. 잠시 후 다시 시도해주세요.",
          confirmText: "확인",
        });
        setViewLoading(false);
        setConfirmCard(false);
      });

  };

  return (
    <div className="ReadingPick relative h-full overflow-x-hidden bg_gradient">
      <section className="absolute z-9 top- left-1/2 -translate-x-1/2 px-4 py-6 w-full">
        {cardLoading ? (
          <SkeletonPageTitle />
        ) : (
          <PageTitle
            wrapClassName={"text-center"}
            title={<><span className="text-violet-700 font-bold">{category}</span> 운세를 볼게요</>}
            subtitle={
              <>
                <p className="relative w-fit h-auto m-auto">
                  <span className="absolute z-0 bg-violet-400 w-full h-2 left-0 bottom-0.5 animate-pulse opacity-50"></span>
                  <span className="relative z-1">"{question}"</span>
                </p>
                <p>
                  질문을 마음속으로 생각하며 카드를 {MAX_SELECT}장 골라주세요
                </p>
              </>
            }
          />
        )}
      </section>
      <section className="relative w-full h-full z-9">
        <div
          className="flex flex-col gap-12 justify-center items-stretch"
        >
          <div className="card_deck_wrap" style={{ height: "40dvh", minHeight: "300px" }}>
            <CardDeck
              key={deckKey}
              shuffle={shuffle}
              spread={spread}
              progress={progress}
              angle={angle}
              setAngle={setAngle}
              onCardClick={handleSelectCard}
              cardList={shuffledCard}
            />
          </div>
          <div className="active_list_wrap w-full">
            {spread && (
              <ul className="max-w-3xl w-full flex flex-row justify-center items-start gap-3" style={{ height: "40vh", minHeight: "280px" }}>
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
                          className={`card_slot rounded-sm ${activeCard && isAllFilled
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
                              <CardItem
                                card={{
                                  type: "readingCardWithImg",
                                  data: activeCard,
                                }}
                              />
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
      </section >
      <section className="z-9 fixed left-1/2 bottom-[67px] -translate-x-1/2 max-w-3xl w-full">
        <div className="flex gap-2 p-2 md:px-3 md:py-5 mx-auto max-w-sm w-full">
          {/* 1단계: 카드 섞기/펼치기 */}
          {isBeforeSpread && (
            <>
              <Button
                variant="outline"
                size="xl"
                className="w-24"
                onClick={handleShuffle}
                disabled={shuffle}
              >
                {shuffle ? "셔플 중..." : "카드 섞기"}
              </Button>
              <Button
                size="xl"
                className="grow"
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
                size="xl"
                className="grow"
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

      {viewLoading &&
        <LoadingScreen
          request={requestBody(activeList)}
          activeList={activeList}
          isResultReady={!!resultResponse}
          onFinish={() =>
            setLoadingScreenFinished(true)
          }
        />
      }
      <Toaster position="top-center" />
    </div >
  );
}

export default ReadingPick;
