// stores/useTarotCardStore.ts
import { create } from "zustand";
import { tarotCardRequest } from "@/apis";
import type {
  TarotCardListResponseDTO,
  TarotCardResponseDTO,
} from "@/apis/response/tarotcard";
import type ResponseDTO from "@/apis/response/response.dto";
import { TAROT_CARDS_CONST } from "@/constants/tarotCards";

interface TarotCardStoreState {
  cards: TarotCardResponseDTO[];
  loadingCards: boolean;

  fetchCards: () => Promise<void>;

  // 유틸
  getCardById: (id: number) => TarotCardResponseDTO | undefined;
  getMajorArcana: () => TarotCardResponseDTO[];
  getMinorArcana: () => TarotCardResponseDTO[];
}

export const useTarotCardStore = create<TarotCardStoreState>((set, get) => ({
  cards: [],
  loadingCards: false,

  fetchCards: async () => {
    set({ loadingCards: true });

    const applyData = (list: TarotCardResponseDTO[]) => {
      set({ cards: list });
    };

    try {
      const res: ResponseDTO<TarotCardListResponseDTO> =
        await tarotCardRequest();

      if (res.code === "SU" && res.data) {
        const list = res.data.tarotCardList ?? [];
        applyData(list);
      } else {
        console.warn("[TarotCardStore] 응답 코드:", res.code, "→ TAROT_CARDS_CONST 사용");
        applyData(TAROT_CARDS_CONST["tarotCardList"]);
      }
    } catch (err) {
      console.error("[TarotCardStore] 요청 에러:", err, "→ TAROT_CARDS_CONST 사용");
      applyData(TAROT_CARDS_CONST["tarotCardList"]);
    } finally {
      set({ loadingCards: false });
    }
  },

  getCardById: (id: number) => {
    const { cards } = get();
    return cards.find((c) => c.id === id);
  },

  getMajorArcana: () => {
    const { cards } = get();
    return cards.filter((c) => c.arcanaType === "MAJOR"); // 타입명은 실제 enum/필드에 맞게 수정
  },

  getMinorArcana: () => {
    const { cards } = get();
    return cards.filter((c) => c.arcanaType === "MINOR");
  },
}));
