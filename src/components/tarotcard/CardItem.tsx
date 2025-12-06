import { memo } from "react";
import cardBack from "../../../assets/back01.jpg";
import { getCardImg } from "../../../utils/tarotImage";

const CardItem = memo(function CardItem({ card }) {
  const imgSrc = getCardImg(card.id);

  return (
    <div id={card.id} className={["card_item", `card_${card.id}`].join(" ")}>
      <div className="card_inner">
        <div className="card_back">
          <img src={cardBack} alt="카드 뒷면" />
        </div>
        <div className="card_front">
          <img
            src={imgSrc}
            alt="카드 앞면"
            className={card.reverse ? "rotate-180" : ""}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
});

export default CardItem;
