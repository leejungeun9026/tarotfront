import type ResponseDTO from "../response.dto";

export default interface TermsResponseDTO extends ResponseDTO {
  id: number;
  termsType: string;
  title: string;
  content: string;
  required: boolean;
  sortOrder: number;
  version: string;
  createdAt: Date | string;
}
