export interface ReadingResultResponseDTO {
  uuid: string;
  isOwner: boolean;
  readingId: number;
  categoryType: string;
  categoryName: string;
  questionText: string;
  spreadCount: number;
  spreadType: string;
  resultTitle: string;
  resultSummary: string;
  overallAdvice: string;
  createdAt: Date;
  positions: ReadingPositionResponseDTO[];
  comment: string;
  isBookmarked: boolean;
}

export interface ReadingPositionResponseDTO {
  tarotCardId: number;
  arcanaType: string;
  cardNumber: number;
  nameEn: string;
  nameKr: string;
  isReversed: boolean;
  position: number;
  positionAdvice: string;
  positionName: string;
  positionResult: string;
}
