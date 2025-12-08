import type ResponseDTO from "../response.dto";

export default interface TarotCardResponseDTO extends ResponseDTO {
  id: number;
  nameEn: string;
  nameKr: string;
  arcanaType: string;
  cardNumber: number;
  description: string;
  keyword: string;
  reverseKeyword: string;
}