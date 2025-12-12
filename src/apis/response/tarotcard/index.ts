import type TarotCardListResponseDTO from "./tarotcard-list.response";
import type TarotCardResponseDTO from "./tarotcard.response";

export type { TarotCardListResponseDTO, TarotCardResponseDTO };

// 리딩 화면에서만 쓰는 확장 타입
export type ReadingCard = TarotCardResponseDTO & {
  reverse: boolean;
  isSelected: boolean;
};

export type ReadingCardWithImg = ReadingCard & {
  imgUrl: string | null;
};
