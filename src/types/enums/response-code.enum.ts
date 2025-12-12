enum ResponseCode {
  SUCCESS = 'SU',
  NETWORK_ERROR = "NE",

  VALIDATION_FAIL = 'VF',   // 요청 검증 실패 (DTO 필드 누락 등)

  AUTH_FAIL = 'AF',         // 인증/로그인 안됨 
  FORBIDDEN = 'FB',         // 권한 없음 

  DUPLICATE_ID = 'DI',      // 중복 아이디
  DUPLICATE_EMAIL = 'DE',   // 중복 이메일

  SIGN_IN_FAIL = 'SF',      // 로그인 실패
  CERTIFICATE_FAIL = 'CF',  // 인증 실패  
  MAIL_FAIL = 'MF',         // 인증메일 전송 실패

  DATABASE_ERROR = 'DBE',   // 데이터베이내 에러

  AI_ERROR = "AE",          // open ai 에러
  SERIALIZE_FAIL = 'SE'     // json 변환 실패
}

export default ResponseCode;