import axios from "axios";
import { api } from "./axios";
import { customResponseHandler } from "./handler";
import {
  type CheckCertificationRequestDTO,
  type EmailCertificationRequestDTO,
  type SignInRequestDTO,
  type SignUpRequestDTO
} from "./request/auth";
import type { ReadingResultRequestDTO } from "./request/reading";
import {
  type SignInResponseDTO
} from "./response/auth";
import type {
  ReadingCategoryListResponseDTO,
  ReadingQuestionListResponseDTO
} from "./response/reading";
import type ReadingResultResponseDTO from "./response/reading/reading-result.response";
import type ResponseDTO from "./response/response.dto";
import type { TarotCardListResponseDTO } from "./response/tarotcard";
import type TermsListResponseDTO from "./response/terms/terms-list.response";


export const SNS_SIGN_IN_URL = (provider: "kakao" | "naver") =>
  `/auth/oauth2/${provider}`;
const SIGN_UP_URL = () => "/auth/sign-up";
const SIGN_IN_URL = () => "/auth/sign-in";
const EMAIL_CERTIFICATION_URL = () => "/auth/email-certification";
const CHECK_CERTIFICATION_URL = () => "/auth/check-certification";

const TERMS_LIST_URL = () => "/terms/terms-list";

const TAROT_CARD_LIST_URL = () => "/tarotcard/tarotcard-list";

const READING_CATEGORY_LIST_URL = () => "/reading/category-list";
const READING_QUESTION_LIST_URL = () => "/reading/question-list";
const READING_RESULT_URL = () => "/reading/result";



/* ------------------------------------- */
/* auth                                  */
/* ------------------------------------- */

// 로그인
export const signInRequest = async (
  requestBody: SignInRequestDTO
): Promise<ResponseDTO<SignInResponseDTO>> => {
  console.log("[API] /auth/sign-in 요청:", requestBody);

  const result = await api
    .post<ResponseDTO<SignInResponseDTO>>(SIGN_IN_URL(), requestBody)
    .then(customResponseHandler<ResponseDTO<SignInResponseDTO>>);

  console.log("[API] /auth-sign-in 응답:", result); // { code, message, data }
  return result;
}


// 회원가입
export const signUpRequest = async (
  requestBody: SignUpRequestDTO
): Promise<ResponseDTO<null>> => {
  console.log("[API] /auth/sign-up 요청:", requestBody);

  const result = await api
    .post<ResponseDTO<null>>(SIGN_UP_URL(), requestBody)
    .then(customResponseHandler<ResponseDTO<null>>);

  console.log("[API] /auth/sign-up 응답:", result)
  return result;
};

// 이메일 검증
export const emailCertificationRequest = async (
  requestBody: EmailCertificationRequestDTO
): Promise<ResponseDTO<null>> => {
  console.log("[API] /auth/email-certification 요청:", requestBody);

  const result = await api
    .post<ResponseDTO<null>>(EMAIL_CERTIFICATION_URL(), requestBody)
    .then(customResponseHandler<ResponseDTO<null>>);

  console.log("[API] /auth/email-certification 응답:", result)
  return result;
};

// 이메일 인증코드
export const checkCertificationRequest = async (
  requestBody: CheckCertificationRequestDTO
): Promise<ResponseDTO<null>> => {
  console.log("[API] /auth/check-certification 요청:", requestBody);

  const result = await api
    .post<ResponseDTO<null>>(CHECK_CERTIFICATION_URL(), requestBody)
    .then(customResponseHandler<ResponseDTO<null>>);

  console.log("[API] /auth/check-certification 응답:", result)
  return result;
};


/* ------------------------------------- */
/* 약관                                  */
/* ------------------------------------- */

export const termsListRequest = async (): Promise<ResponseDTO<TermsListResponseDTO>> => {
  console.log("[API] /terms/terms-list 요청");

  const result = await api
    .get<ResponseDTO<TermsListResponseDTO>>(TERMS_LIST_URL())
    .then(customResponseHandler<ResponseDTO<TermsListResponseDTO>>);

  console.log("[API] /terms/terms-list 응답:", result)
  return result;
};



/* ------------------------------------- */
/* 운세 카테고리 & 질문                  */
/* ------------------------------------- */

// 전체 카테고리 리스트
export const readingCategoryListRequest =
  async (): Promise<ResponseDTO<ReadingCategoryListResponseDTO>> => {
    console.log("[API] /reading/category-list 요청");

    const result = await api
      .get<ResponseDTO<ReadingCategoryListResponseDTO>>(READING_CATEGORY_LIST_URL())
      .then(customResponseHandler<ResponseDTO<ReadingCategoryListResponseDTO>>);

    console.log("[API] /reading/category-list 응답:", result);

    return result;
  };

// 전체 질문 리스트
export const readingQuestionListRequest =
  async (): Promise<ResponseDTO<ReadingQuestionListResponseDTO>> => {
    console.log("[API] /reading/question-list 요청");

    const result = await api
      .get<ResponseDTO<ReadingQuestionListResponseDTO>>(READING_QUESTION_LIST_URL())
      .then(customResponseHandler<ResponseDTO<ReadingQuestionListResponseDTO>>);

    console.log("[API] /reading/question-list 응답:", result);

    return result;
  };


/* ------------------------------------- */
/* 타로 카드                             */
/* ------------------------------------- */
export const tarotCardRequest = async (): Promise<ResponseDTO<TarotCardListResponseDTO>> => {
  console.log("[API] /tarotcard/tarotcard-list 요청");

  const result = await api
    .get<ResponseDTO<TarotCardListResponseDTO>>(TAROT_CARD_LIST_URL())
    .then(customResponseHandler<ResponseDTO<TarotCardListResponseDTO>>);

  console.log("[API] /tarotcard/tarotcard-list 응답:", result)
  return result;
};



/* ------------------------------------- */
/* 리딩 결과                             */
/* ------------------------------------- */

export const readingResultRequest = async (
  requestBody: ReadingResultRequestDTO
): Promise<ResponseDTO<ReadingResultResponseDTO>> => {

  const start = performance.now(); // 요청 시작 시간

  const result = await api
    .post<ResponseDTO<ReadingResultResponseDTO>>(READING_RESULT_URL(), requestBody, { withCredentials: true })
    .then(customResponseHandler<ResponseDTO<ReadingResultResponseDTO>>);

  const end = performance.now(); // 요청 끝난 시점
  const frontElapsedMs = end - start;

  console.log("리딩 결과 요청응답 시간:", frontElapsedMs.toFixed(0), "ms");
  console.log("리딩 결과 응답:", result);

  // 응답 데이터 + 프론트에서 측정한 시간 둘 다 넘겨줌
  return result;
};
