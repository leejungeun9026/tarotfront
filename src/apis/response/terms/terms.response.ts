import type ResponseDTO from "../response.dto";

export default interface TermsResponseDTO extends ResponseDTO {
  id: number;
  termsType: string;
  title: string;
  content: string | null;
  required: boolean;
  sortOrder: number;
  version: string;
  createdAt: Date | string;
}