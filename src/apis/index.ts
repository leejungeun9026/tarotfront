import { api } from "./axios";
import { customResponseHandler } from "./handler";
import {
  type CheckCertificationRequestDTO,
  type EmailCertificationRequestDTO,
  type SignInRequestDTO,
  type SignUpRequestDTO,
} from "./request/auth";
import type {
  ReadingCommentRequestDTO,
  ReadingResultRequestDTO,
  ReadingTodayRequestDTO,
} from "./request/reading";
import type { ArchiveResponseDTO } from "./response/archive";
import {
  type SignInResponseDTO,
  type UserMeResponseDTO,
} from "./response/auth";
import type PageResponse from "./response/page.response";
import type {
  ReadingCategoryListResponseDTO,
  ReadingQuestionListResponseDTO,
  ReadingResultResponseDTO,
  ReadingTopQuestionListResponseDTO
} from "./response/reading";
import type ResponseDTO from "./response/response.dto";
import type { TarotCardListResponseDTO } from "./response/tarotcard";
import type TermsListResponseDTO from "./response/terms/terms-list.response";

// auth
export const SNS_SIGN_IN_URL = (provider: "kakao" | "naver") =>
  `http://localhost:8085/api/v1/auth/oauth2/${provider}`;
const USER_ME_URL = () => "/auth/me";
const SIGN_UP_URL = () => "/auth/sign-up";
const SIGN_IN_URL = () => "/auth/sign-in";
const EMAIL_CERTIFICATION_URL = () => "/auth/email-certification";
const CHECK_CERTIFICATION_URL = () => "/auth/check-certification";

// 약관
const TERMS_LIST_URL = () => "/terms/terms-list";

// 타로카드
const TAROT_CARD_LIST_URL = () => "/tarotcard/tarotcard-list";

// 운세 카테고리 & 질문
const READING_CATEGORY_LIST_URL = () => "/category/category-list";
const READING_QUESTION_LIST_URL = () => "/category/question-list";

// 리딩
const READING_TOP_QUESTION_LIST_URL = () => "/reading/top-questions";
const READING_RESULT_URL = () => "/reading/result";
const READING_TODAY_URL = () => "/reading/today-result";
const READING_UUID_URL = (uuid: string) => `/reading/${uuid}`;
const READING_COMMENT_URL = (uuid: string) => `/reading/${uuid}/comment`;
const READING_BOOKMARK_URL = (uuid: string) => `/reading/${uuid}/bookmark`;

const ARCHIVE_DATE_URL = () => `/archive/dates`;
const ARCHIVE_LIST_URL = () => `/archive`;

/* ------------------------------------- */
/* auth                                  */
/* ------------------------------------- */
// 로그인 유저 확인
export const userMeRequest = async () => {
  return api.get<ResponseDTO<UserMeResponseDTO>>(USER_ME_URL());
};

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
};

// 회원가입
export const signUpRequest = async (
  requestBody: SignUpRequestDTO
): Promise<ResponseDTO<null>> => {
  console.log("[API] /auth/sign-up 요청:", requestBody);

  const result = await api
    .post<ResponseDTO<null>>(SIGN_UP_URL(), requestBody)
    .then(customResponseHandler<ResponseDTO<null>>);

  console.log("[API] /auth/sign-up 응답:", result);
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

  console.log("[API] /auth/email-certification 응답:", result);
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

  console.log("[API] /auth/check-certification 응답:", result);
  return result;
};

/* ------------------------------------- */
/* 약관                                  */
/* ------------------------------------- */

export const termsListRequest = async (): Promise<
  ResponseDTO<TermsListResponseDTO>
> => {
  console.log("[API] /terms/terms-list 요청");

  const result = await api
    .get<ResponseDTO<TermsListResponseDTO>>(TERMS_LIST_URL())
    .then(customResponseHandler<ResponseDTO<TermsListResponseDTO>>);

  console.log("[API] /terms/terms-list 응답:", result);
  return result;
};

/* ------------------------------------- */
/* 운세 카테고리 & 질문                  */
/* ------------------------------------- */

// 전체 카테고리 리스트
export const readingCategoryListRequest = async (): Promise<
  ResponseDTO<ReadingCategoryListResponseDTO>
> => {
  console.log("[API] /category/category-list 요청");

  const result = await api
    .get<ResponseDTO<ReadingCategoryListResponseDTO>>(
      READING_CATEGORY_LIST_URL()
    )
    .then(customResponseHandler<ResponseDTO<ReadingCategoryListResponseDTO>>);

  console.log("[API] /category/category-list 응답:", result);

  return result;
};

// 전체 질문 리스트
export const readingQuestionListRequest = async (): Promise<
  ResponseDTO<ReadingQuestionListResponseDTO>
> => {
  console.log("[API] /category/question-list 요청");

  const result = await api
    .get<ResponseDTO<ReadingQuestionListResponseDTO>>(
      READING_QUESTION_LIST_URL()
    )
    .then(customResponseHandler<ResponseDTO<ReadingQuestionListResponseDTO>>);

  console.log("[API] /category/question-list 응답:", result);

  return result;
};

/* ------------------------------------- */
/* 타로 카드                             */
/* ------------------------------------- */
export const tarotCardRequest = async (): Promise<
  ResponseDTO<TarotCardListResponseDTO>
