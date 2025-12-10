import type ResponseDTO from "../response.dto";

export default interface ReadingResultResponseDTO extends ResponseDTO {
  readingCategoryId: number;
  questionText: string;
  sortOrder: number;
}
