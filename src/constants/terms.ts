import type { TermsBase } from "@/apis/response/tarotcard/tarotcard-list.response";

export const TERMS_CONST: TermsBase[] = [
  {
    id: 1,
    termsType: "TERMS_SERVICE",
    title: "만 14세 이상",
    content: null,
    required: true,
    sortOrder: 0,
    version: "1.0.0",
    createdAt: "2025-12-07T11:22:24",
  },
  {
    id: 4,
    termsType: "TERMS_MARKETING",
    title: "마케팅 수신 동의",
    content: "약관내용",
    required: false,
    sortOrder: 0,
    version: "1.0.0",
    createdAt: "2025-12-07T11:22:24",
  },
  {
    id: 2,
    termsType: "TERMS_SERVICE",
    title: "서비스 이용약관",
    content: "약관내용",
    required: true,
    sortOrder: 1,
    version: "1.0.0",
    createdAt: "2025-12-07T11:22:24",
  },
  {
    id: 3,
    termsType: "TERMS_PRIVACY",
    title: "개인정보 처리방침",
    content: "약관내용",
    required: true,
    sortOrder: 2,
    version: "1.0.0",
    createdAt: "2025-12-07T11:22:24",
  },
];
