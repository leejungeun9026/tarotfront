import type ResponseDTO from "../response.dto";

export default interface TarotCardResponseDTO extends ResponseDTO {
  id: number;
  termsType: string;
  title: string;
  content: string | null;
  required: boolean;
  sortOrder: number;
  version: string;
  createdAt: Date | string;
}
