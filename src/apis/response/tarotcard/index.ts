import type TarotCardListResponseDTO from "./tarotcard-list.response";
import type TarotCardResponseDTO from "./tarotcard.response";

export type { TarotCardListResponseDTO, TarotCardResponseDTO };

export type TarotCardBase = Omit<TarotCardResponseDTO, "code" | "message">;

// 리딩 화면에서만 쓰는 확장 타입
export type ReadingCard = TarotCardBase & {
  reverse: boolean;
  isSelected: boolean;
};

export type ReadingCardWithImg = ReadingCard & {
  imgUrl: string | null;
};
