import type ResponseDTO from "../response.dto";
import type ReadingQuestionResponseDTO from "./reading-question.response";

export default interface ReadingQuestionListResponseDTO extends ResponseDTO {
  readingQuestionList: Omit<ReadingQuestionResponseDTO, "code" | "message">[];
}
