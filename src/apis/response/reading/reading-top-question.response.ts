export interface ReadingTopQuestionListResponseDTO {
  topQuestionList: ReadingTopQuestionResponseDTO[];
}

export interface ReadingTopQuestionResponseDTO {
  question: string;
  readingCategoryId: number;
  category: string;
  typeEn: string;
  typeKr: string;
  count: number;
}
