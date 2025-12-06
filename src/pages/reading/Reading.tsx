import { tarotCardRequest } from "@/apis";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CardDeck from "../../components/layout/tarotcard/CardDeck";
import CardItem from "../../components/layout/tarotcard/CardItem";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";
import "../../styles/tarotcard.css";
import LoadingScreen from "./LoadingScreen";
import type { TarotCardListResponseDTO } from "@/apis/response/tarotcard/tarotcard.response";

function Reading({ type, maxCard }: { type: string, maxCard: number }) {
  const [cardList, setCardList] = useState<TarotCardListResponseDTO>([]);
  const [shuffledCard, setShuffledCard] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [spread, setSpread] = useState(false);
  const [progress, setProgress] = useState(0);
  const [angle, setAngle] = useState(0);

  const [btnShuffleHidden, setBtnShuffleHidden] = useState(false);
  const [btnSpreadHidden, setBtnSpreadHidden] = useState(false);
  const [btnSpreadDisabled, setBtnSpreadDisabled] = useState(false);
  const [btnSeleteHidden, setBtnSeleteHidden] = useState(true);
  const [btnSeletedisabled, setBtnSeletedisabled] = useState(true);
  const [activeList, setActiveList] = useState([]);
  const [confirmCard, setConfirmCard] = useState(false);
  const [btnConfirmCard, setBtnConfirmCard] = useState("선택 완료");

  const [loading, setLoading] = useState(false);

  const MAX_SELECT = 3;
  // const MAX_SELECT = maxCard;
  const total = cardList.length;

  useEffect(() => {
    tarotCardRequest()
      .then(data => console.log(data))

    // // DB에서 카드 정보 가져오기
    // getAllCard()
    //   .then((res) => {
    //     setCardList(res.data);
    //   })
    //   .catch((err) => {
    //     // 실패시 저장해둔 카드 정보 가져오기
    //     console.log("DB 카드 불러오기 실패 : ", err);
    //     setCardList(TAROT_CARDS);
    //   });
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

  const fisherYatesShuffle = (cardList) => {
    const newCard = [...cardList];
    //Fisher-Yates shuffle
    for (let i = 0; i < newCard.length; i++) {
      const rnd = Math.floor(Math.random() * (i + 1));
      const tmp = newCard[i];
      newCard[i] = newCard[rnd];
      newCard[rnd] = tmp;
    }
    // 정방향, 역방향 설정
    const result = newCard.map((card) => ({
      ...card,
      reverse: Math.random() < 0.5, // true 또는 false
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

  const handleSelectCard = (clickedCard) => {
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

    setActiveList((prev) => {
      const next = [...prev, clickedCard];
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

  const handleUnSelectCard = (e, activeCard) => {
    if (confirmCard) return;
    e.target.closest(".card_item").classList.add("inactive");
    setTimeout(() => {
      e.target.closest(".card_item").classList.remove("inactive");
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

  const handleOnConfirm = (e) => {
    e.target.setAttribute("disabled", "disabled");
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
        <section className="py-[50px] sm:py-[80px]">
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
                      <CardItem card={activeCard} />
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
