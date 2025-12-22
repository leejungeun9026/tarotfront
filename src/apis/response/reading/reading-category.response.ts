export interface ReadingCategoryListResponseDTO {
  readingCategoryList: ReadingCategoryResponseDTO[];
}

export interface ReadingCategoryResponseDTO {
  id: number;
  typeEn: string;
  typeKr: string;
  category: string;
  description: string;
  sortOrder: number;
}
