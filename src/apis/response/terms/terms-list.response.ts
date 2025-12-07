import type ResponseDTO from "../response.dto";
import type TermsResponseDTO from "./terms.response";

export default interface TermsListResponseDTO extends ResponseDTO {
  termsList: TermsResponseDTO[];
}
