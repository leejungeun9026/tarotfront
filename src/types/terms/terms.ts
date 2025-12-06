// DB/상수 공통으로 쓰는 기본 약관 (content 포함)
export type TermsBase = {
  id: number;
  code: string;
  title: string;
  content: string;
  sortOrder: number;
  version: string;
  createdAt: string;
  active: boolean;
  required: boolean;
};

// 프론트에서 DB에서 받아오는 응답 타입 (필드 동일)
export type Terms = TermsBase;

// API에서 약관 목록 응답 타입
export type TermsResponseDTO = {
  terms: Terms[];
};

// 프론트 전용 확장 타입 (체크 여부 등 추가 가능)
export type TermsWithChecked = Terms & {
  checked?: boolean;   // 선택 여부
};
