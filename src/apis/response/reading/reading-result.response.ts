import type { ReadingCardsRequestDTO } from "@/apis/request/reading";
import type ResponseDTO from "../response.dto";

export default interface ReadingResultResponseDTO extends ResponseDTO {
  readingId: number;
  resultTitle: string;
  resultSummary: string;
  overallAdvice: string;
  positions: ReadingCategoryResponseDTO[];
  cardList: ReadingCardsRequestDTO[];
}

export interface ReadingCategoryResponseDTO extends ResponseDTO {
  position: number;
  positionName: string;
  interpretation: string;
  advice: string;
}