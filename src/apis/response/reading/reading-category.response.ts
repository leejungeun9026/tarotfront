import { ReadingTypeEn, ReadingTypeKr } from "@/types/enums";

export default interface ReadingCategoryResponseDTO {
  id: number;
  typeEn: ReadingTypeEn | string;
  typeKr: ReadingTypeKr | string;
  category: string;
  description: string;
  sortOrder: number;
}

