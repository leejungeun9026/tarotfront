// stores/useTermsStore.ts
import { readingTopQuestionListRequest } from "@/apis";
import type { ReadingTopQuestionListResponseDTO, ReadingTopQuestionResponseDTO } from "@/apis/response/reading";
import type ResponseDTO from "@/apis/response/response.dto";
import { READING_TOP_QUESTION_CONST } from "@/constants/readingTopQuestion";
import { create } from "zustand";

interface TopQuestionStoreState {
  topQuestionList: ReadingTopQuestionResponseDTO[];
  loadingTopQuestion: boolean;

  fetchTopQuestion: () => Promise<void>;
}

export const useTopQuestionStore = create<TopQuestionStoreState>((set) => ({
  topQuestionList: READING_TOP_QUESTION_CONST.topQuestionList,
  loadingTopQuestion: false,

  fetchTopQuestion: async () => {
    set({ loadingTopQuestion: true });

    // 데이터 쌓이면 주석 풀고 DB count 사용하기
    // const applyData = (list: ReadingTopQuestionResponseDTO[]) => {
    //   set({
    //     topQuestionList: list
    //   });
    // };

    // try {
    //   const res: ResponseDTO<ReadingTopQuestionListResponseDTO> = await readingTopQuestionListRequest();

    //   if (res.code === "SU" && res.data) {
    //     const list = res.data.topQuestionList ?? [];
    //     applyData(list);
    //   } else {
    //     console.warn("[TopQuestionStore] 응답 코드:", res.code, "READING_TOP_QUESTION_CONST 사용");
    //   }
    // } catch (err) {
    //   console.error("[TopQuestionStore] 요청 에러:", err, "READING_TOP_QUESTION_CONST 사용");
    // } finally {
    //   set({ loadingTopQuestion: false });
    // }
  },
}));
