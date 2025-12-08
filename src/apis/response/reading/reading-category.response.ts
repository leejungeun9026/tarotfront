import { ReadingTypeEn, ReadingTypeKr } from "@/types/enums";
import type ResponseDTO from "../response.dto";

export default interface ReadingCategoryResponseDTO extends ResponseDTO {
  id: number;
  typeEn: ReadingTypeEn | string;
  typeKr: ReadingTypeKr | string;
  category: string;
  description: string;
  sortOrder: number;
}
