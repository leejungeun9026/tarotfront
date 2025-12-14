export default interface ArchiveResponseDTO {
  uuid: string;
  resultTitle: string;
  resultSummary: string;
  categoryType: string | null;
  categoryName: string | null;
  question: string;
  spreadType: string;
  createdAt: Date;
  bookmarked: boolean;
  commented: boolean;
  cardId: number;
}
