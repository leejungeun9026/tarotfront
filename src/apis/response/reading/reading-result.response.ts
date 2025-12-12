import type { ReadingCardsRequestDTO } from "@/apis/request/reading";

export default interface ReadingResultResponseDTO {
  readingId: number;
  resultTitle: string;
  resultSummary: string;
  overallAdvice: string;
  positions: ReadingPositionResponseDTO[];
  cardList: ReadingCardsRequestDTO[];
}

export interface ReadingPositionResponseDTO {
  position: number;
  positionName: string;
  interpretation: string;
  advice: string;
}
