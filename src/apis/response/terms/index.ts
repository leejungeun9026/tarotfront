import type TermsResponseDTO from "./terms.response";
import type TermsListResponseDTO from "./terms-list.response";

export type { TermsResponseDTO, TermsListResponseDTO };

export type TermsBase = Omit<TermsResponseDTO, "code" | "message">;
