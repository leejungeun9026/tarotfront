import type {
  ReadingCard,
  ReadingCardWithImg,
} from "@/apis/response/tarotcard";
import { memo } from "react";
import cardBack from "../../assets/back02.jpg";
import { getCardImg } from "../../utils/imageMapper";

type CardItemProps = {
  card: CardType;
};

type CardType =
  | { type: "readingCard"; data: ReadingCard }
  | { type: "readingCardWithImg"; data: ReadingCardWithImg }
  | { type: "front"; id: number; reverse: boolean }
  | { type: "back"; id: number | null };

const CardItem = memo(function CardItem({ card }: CardItemProps) {
  let id: number | null = null;
  let reverse = false;
  let imgSrc: string | undefined = undefined;

  if (card.type === "readingCard") {
    id = card.data.id;
    imgSrc = getCardImg(id) ?? undefined;
  }

  if (card.type === "readingCardWithImg") {
    id = card.data.id;
    imgSrc = card.data.imgUrl ?? getCardImg(id) ?? undefined;
    reverse = card.data.reverse;
  }

  if (card.type === "front") {
    id = card.id;
    reverse = card.reverse;
    imgSrc = getCardImg(id) ?? undefined;
  }

  if (card.type === "back") {
    id = card.id;
    imgSrc = undefined; // OK
  }

  return (
    <div id={String(id)} className={["card_item", `card_${id}`].join(" ")}>
      <div className="card_inner">
        <div className="card_back">
          <img src={cardBack} alt="카드 뒷면" />
        </div>
        {imgSrc && (
          <div className="card_front">
            <img
              src={imgSrc}
              alt="카드 앞면"
              className={reverse ? "rotate-180" : ""}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default CardItem;
