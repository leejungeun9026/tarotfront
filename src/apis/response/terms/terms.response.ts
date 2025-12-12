export default interface TermsResponseDTO {
  id: number;
  termsType: string;
  title: string;
  content: string | null;
  required: boolean;
  sortOrder: number;
  version: string;
  createdAt: Date | string;
}
