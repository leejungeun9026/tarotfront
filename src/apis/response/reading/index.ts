import type ReadingCategoryResponseDTO from "./reading-category.response";
import type ReadingCategoryListResponseDTO from "./reading-category-list.response";
import type ReadingQuestionResponseDTO from "./reading-question.response";
import type ReadingQuestionListResponseDTO from "./reading-question-list.response";

export type {
  ReadingCategoryResponseDTO,
  ReadingCategoryListResponseDTO,
  ReadingQuestionResponseDTO,
  ReadingQuestionListResponseDTO
};

export type ReadingCategoryBase = Omit<
  ReadingCategoryResponseDTO,
  "code" | "message"
>;

export type ReadingQuestionBase = Omit<
  ReadingQuestionResponseDTO,
  "code" | "message"
>;
