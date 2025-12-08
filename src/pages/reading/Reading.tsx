import { tarotCardRequest } from "@/apis";
import type { ReadingCard, ReadingCardWithImg, TarotCardBase } from "@/apis/response/tarotcard";
import CardDeck from "@/components/tarotcard/CardDeck";
import CardItem from "@/components/tarotcard/CardItem";
import { TAROT_CARDS_CONST } from "@/constants/tarotCards";
import { getCardImg } from "@/utils/tarotImage";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";
import "../../styles/tarotcard.css";
import LoadingScreen from "./LoadingScreen";

function Reading({ type, maxCard }: { type: string, maxCard: number }) {
  const tarotCards = TAROT_CARDS_CONST;
  const [cardList, setCardList] = useState<TarotCardBase[]>(tarotCards);
  const [shuffledCard, setShuffledCard] = useState<ReadingCard[]>([]);
  const [activeList, setActiveList] = useState<ReadingCardWithImg[]>([]);

  const [shuffle, setShuffle] = useState<boolean>(false);
  const [spread, setSpread] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);

  const [btnShuffleHidden, setBtnShuffleHidden] = useState<boolean>(false);
  const [btnSpreadHidden, setBtnSpreadHidden] = useState<boolean>(false);
  const [btnSpreadDisabled, setBtnSpreadDisabled] = useState<boolean>(false);
  const [btnSeleteHidden, setBtnSeleteHidden] = useState<boolean>(true);
  const [btnSeletedisabled, setBtnSeletedisabled] = useState<boolean>(true);

  const [confirmCard, setConfirmCard] = useState<boolean>(false);
  const [btnConfirmCard, setBtnConfirmCard] = useState<ReactNode>("선택 완료");
  const [loading, setLoading] = useState<boolean>(false);

  const MAX_SELECT = 3;
  // const MAX_SELECT = maxCard;
  const total = cardList.length;

  useEffect(() => {
    tarotCardRequest()
      .then((data) => {
        console.log("dbtards :", data);
        const dbCardsList = data.tarotCardList;
        setCardList(dbCardsList);
      })
      .catch((err) => {
        console.log(err);
        // 실패시 상수값 그대로 사용
        setCardList(TAROT_CARDS_CONST);
      })
  }, []);

  useEffect(() => {
    // 카드 섞기 + 셔플 애니메이션 + 펼치기 버튼 비활성화
    fisherYatesShuffle(cardList);
    setShuffle(true);
    setBtnSpreadDisabled(true);
    // 애니메이션 + 펼치기버튼 초기화
    setTimeout(() => {
      setShuffle(false);
      setBtnSpreadDisabled(false);
    }, 2000);
  }, [cardList]);

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
      isSelected: false
    }));
    setShuffledCard(result);
  };

  const handleShuffle = () => {
    fisherYatesShuffle(shuffledCard);
    console.log("섞은뒤", shuffledCard);
    setShuffle(true);
    setBtnSpreadDisabled(true);

    setTimeout(() => {
      setShuffle(false);
      setBtnSpreadDisabled(false);
    }, 2000);
  };

  const handleSpread = () => {
    setBtnShuffleHidden(true);
    setBtnSpreadHidden(true);
    setBtnSeleteHidden(false);

    setSpread(true);
    setProgress(0);
    setAngle(0);
    let i = 0;
    const interval = setInterval(() => {
      setProgress(i);
      i++;
      if (i >= total) clearInterval(interval);
    }, 16); // interval 60fps 느낌
  };

  const handleSelectCard = (clickedCard: ReadingCard) => {
    if (!spread) return;
    if (confirmCard) return;

    // 이미 선택된 카드 개수
    const activeCount = shuffledCard.filter((c) => c.isSelected).length;
    const isCurrentlySelected = clickedCard.isSelected;

    // 최대 선택 개수 제한
    if (!isCurrentlySelected && activeCount >= MAX_SELECT) {
      toast.warning("모든 카드를 선택했어요!");
      return;
    }
    const cardWithImg: ReadingCardWithImg = {
      ...clickedCard,
      imgUrl: getCardImg(clickedCard.id) ?? "",
    };

    setActiveList((prev) => {
      const next = [...prev, cardWithImg];
      if (next.length === MAX_SELECT) {
        setBtnSeletedisabled(false);
      }
      return next;
    });
    if (activeList.length == MAX_SELECT) setBtnSeletedisabled(false);

    // isSelected 토글
    setShuffledCard((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id
          ? { ...card, isSelected: !card.isSelected }
          : card
      )
    );
  };

  const handleUnSelectCard = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    activeCard: ReadingCardWithImg) => {
    if (confirmCard) return;

    const el = e.currentTarget.closest(".card_item");
    el?.classList.add("inactive");

    setTimeout(() => {
      el?.classList.remove("inactive");

      setActiveList(() => {
        const next = activeList.filter((card) => card.id !== activeCard.id);
        if (next.length !== MAX_SELECT) {
          setBtnSeletedisabled(true);
        }
        return next;
      });
    }, 200);

    setShuffledCard((prev) =>
      prev.map((card) =>
        card.id === activeCard.id
          ? { ...card, isSelected: !card.isSelected }
          : card
      )
    );
  };

  const handleOnConfirm = (e: React.MouseEvent | React.TouchEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    button.disabled = true;

    setBtnConfirmCard(<Spinner className="size-4" />);
    setConfirmCard(true);

    // 위 애니메이션 보여준 뒤 Loading띄우기
    setTimeout(() => {
      setLoading(true);
    }, 1500);

    // axios요청 -> 응답오면 해설 페이지 이동하기
    // setViewLoadingMessage();
  };

  return (
    <div className="Reading">
      <div className="inner relative overflow-hidden">
        <div className="title_wrap absolute left-0 top-0 px-4 py-6">
          <h2 className="text-4xl">Title</h2>
        </div>
        <section className="card_section">
          <CardDeck
            shuffle={shuffle}
            spread={spread}
            progress={progress}
            angle={angle}
            setAngle={setAngle}
            onCardClick={handleSelectCard}
            cardList={shuffledCard}
          />
        </section>
        <section className="py-[50px] sm:py-20">
          {activeList.length > 0 && (
            <ul className="flex flex-row justify-center items-center gap-3 h-full">
              {activeList.map((activeCard) => {
                return (
                  <li key={activeCard.id}>
                    <div
                      className={[
                        `${confirmCard ? "show_card" : ""}`,
                        "card_wrap",
                        "card_selected",
                        "cursor-pointer",
                      ].join(" ")}
                      onClick={(e) => handleUnSelectCard(e, activeCard)}
                    >
                      <CardItem card={{ type: "readingCardWithImg", data: activeCard }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="fixed bottom-[67px] max-w-3xl w-full">
          <div className="flex justify-center gap-2 p-3 md:p-5 mx-auto max-w-sm w-full">
            {!btnShuffleHidden && (
              <Button
                size="xl"
                className={[
                  "w-1/2",
                  `${btnShuffleHidden ? "hidden" : ""}`,
                ].join(" ")}
                onClick={handleShuffle}
              >
                카드 섞기
              </Button>
            )}
            {!btnSpreadHidden && (
              <Button
                size="xl"
                className={["w-1/2", `${btnSpreadHidden ? "hidden" : ""}`].join(
                  " "
                )}
                disabled={btnSpreadDisabled}
                onClick={handleSpread}
              >
                펼치기
              </Button>
            )}
            {!btnSeleteHidden && (
              <Button
                size="xl"
                className="w-full"
                disabled={btnSeletedisabled}
                onClick={handleOnConfirm}
              >
                {btnConfirmCard}
              </Button>
            )}
          </div>
        </section>
      </div>
      {loading && <LoadingScreen type={type} activeList={activeList} />}
    </div>
  );
}

export default Reading;
