import type { TermsListResponseDTO } from "@/apis/response/terms";

export const TERMS_LIST_CONST: TermsListResponseDTO = {
  "termsList": [
    {
      "id": 1,
      "termsType": "TERMS_MARKETING",
      "title": "서비스 이용약관",
      "content": "약관내용",
      "sortOrder": 1,
      "version": "1.0.0",
      "createdAt": "2025-12-03T17:40:44",
      "required": true
    },
    {
      "id": 3,
      "termsType": "TERMS_MARKETING",
      "title": "개인정보 처리방침",
      "content": "약관내용",
      "sortOrder": 2,
      "version": "1.0.0",
      "createdAt": "2025-12-03T17:41:08",
      "required": true
    }
  ]
}