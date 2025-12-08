import type ReadingCategoryResponseDTO from "./reading-category.response";
import type ReadingCategoryListResponseDTO from "./reading-category-list.response";

export type { ReadingCategoryResponseDTO, ReadingCategoryListResponseDTO };

export type ReadingCategoryBase = Omit<
  ReadingCategoryResponseDTO,
  "code" | "message"
>;
