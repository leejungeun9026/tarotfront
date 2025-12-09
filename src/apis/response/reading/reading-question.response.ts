import type ResponseDTO from "../response.dto";

export default interface ReadingQuestionResponseDTO extends ResponseDTO {
  readingCategoryId: number;
  questionText: string;
  sortOrder: number;
}
