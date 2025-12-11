import axios, { type AxiosResponse } from "axios";
import {
  type CheckCertificationRequestDTO,
  type EmailCertificationRequestDTO,
  type IdCheckRequestDTO,
  type SignInRequestDTO,
  type SignUpRequestDTO,
} from "./request/auth";
import { type ResponseDTO } from "./response";
import {
  type CheckCertificationResponseDTO,
  type EmailCertificationResponseDTO,
  type IdCheckResponseDTO,
  type SignInResponseDTO,
  type SignUpResponseDTO,
} from "./response/auth";
import type {
  ReadingCategoryListResponseDTO,
  ReadingQuestionListResponseDTO,
} from "./response/reading";
import type { TermsListResponseDTO } from "./response/terms";
import type { TarotCardListResponseDTO } from "./response/tarotcard";
import type { ReadingTypeEn } from "@/types/enums";
import type { ReadingResultRequestDTO } from "./request/reading";
import type ReadingResultResponseDTO from "./response/reading/reading-result.response";

const responseHandler = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

const authResponseHandler = <T>(response: AxiosResponse<any, any>) => {
  const responseBody: T = response.data;
  return responseBody;
};
const errorHandler = (error: any): ResponseDTO | null => {
  if (!error.response || !error.response.data) return null;
  const responseBody: ResponseDTO = error.response.data;
  return responseBody;
};

const DOMAIN = "http://localhost:8085";
const API_DOMAIN = `${DOMAIN}/api/v1`;

export const SNS_SIGN_IN_URL = (provider: "kakao" | "naver") =>
  `${API_DOMAIN}/auth/oauth2/${provider}`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;

const TERMS_URL = () => `${API_DOMAIN}/terms/`;
const TERMS_LIST_URL = () => `${API_DOMAIN}/terms/terms-list`;

const TAROT_CARD_LIST_URL = () => `${API_DOMAIN}/tarotcard/tarotcard-list`;

const READING_CATEGORY_LIST_URL = () => `${API_DOMAIN}/reading/category-list`;
const READING_CATEGORY_LIST_TYPE_URL = (typeEn: ReadingTypeEn) =>
  `${API_DOMAIN}/reading/category/${typeEn}`;
const READING_QUESTION_LIST_URL = () => `${API_DOMAIN}/reading/question-list`;
const READING_QUESTION_LIST_TYPE_URL = (typeId: number) =>
  `${API_DOMAIN}/reading/question/${typeId}`;
const READING_RESULT_URL = () => `${API_DOMAIN}/reading/result`;

/* ------------------------------------- */
/* auth                                  */
/* ------------------------------------- */

// 로그인
export const signInRequest = async (requestBody: SignInRequestDTO) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then(authResponseHandler<SignInResponseDTO>)
    .catch(errorHandler);
  return result;
};

// 회원가입
export const signUpRequest = async (requestBody: SignUpRequestDTO) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then(authResponseHandler<SignUpResponseDTO>)
    .catch(errorHandler);
  return result;
};

// idcheck(미사용)
export const idCheckRequest = async (requestBody: IdCheckRequestDTO) => {
  const result = await axios
    .post(ID_CHECK_URL(), requestBody)
    .then(authResponseHandler<IdCheckResponseDTO>)
    .catch(errorHandler);
  return result;
};

// 이메일 검증
export const emailCertificationRequest = async (
  requestBody: EmailCertificationRequestDTO
) => {
  const result = await axios
    .post(EMAIL_CERTIFICATION_URL(), requestBody)
    .then(authResponseHandler<EmailCertificationResponseDTO>)
    .catch(errorHandler);
  return result;
};

// 이메일 인증코드
export const checkCertificationRequest = async (
  requestBody: CheckCertificationRequestDTO
) => {
  const result = await axios
    .post(CHECK_CERTIFICATION_URL(), requestBody)
    .then(authResponseHandler<CheckCertificationResponseDTO>)
    .catch(errorHandler);
  return result;
};

/* ------------------------------------- */
/* 약관                                  */
/* ------------------------------------- */
export const termsListRequest = async (): Promise<TermsListResponseDTO> => {
  const result = await axios
    .get(TERMS_LIST_URL())
    .then(responseHandler<TermsListResponseDTO>);
  return result;
};

/* ------------------------------------- */
/* 타로 카드                             */
/* ------------------------------------- */
export const tarotCardRequest = async (): Promise<TarotCardListResponseDTO> => {
  const result = await axios
    .get(TAROT_CARD_LIST_URL())
    .then(responseHandler<TarotCardListResponseDTO>);
  return result;
};

/* ------------------------------------- */
/* 운세 카테고리 & 질문                  */
/* ------------------------------------- */

// 전체 카테고리 리스트
export const readingCategoryListRequest =
  async (): Promise<ReadingCategoryListResponseDTO> => {
    const result = await axios
      .get(READING_CATEGORY_LIST_URL())
      .then(responseHandler<ReadingCategoryListResponseDTO>);
    return result;
  };

// 타입별 카테고리 리스트
export const readingCategoryListByTypeRequest = async (
  typeEn: ReadingTypeEn
): Promise<ReadingCategoryListResponseDTO> => {
  const result = await axios
    .get(READING_CATEGORY_LIST_TYPE_URL(typeEn))
    .then(responseHandler<ReadingCategoryListResponseDTO>);
  return result;
};

// 전체 질문 리스트
export const readingQuestionListRequest =
  async (): Promise<ReadingQuestionListResponseDTO> => {
    const result = await axios
      .get(READING_QUESTION_LIST_URL())
      .then(responseHandler<ReadingQuestionListResponseDTO>);
    return result;
  };

// 카테고리별 질문 리스트
export const readingQuestionListByCategoryIdRequest = async (
  typeId: number
): Promise<ReadingQuestionListResponseDTO> => {
  const result = await axios
    .get(READING_QUESTION_LIST_TYPE_URL(typeId))
    .then(responseHandler<ReadingQuestionListResponseDTO>);
  return result;
};

/* ------------------------------------- */
/* 리딩 결과                             */
/* ------------------------------------- */

export const readingResultRequest = async (
  requestBody: ReadingResultRequestDTO
) => {
  const start = performance.now(); // 요청 시작 시간

  const result = await axios
    .post(READING_RESULT_URL(), requestBody, { withCredentials: true })
    .then(responseHandler<ReadingResultResponseDTO>);

  const end = performance.now(); // 요청 끝난 시점
  const frontElapsedMs = end - start;

  console.log("리딩 결과 요청응답 시간:", frontElapsedMs.toFixed(0), "ms");
  console.log("리딩 결과 응답:", result);

  // 응답 데이터 + 프론트에서 측정한 시간 둘 다 넘겨줌
  return result;
};
