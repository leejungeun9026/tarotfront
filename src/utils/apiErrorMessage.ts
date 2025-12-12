// utils/apiErrorMessage.ts
import { ResponseCode } from "@/types/enums";

export const DEFAULT_ERROR = {
  title: "오류 발생",
  description: "서버와 통신 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
};

export const apiErrorMessageMap: Partial<
  Record<ResponseCode, { title: string; description: string }>
> = {
  [ResponseCode.VALIDATION_FAIL]: {
    title: "요청 오류",
    description: "요청 정보가 올바르지 않아요.",
  },
  [ResponseCode.AUTH_FAIL]: {
    title: "로그인 필요",
    description: "로그인이 필요한 서비스예요. 먼저 로그인해 주세요.",
  },
  [ResponseCode.SIGN_IN_FAIL]: {
    title: "로그인 실패",
    description: "아이디 또는 비밀번호가 올바르지 않아요.",
  },
  [ResponseCode.DUPLICATE_EMAIL]: {
    title: "메일 인증 실패",
    description: "다른 이메일을 이용해주세요.",
  },
  [ResponseCode.DATABASE_ERROR]: {
    title: "서버 오류",
    description: "서버에서 데이터를 처리하는 중 문제가 발생했어요.",
  },
  [ResponseCode.AI_ERROR]: {
    title: "AI 해석 오류",
    description: "AI 해석을 불러오는 중 문제가 발생했어요.",
  },
  // ... 나머지 코드도 필요에 따라 추가
};

export function getApiErrorMessage(code?: ResponseCode) {
  if (!code) return DEFAULT_ERROR;
  return apiErrorMessageMap[code] ?? DEFAULT_ERROR;
}
