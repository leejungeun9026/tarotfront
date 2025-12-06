// src/types/tarot.ts
export type TarotArcanaType = "MAJOR" | "MINOR";

// DB/상수 공통으로 쓰는 기본 카드 (이미지 없음)
export type TarotCardBase = {
  id: number;
  nameKr: string;
  nameEn: string;
  arcanaType: TarotArcanaType;
  cardNumber: number | null;
  description: string;
  keyword: string;
  reverseKeyword: string;
};

// 프론트에서 실제로 쓰는 카드 (이미지 포함)
export type TarotCard = TarotCardBase & {
  imgUrl: string;
};

// API에서 단일 카드 응답 타입
export type TarotCardResponseDTO = TarotCard;

// API에서 리스트 응답 타입
export type TarotCardListResponseDTO = {
  cardList: TarotCardResponseDTO[];
};

// 리딩 화면에서만 쓰는 확장 타입
export type ReadingCard = TarotCard & {
  reverse?: boolean;
  isSelected?: boolean;
};
