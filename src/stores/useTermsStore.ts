// stores/useTermsStore.ts
import { termsListRequest } from "@/apis";
import type ResponseDTO from "@/apis/response/response.dto";
import type {
  TermsListResponseDTO,
  TermsResponseDTO,
} from "@/apis/response/terms";
import { TERMS_LIST_CONST } from "@/constants/terms";
import { create } from "zustand";

interface TermsStoreState {
  terms: TermsResponseDTO[];
  loadingTerms: boolean;
  requiredTermIds: number[];

  fetchTerms: () => Promise<void>;
}

export const useTermsStore = create<TermsStoreState>((set) => ({
  terms: TERMS_LIST_CONST.termsList,
  loadingTerms: false,
  requiredTermIds: TERMS_LIST_CONST.termsList
    .filter((t) => t.required)
    .map((t) => t.id),

  fetchTerms: async () => {
    set({ loadingTerms: true });

    const applyData = (list: TermsResponseDTO[]) => {
      set({
        terms: list,
        requiredTermIds: list
          .filter((t) => t.required === true)
          .map((t) => t.id),
      });
    };

    try {
      const res: ResponseDTO<TermsListResponseDTO> = await termsListRequest();

      if (res.code === "SU" && res.data) {
        const list = res.data.termsList ?? [];
        applyData(list);
      } else {
        console.warn("[TermsStore] 응답 코드:", res.code, "→ TERMS_CONST 사용");
      }
    } catch (err) {
      console.error("[TermsStore] 요청 에러:", err, "→ TERMS_CONST 사용");
    } finally {
      set({ loadingTerms: false });
    }
  },
}));
