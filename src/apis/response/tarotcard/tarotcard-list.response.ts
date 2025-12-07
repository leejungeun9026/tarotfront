import type ResponseDTO from "../response.dto";
import type TermsResponseDTO from "./tarotcard.response";

export type TermsBase  = Omit<TermsResponseDTO, "code" | "message">;

export default interface TarotCardListResponseDTO extends ResponseDTO {
  termsList: TermsBase[];
}
