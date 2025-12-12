// stores/useReadingStore.ts
import { create } from "zustand";
import {
  readingCategoryListRequest,
  readingQuestionListRequest,
} from "@/apis";
import type {
  ReadingCategoryListResponseDTO,
  ReadingQuestionListResponseDTO,
  ReadingCategoryResponseDTO,
  ReadingQuestionResponseDTO,
} from "@/apis/response/reading";
import type ResponseDTO from "@/apis/response/response.dto";
import { READING_CATEGORY_CONST } from "@/constants/readingCategory";
import { READING_QUESTION_CONST } from "@/constants/readingQuestion";

// 타입 alias (그냥 보기 편하게)
type Category = ReadingCategoryResponseDTO;
type Question = ReadingQuestionResponseDTO;

interface ReadingStoreState {
  categories: Category[];
  questions: Question[];

  loadingCategories: boolean;
  loadingQuestions: boolean;

  // 이미 한 번 불러왔는지 여부 (중복 호출 방지)
  initializedCategories: boolean;
  initializedQuestions: boolean;

  // 액션
  fetchCategories: () => Promise<void>;
  fetchQuestions: () => Promise<void>;
  fetchAllMasterData: () => Promise<void>;

  // 유틸
  getQuestionsByCategoryId: (categoryId: number) => Question[];
}

export const useReadingStore = create<ReadingStoreState>((set, get) => ({
  categories: [],
  questions: [],

  loadingCategories: false,
  loadingQuestions: false,

  initializedCategories: false,
  initializedQuestions: false,

  // 전체 카테고리 불러오기
  fetchCategories: async () => {
    const { initializedCategories } = get();
    if (initializedCategories) return; // ★ 이미 불러왔으면 API 호출 X

    set({ loadingCategories: true });

    const fallbackList = READING_CATEGORY_CONST.readingCategoryList;

    try {
      const res: ResponseDTO<ReadingCategoryListResponseDTO> =
        await readingCategoryListRequest();

      if (res.code === "SU" && res.data) {
        set({
          categories: res.data.readingCategoryList ?? [],
          initializedCategories: true,
        });
      } else {
        console.warn("[ReadingStore] 카테고리 응답 코드:", res.code);
        // ★ 서버 코드가 SU가 아니면 상수로 fallback
        set({
          categories: fallbackList,
          initializedCategories: true,
        });
      }
    } catch (err) {
      console.error("[ReadingStore] 카테고리 요청 에러:", err);
      // ★ 에러 시에도 fallback
      set({
        categories: fallbackList,
        initializedCategories: true,
      });
    } finally {
      set({ loadingCategories: false });
    }
  },

  // 전체 질문 불러오기
  fetchQuestions: async () => {
    const { initializedQuestions } = get();
    if (initializedQuestions) return; // ★ 이미 불러왔으면 API 호출 X

    set({ loadingQuestions: true });

    const fallbackList = READING_QUESTION_CONST.readingQuestionList;

    try {
      const res: ResponseDTO<ReadingQuestionListResponseDTO> =
        await readingQuestionListRequest();

      if (res.code === "SU" && res.data) {
        set({
          questions: res.data.readingQuestionList ?? [],
          initializedQuestions: true,
        });
      } else {
        console.warn("[ReadingStore] 질문리스트 응답 코드:", res.code);
        set({
          questions: fallbackList,
          initializedQuestions: true,
        });
      }
    } catch (err) {
      console.error("[ReadingStore] 질문리스트 요청 에러:", err);
      set({
        questions: fallbackList,
        initializedQuestions: true,
      });
    } finally {
      set({ loadingQuestions: false });
    }
  },

  // 카테고리 + 질문 한 번에 불러오기 (필요하면)
  fetchAllMasterData: async () => {
    const { fetchCategories, fetchQuestions } = get();
    await Promise.all([fetchCategories(), fetchQuestions()]);
  },

  // 특정 카테고리의 질문만 뽑기
  getQuestionsByCategoryId: (categoryId: number) => {
    const { questions } = get();
    return questions.filter((q) => q.readingCategoryId === categoryId);
  },
}));
