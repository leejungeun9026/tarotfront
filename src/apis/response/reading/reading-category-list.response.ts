import type ResponseDTO from "../response.dto";
import type ReadingCategoryResponseDTO from "./reading-category.response";

export default interface ReadingCategoryListResponseDTO extends ResponseDTO {
  readingCategoryList: Omit<ReadingCategoryResponseDTO, "code" | "message">[];
}