> => {
  console.log("[API] /tarotcard/tarotcard-list 요청");

  const result = await api
    .get<ResponseDTO<TarotCardListResponseDTO>>(TAROT_CARD_LIST_URL())
    .then(customResponseHandler<ResponseDTO<TarotCardListResponseDTO>>);

  console.log("[API] /tarotcard/tarotcard-list 응답:", result);
  return result;
};

/* ------------------------------------- */
/* 리딩                                  */
/* ------------------------------------- */

// 결과 생성 및 응답
export const readingResultRequest = async (
  requestBody: ReadingResultRequestDTO
): Promise<ResponseDTO<ReadingResultResponseDTO>> => {
  const start = performance.now(); // 요청 시작 시간
  console.log("[API] /reading/result 요청 시간: ", start);

  const result = await api
    .post<ResponseDTO<ReadingResultResponseDTO>>(
      READING_RESULT_URL(),
      requestBody,
      { withCredentials: true }
    )
    .then(customResponseHandler<ResponseDTO<ReadingResultResponseDTO>>);

  const end = performance.now(); // 요청 끝난 시점
  const frontElapsedMs = end - start;

  console.log(
    "[API] /tarotcard/result 응답 시간:",
    frontElapsedMs.toFixed(0),
    "ms"
  );
  console.log("[API] /reading/result 응답:", result);
  return result;
};

// 오늘의 운세 가져오기
export const readingTodayRequest = async (
  requestBody: ReadingTodayRequestDTO
): Promise<ResponseDTO<ReadingResultResponseDTO>> => {
  console.log("[API] /reading/result-today 요청", requestBody);

  const result = await api
    .post<ResponseDTO<ReadingResultResponseDTO>>(
      READING_TODAY_URL(),
      requestBody,
      { withCredentials: true }
    )
    .then(customResponseHandler<ResponseDTO<ReadingResultResponseDTO>>);
  console.log("[API] /reading/result-today 응답:", result);
  return result;
};

// uuid 결과 조회
export const readingUuidRequest = async (
  uuid: string
): Promise<ResponseDTO<ReadingResultResponseDTO>> => {
  console.log("[API] /reading/uuid 요청");

  const result = await api
    .get<ResponseDTO<ReadingResultResponseDTO>>(READING_UUID_URL(uuid))
    .then(customResponseHandler<ResponseDTO<ReadingResultResponseDTO>>);

  console.log("[API] /reading/uuid 응답:", result);
  return result;
};

// 코멘트 추가
export const readingCommentRequest = async (
  uuid: string,
  requestBody: ReadingCommentRequestDTO
): Promise<ResponseDTO<ReadingResultResponseDTO>> => {
  console.log("[API] /reading/comment 요청", requestBody);

  const result = await api
    .patch<ResponseDTO<ReadingResultResponseDTO>>(READING_COMMENT_URL(uuid), {
      comment: requestBody.comment,
    })
    .then(customResponseHandler<ResponseDTO<ReadingResultResponseDTO>>);

  console.log("[API] /reading/comment 응답:", result);
  return result;
};

// 북마크
export const readingBookmarkToggleRequest = async (
  uuid: string
): Promise<ResponseDTO<ReadingResultResponseDTO>> => {
  const result = await api
    .patch<ResponseDTO<ReadingResultResponseDTO>>(READING_BOOKMARK_URL(uuid))
    .then(customResponseHandler<ResponseDTO<ReadingResultResponseDTO>>);

  return result;
};


export const readingTopQuestionListRequest = async (): Promise<
  ResponseDTO<ReadingTopQuestionListResponseDTO>
> => {
  console.log("[API] /category/top-questions 요청");

  const result = await api
    .get<ResponseDTO<ReadingTopQuestionListResponseDTO>>(
      READING_TOP_QUESTION_LIST_URL()
    )
    .then(customResponseHandler<ResponseDTO<ReadingTopQuestionListResponseDTO>>);

  console.log("[API] /category/top-questions 응답:", result);

  return result;
};


/* ------------------------------------- */
/* 아카이브                              */
/* ------------------------------------- */
// 달력용 중복제거 리스트
export const archiveDateRequest = async (
  from: string,
  to: string
): Promise<ResponseDTO<string[]>> => {
  console.log("[API] /archive/dates 요청", from, to);

  const result = await api
    .get<ResponseDTO<string[]>>(ARCHIVE_DATE_URL(), {
      params: { from, to },
    })
    .then(customResponseHandler<ResponseDTO<string[]>>);
  console.log("[API] /archive/dates 응답:", result);
  return result;
};

// 날짜별 목록
export const archiveListRequest = async (
  date: string,
  page = 0,
  size = 0
): Promise<ResponseDTO<PageResponse<ArchiveResponseDTO>>> => {
  console.log("[API] /archive 요청", date);

  const result = await api
    .get<ResponseDTO<PageResponse<ArchiveResponseDTO>>>(ARCHIVE_LIST_URL(), {
      params: { date, page, size },
    })
    .then(customResponseHandler<ResponseDTO<PageResponse<ArchiveResponseDTO>>>);
  console.log("[API] /archive 응답:", result);
  return result;
};
