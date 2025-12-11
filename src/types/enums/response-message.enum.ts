enum ResponseMessage {

  SUCCESS = 'Success.',

  VALIDATION_FAIL = 'Validation Failed.',
  DUPLICATE_ID = 'Duplicate Id.',
  DUPLICATE_EMAIL = 'Duplicate Email.',

  SIGN_IN_FAIL = 'Login information mismatch.',
  CERTIFICATE_FAIL = 'Certification failed.',

  MAIL_FAIL = 'Mail senc faild.',
  DATABASE_ERROR = 'Database error.',

  AI_ERROR = "openAi error"
}

export default ResponseMessage;