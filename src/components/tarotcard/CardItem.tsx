import type {
  ReadingCard,
  ReadingCardWithImg,
} from "@/apis/response/tarotcard";
import { memo } from "react";
import cardBack from "../../assets/back02.jpg";

type CardItemProps = {
  card: ReadingCardWithImg | (ReadingCard & { imgUrl: string | null }) | null;
};

const CardItem = memo(function CardItem({ card }: CardItemProps) {
  return (
    <div className={["card_item", `card_${card}`].join(" ")}>
      <div className="card_inner">
        <div className="card_back">
          <img src={cardBack} alt="카드 뒷면" />
        </div>
        {card !== null && (
          <div className="card_front">
            <img
              src={card?.imgUrl ?? undefined}
              alt="카드 앞면"
              className={card?.reverse ? "rotate-180" : ""}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default CardItem;
