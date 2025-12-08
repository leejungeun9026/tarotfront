import type { TarotCardListResponseDTO } from "@/types/tarotcard/tarotcard";
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
import type { TermsListResponseDTO } from "./response/terms";

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

const TERMS_LIST_URL = () => `${API_DOMAIN}/terms/terms-list`;
const TERMS_URL = () => `${API_DOMAIN}/terms/`;

const TAROT_CARD_URL = () => `${API_DOMAIN}/tarotcard`;

const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;

export const SNS_SIGN_IN_URL = (provider: "kakao" | "naver") =>
  `${API_DOMAIN}/auth/oauth2/${provider}`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

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
    .get(TAROT_CARD_URL())
    .then(responseHandler<TarotCardListResponseDTO>);
  return result;
};

/* ------------------------------------- */
/* auth                                  */
/* ------------------------------------- */

// 로그인
export const signInRequest = async (requestBody: SignInRequestDTO) => {
  console.log(requestBody);
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then(authResponseHandler<SignInResponseDTO>)
    .catch(errorHandler);
  return result;
};

// 회원가입
export const signUpRequest = async (requestBody: SignUpRequestDTO) => {
  console.log(requestBody);
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
