enum ResponseMessage {
  SUCCESS = 'Success.',
  NETWORK_ERROR = "Networe error.",

  // 400 Bad Request - 요청 본문/파라미터 검증 실패
  VALIDATION_FAIL = 'Validation failed',

  // 401 Unauthorized - 인증 실패(비회원, 토큰 없음/잘못됨)
  AUTH_FAIL = 'Authentication failed',

  // 403 Forbidden - 인증은 됐지만 권한이 없는 경우
  FORBIDDEN = 'Access forbidden',

  // 400 Bad Request - 회원가입 시 중복 관련
  DUPLICATE_ID = 'Duplicate ID',
  DUPLICATE_EMAIL = 'Duplicate email',

  // 401 Unauthorized or 400 Bad Request - 로그인 정보 불일치
  SIGN_IN_FAIL = 'Sign-in failed',

  // 400 Bad Request - 이메일 인증 번호 불일치 등
  CERTIFICATE_FAIL = 'Certification failed',

  // 500 Internal Server Error - 메일 서버 통신 실패
  MAIL_FAIL = 'Mail send failed',

  // 500 Internal Server Error - DB 쿼리/트랜잭션 오류
  DATABASE_ERROR = 'Database error',

  // 500 Internal Server Error - OpenAI API 호출/응답 오류
  AI_ERROR = 'AI response error',

  // 500 Internal Server Error - JSON 직렬화/역직렬화 실패
  SERIALIZE_FAIL = 'Serialization failed'
}

export default ResponseMessage;