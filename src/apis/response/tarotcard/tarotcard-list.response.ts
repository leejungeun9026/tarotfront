import type { TarotCardResponseDTO } from ".";
import type ResponseDTO from "../response.dto";

export default interface TarotCardListResponseDTO extends ResponseDTO {
  tarotCardList: Omit<TarotCardResponseDTO, "code" | "message">[];
}
