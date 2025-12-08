import type { ReadingCard, ReadingCardWithImg } from "@/apis/response/tarotcard";
import { getCardImg } from "./tarotImage";

export const mapCardWithImg = (cards: ReadingCard[]): ReadingCardWithImg[] => {
  return cards.map((card) => ({
    ...card,
    imgUrl: getCardImg(card.id) || "",
  }));
};

