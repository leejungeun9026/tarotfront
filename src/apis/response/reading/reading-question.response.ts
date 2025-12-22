export interface ReadingQuestionListResponseDTO {
  readingQuestionList: ReadingQuestionResponseDTO[];
}

export interface ReadingQuestionResponseDTO {
  readingCategoryId: number;
  questionType: string;
  questionText: string;
  sortOrder: number;
}
