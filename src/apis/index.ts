import type { TarotCardListResponseDTO } from "@/types/tarotcard/tarotcard";
import type { Terms } from "@/types/terms/terms";
import axios, { type AxiosResponse } from "axios";
import { type CheckCertificationRequestDTO, type EmailCertificationRequestDTO, type IdCheckRequestDTO, type SignUpRequestDTO } from "./request/auth";
import { type ResponseDTO } from "./response";
import { type CheckCertificationResponseDTO, type EmailCertificationResponseDTO, type IdCheckResponseDTO, type SignUpResponseDTO } from "./response/auth";


const responseHandler = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};
const authResponseHandler = <T>(response: AxiosResponse<any, any>) => {
  const responseBody: T = response.data; return responseBody;
}
const errorHandler = (error: any): ResponseDTO | null => {
  if (!error.response || !error.response.data) return null;
  const responseBody: ResponseDTO = error.response.data;
  return responseBody;
}

const DOMAIN = 'http://localhost:8085';
const API_DOMAIN = `${DOMAIN}/api`;


const TERMS_URL = () => `${API_DOMAIN}/terms`;
const TAROT_CARD_URL = () => `${API_DOMAIN}/tarotcard`;
const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;


/* ------------------------------------- */
/* 약관                                  */
/* ------------------------------------- */
// 백엔드가 배열을 그대로 주는 경우: TermsResponseDTO[]
// 만약 { terms: TermsResponseDTO[] } 이런 형태면 타입만 바꿔주면 돼.
export const termsRequest = async (): Promise<Terms[]> => {
  const { data } = await axios.get<Terms[]>(TERMS_URL());
  return data;
};


/* ------------------------------------- */
/* 타로 카드                             */
/* ------------------------------------- */
export const tarotCardRequest = async (): Promise<TarotCardListResponseDTO> => {
  const result = await axios
    .get<TarotCardListResponseDTO>(TAROT_CARD_URL())
    .then(responseHandler);
  return result;
};


/* ------------------------------------- */
/* auth                                  */
/* ------------------------------------- */
// idcheck(미사용)
export const idCheckRequest = async (requestBody: IdCheckRequestDTO) => {
  const result = await axios.post(ID_CHECK_URL(), requestBody)
    .then(authResponseHandler<IdCheckResponseDTO>)
    .catch(errorHandler)
  return result;
}

// 이메일 검증
export const emailCertificationRequest = async (requestBody: EmailCertificationRequestDTO) => {
  const result = await axios.post(EMAIL_CERTIFICATION_URL(), requestBody)
    .then(authResponseHandler<EmailCertificationResponseDTO>)
    .catch(errorHandler)
  return result;
}

// 이메일 인증코드
export const checkCertificationRequest = async (requestBody: CheckCertificationRequestDTO) => {
  const result = await axios.post(CHECK_CERTIFICATION_URL(), requestBody)
    .then(authResponseHandler<CheckCertificationResponseDTO>)
    .catch(errorHandler)
  return result;
}

// 회원가입
export const signUpRequest = async (requestBody: SignUpRequestDTO) => {
  console.log(requestBody)
  const result = await axios.post(SIGN_UP_URL(), requestBody)
    .then(authResponseHandler<SignUpResponseDTO>)
    .catch(errorHandler)
  return result;
}