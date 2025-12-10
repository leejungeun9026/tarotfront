import type {
  CheckCertificationRequestDTO,
  EmailCertificationRequestDTO,
  SignUpRequestDTO,
} from "@/apis/request/auth";
import type {
  CheckCertificationResponseDTO,
  EmailCertificationResponseDTO,
  SignUpResponseDTO,
} from "@/apis/response/auth";
import type { TermsBase } from "@/apis/response/terms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TERMS_CONST } from "@/constants/terms";
import { useGlobalAlertDialog } from "@/stores/useGlobalAlertDialog";
import type { ResponseBody } from "@/types";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkCertificationRequest,
  emailCertificationRequest,
  signUpRequest,
  termsListRequest,
} from "../../apis";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Spinner } from "../../components/ui/spinner";
import { ResponseCode } from "../../types/enums";

// 정규식
const validateEmail = (email: string) => {
  // 영문/숫자/일부 특수문자만 허용하는 이메일 정규식
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return regex.test(email);
};
const validateCertificationNum = (certificationNum: string) => {
  const regex = /^\d*$/;
  return regex.test(certificationNum);
};
const validatePassword = (pw: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=])[A-Za-z\d!@#$%^&*()_+\-=]{8,20}$/;
  return regex.test(pw);
};
const validateNickname = (name: string) => {
  const regex = /^[ㄱ-힣a-zA-Z0-9]{2,10}$/;
  return regex.test(name);
};

function Join() {
  const navigate = useNavigate();
  const { showDialog } = useGlobalAlertDialog();

  const [user, setUser] = useState<SignUpRequestDTO & { passwordChk: string }>({
    username: "",
    certificationNum: "",
    password: "",
    passwordChk: "",
    name: "",
    agreedTermIds: [],
  });

  const [valid, setValid] = useState({
    username: false,
    certificationNum: false,
    password: false,
    passwordChk: false,
    name: false,
  });

  const [validMessages, setValidMessages] = useState({
    username: "",
    certificationNum: "",
    password: "",
    passwordChk: "",
    name: "",
  });

  const termList = TERMS_CONST;
  const [terms, setTerms] = useState<TermsBase[]>(termList);
  const requiredIds = terms.filter((t) => t.required === true).map((t) => t.id); // 필수약관
  const [requiredTermIds, setRequiredTermIds] = useState(requiredIds);

  // 이메일
  const [submitMail, setSubmitMail] = useState(true);
  const [submitMailReadonly, setSubmitMailReadonly] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // 타이머
  const [remainSec, setRemainSec] = useState(0);
  const timerRef = useRef<number | null>(null);
  // 인증코드
  const [submitCode, setSubmitCode] = useState(true);
  const [submitCodeReadonly, setSubmitCodeReadonly] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  const initialUserState: SignUpRequestDTO & { passwordChk: string } = {
    username: "",
    certificationNum: "",
    password: "",
    passwordChk: "",
    name: "",
    agreedTermIds: [],
  };

  const initialValidState = {
    username: false,
    certificationNum: false,
    password: false,
    passwordChk: false,
    name: false,
  };

  const initialValidMessagesState = {
    username: "",
    certificationNum: "",
    password: "",
    passwordChk: "",
    name: "",
  };

  // api response
  const emailCertificationResponse = (
    responseBody: ResponseBody<EmailCertificationResponseDTO>
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;

    if (code === ResponseCode.DUPLICATE_EMAIL) {
      setSubmitMailReadonly(false); // username input readonly
      setIsSending(false); // 전송중 버튼 숨김
      setSubmitMail(true); //메일인증 버튼 보임
      setValid((prev) => ({ ...prev, username: false }));
      setValidMessages((prev) => ({
        ...prev,
        username: "다른 이메일을 이용해주세요.",
      }));
    }
    if (code === ResponseCode.MAIL_FAIL) {
      setIsSending(false); // 전송중 버튼 숨김
      setSubmitMail(true); //메일인증 버튼 보임
      setValid((prev) => ({ ...prev, username: false }));
      setValidMessages((prev) => ({
        ...prev,
        username: "인증번호 메일 발송을 실패했어요.",
      }));
    }
    if (code === ResponseCode.DATABASE_ERROR) {
      setIsSending(false); // 전송중 버튼 숨김
      setSubmitMail(true); //메일인증 버튼 보임
      setValid((prev) => ({ ...prev, username: false }));
      setValidMessages((prev) => ({ ...prev, username: "데이터베이스 오류" }));
    }
    if (code === ResponseCode.SUCCESS) {
      setSubmitMailReadonly(true); // username input readonly
      setCodeSuccess(false);
      setIsSending(false); // 전송중 버튼 숨김
      setSendSuccess(true); // 발송성공 버튼 보임
      setValid((prev) => ({ ...prev, username: true }));
      setValidMessages((prev) => ({
        ...prev,
        username: "인증번호 발송 성공",
      }));
      startTimer(300);
    }
  };

  const checkCertificationResponse = (
    responseBody: ResponseBody<CheckCertificationResponseDTO>
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;

    if (code === ResponseCode.CERTIFICATE_FAIL) {
      setIsVerifying(false); // 확인중 버튼 숨김
      setSubmitCode(true); // 인증확인 버튼 보임
      setSubmitCodeReadonly(false);
      setValid((prev) => ({ ...prev, certificationNum: false }));
      setValidMessages((prev) => ({
        ...prev,
        certificationNum: "인증번호가 일치하지 않아요",
      }));
    }

    if (code === ResponseCode.DATABASE_ERROR) {
      setIsVerifying(false); // 확인중 버튼 숨김
      setSubmitCode(true); // 인증확인 버튼 보임
      setSubmitCodeReadonly(false);
      setValid((prev) => ({ ...prev, certificationNum: false }));
      setValidMessages((prev) => ({
        ...prev,
        certificationNum: "데이터베이스 오류",
      }));
    }
    if (code === ResponseCode.SUCCESS) {
      setSubmitMailReadonly(true);
      setIsVerifying(false); // 확인중 버튼 숨김
      setCodeSuccess(true); // 확인완료 버튼 보임
      setValid((prev) => ({
        ...prev,
        certificationNum: true,
      }));
      setValidMessages((prev) => ({
        ...prev,
        certificationNum: "이메일 인증 완료!",
      }));
      stopTimer();
    }
  };

  const signUpResponse = (responseBody: ResponseBody<SignUpResponseDTO>) => {
    if (!responseBody) return;

    const { code } = responseBody;

    if (code === ResponseCode.DATABASE_ERROR) {
      alert("DB오류");
      setUser(initialUserState);
      setValid(initialValidState);
      setValidMessages(initialValidMessagesState);
      setSendSuccess(false);
      setCodeSuccess(false);
      stopTimer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (code === ResponseCode.DUPLICATE_EMAIL) {
      alert("다른 이메일을 이용해주세요");
      setUser(initialUserState);
      setValid(initialValidState);
      setValidMessages(initialValidMessagesState);
      setSendSuccess(false);
      setCodeSuccess(false);
      stopTimer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (code === ResponseCode.CERTIFICATE_FAIL) {
      alert("인증 실패. 회원가입을 다시 시도해주세요");
      setUser(initialUserState);
      setValid(initialValidState);
      setValidMessages(initialValidMessagesState);
      setSendSuccess(false);
      setCodeSuccess(false);
      stopTimer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (code === ResponseCode.SUCCESS) {
      showDialog({
        title: "회원가입 성공",
        description: "로그인 페이지로 이동합니다.",
        confirmText: "확인",
        cancelText: "",
        onConfirm: () => {
          navigate("/login");
        },
      });
    }
  };

  // DB에서 약관 가져오기
  useEffect(() => {
    termsListRequest()
      .then((data) => {
        console.log("dbterms :", data);
        // 성공시 terms state 업데이트
        const dbTermsList = data.termsList;
        setTerms(dbTermsList);
        // 필수 약관 아이디 다시 저장
        const requiredIds = dbTermsList
          .filter((t: TermsBase) => t.required === true)
          .map((t: TermsBase) => t.id);
        setRequiredTermIds(requiredIds);
      })
      .catch((err) => {
        console.log(err);
        // 실패시 상수값 그대로 사용
        setTerms(TERMS_CONST);
        setRequiredTermIds(
          TERMS_CONST.filter((t) => t.required).map((t) => t.id)
        );
      });
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 공백제거
    const trimValue = e.target.value.replace(/[\s\u200B-\u200D\uFEFF]/g, "");

    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: trimValue,
      };
    });

    // 이메일 형식 체크
    if (e.target.name === "username") {
      // 값이 비어있으면 메시지 모두 제거하고 리턴
      if (trimValue === "") {
        setValid((prev) => ({ ...prev, username: false }));
        setValidMessages((prev) => ({ ...prev, username: "" }));
        return;
      }

      // 형식 검사 수행
      if (!validateEmail(trimValue)) {
        setValid((prev) => ({ ...prev, username: false }));
        setValidMessages((prev) => ({
          ...prev,
          username: "올바른 이메일 형식이 아니에요",
        }));
      } else {
        setValid((prev) => ({ ...prev, username: true }));
        setValidMessages((prev) => ({ ...prev, username: "" }));
      }
    }

    // 인증코드
    if (e.target.name === "certificationNum") {
      if (trimValue === "") {
        setValid((prev) => ({ ...prev, certificationNum: false }));
        setValidMessages((prev) => ({ ...prev, certificationNum: "" }));
        return;
      }
      // 값이 있을 때 형식 검사 수행
      if (!validateCertificationNum(trimValue)) {
        setValid((prev) => ({ ...prev, certificationNum: false }));
        setValidMessages((prev) => ({
          ...prev,
          certificationNum: "숫자만 입력해주세요.",
        }));
        setUser((prev) => ({ ...prev, certificationNum: "" }));
      } else {
        setValidMessages((prev) => ({
          ...prev,
          certificationNum: "",
        }));
      }
    }

    // 비밀번호 체크
    if (e.target.name === "password") {
      if (trimValue === "") {
        setValid((prev) => ({ ...prev, password: false }));
        setValidMessages((prev) => ({ ...prev, password: "" }));
        return;
      }

      const forbiddenCharRegex = /[^A-Za-z0-9!@#$%^&*()_+\-=]/;
      if (forbiddenCharRegex.test(trimValue)) {
        setValidMessages((prev) => ({
          ...prev,
          password: "사용할 수 없는 특수문자예요. (사용 가능: !@#$%^&*()_+-=)",
        }));
        setValid((prev) => ({ ...prev, password: false }));
      } else if (!validatePassword(trimValue)) {
        setValidMessages((prev) => ({
          ...prev,
          password: "영문/숫자/특수문자 조합 8자 이상 작성해주세요.",
        }));
        setValid((prev) => ({ ...prev, password: false }));
      } else {
        setValidMessages((prev) => ({ ...prev, password: "" }));
        setValid((prev) => ({ ...prev, password: true }));
      }

      // 비밀번호 변경 시 비밀번호 확인도 다시 체크
      if (user.passwordChk.length > 0) {
        if (trimValue === "") {
          setValid((prev) => ({ ...prev, passwordChk: false }));
          setValidMessages((prev) => ({ ...prev, passwordChk: "" }));
          return;
        }
        if (trimValue === user.passwordChk) {
          setValidMessages((prev) => ({ ...prev, passwordChk: "" }));
          setValid((prev) => ({ ...prev, passwordChk: true }));
        } else {
          setValidMessages((prev) => ({
            ...prev,
            passwordChk: "비밀번호가 일치하지 않아요.",
          }));
          setValid((prev) => ({ ...prev, passwordChk: false }));
        }
      }
    }

    if (e.target.name === "passwordChk") {
      if (trimValue === "") {
        setValid((prev) => ({ ...prev, passwordChk: false }));
        setValidMessages((prev) => ({ ...prev, passwordChk: "" }));
        return;
      }
      if (trimValue !== user.password) {
        setValid((prev) => ({ ...prev, passwordChk: false }));
        setValidMessages((prev) => ({
          ...prev,
          passwordChk: "비밀번호가 일치하지 않아요",
        }));
      } else {
        setValid((prev) => ({ ...prev, passwordChk: true }));
        setValidMessages((prev) => ({
          ...prev,
          passwordChk: "비밀번호가 일치해요!",
        }));
      }
    }

    // 닉네임 체크
    if (e.target.name === "name") {
      if (trimValue === "") {
        setValid((prev) => ({ ...prev, name: false }));
        setValidMessages((prev) => ({ ...prev, name: "" }));
        return;
      }
      if (!validateNickname(trimValue)) {
        setValid((prev) => ({ ...prev, name: false }));
        setValidMessages((prev) => ({
          ...prev,
          name: "닉네임은 한글/영문/숫자 2~10자로 입력해주세요",
        }));
      } else {
        setValid((prev) => ({ ...prev, name: true }));
        setValidMessages((prev) => ({
          ...prev,
          name: `반가워요 ${trimValue}님, 좋은 닉네임이에요!`,
        }));
      }
    }
  };

  // 타이머 시작 함수
  const startTimer = (seconds: number) => {
    // 기존 타이머 있으면 먼저 정리
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRemainSec(seconds);
    const id = window.setInterval(() => {
      setRemainSec((prev) => {
        if (prev <= 1) {
          // 0이 되면 타이머 멈추기
          clearInterval(id);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = id;
  };

  // 타이머 정지 함수
  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const minutes = String(Math.floor(remainSec / 60)).padStart(2, "0");
  const seconds = String(remainSec % 60).padStart(2, "0");

  // 메일 인증 버튼
  const handleSendMail = () => {
    if (!user.username) return;

    // 재인증시 코드 초기화하기
    setUser((prev) => ({ ...prev, certificationNum: "" }));
    setValidMessages((prev) => ({
      ...prev,
      username: "",
      certificationNum: "",
    }));

    // 버튼 상태 변경
    setSubmitMail(false); // 메일인증 버튼 숨김
    setIsSending(true); // 전송중 버튼 보임
    setSubmitMailReadonly(true); // username input readonly

    // 요청 객체 생성 및 api 요청
    const requestBody: EmailCertificationRequestDTO = {
      username: user.username,
    };
    emailCertificationRequest(requestBody).then(emailCertificationResponse);
  };

  // 코드 확인 버튼
  const handleVerifyCode = () => {
    if (!user.username && !user.certificationNum) return;

    setSubmitCode(false); // 인증확인 버튼 숨김
    setIsVerifying(true); // 확인중 버튼 보임
    setSubmitCodeReadonly(true); // input code readonly

    // 요청 객체 생성 및 api 요청
    const requestBody: CheckCertificationRequestDTO = {
      username: user.username,
      certificationNum: user.certificationNum,
    };

    checkCertificationRequest(requestBody).then(checkCertificationResponse);
  };

  // 동의한 약관의 아이디를 유저 정보에 넣기
  const toggleTermAgree = (termId: number, checked: boolean) => {
    setUser((prev) => {
      if (checked) {
        if (prev.agreedTermIds.includes(termId)) return prev;
        return {
          ...prev,
          agreedTermIds: [...prev.agreedTermIds, termId],
        };
      } else {
        return {
          ...prev,
          agreedTermIds: prev.agreedTermIds.filter((id) => id !== termId),
        };
      }
    });
  };

  // 전체 동의 체크박스 구현
  const allTermIds = terms.map((t) => t.id);
  const isAllChecked =
    terms.length > 0 &&
    allTermIds.every((id) => user.agreedTermIds.includes(id));
  const isIndeterminate = user.agreedTermIds.length > 0 && !isAllChecked;

  // 가입 버튼 활성화 조건
  const isFormValid =
    valid.username &&
    valid.certificationNum &&
    codeSuccess &&
    valid.password &&
    valid.passwordChk &&
    valid.name &&
    requiredTermIds.length > 0 &&
    requiredTermIds.every((id) => user.agreedTermIds.includes(id));

  const handleJoin = () => {
    const responseBody: SignUpRequestDTO = {
      username: user.username,
      certificationNum: user.certificationNum,
      password: user.password,
      name: user.name,
      agreedTermIds: user.agreedTermIds,
    };

    signUpRequest(responseBody).then(signUpResponse);
  };

  return (
    <div className="Join">
      <div className="inner px-4 py-6 md:py-10">
        <section>
          <div className="grid w-full items-center gap-3 mb-8">
            <Label htmlFor="username">이메일 주소</Label>
            <div>
              <div className="flex gap-1.5">
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="example@xxx.com"
                  value={user.username}
                  readOnly={submitMailReadonly}
                  className="likedisabled"
                  onChange={handleOnChange}
                />
                <div className="w-24">
                  {submitMail && !isSending && !sendSuccess && (
                    <Button
                      id="sumbitMail"
                      variant="outline"
                      className="w-24 h-11"
                      disabled={!user.username || !valid.username}
                      onClick={handleSendMail}
                    >
                      메일 인증
                    </Button>
                  )}
                  {isSending && (
                    <Button
                      variant="outline"
                      className="w-24 h-11 gap-1.5"
                      disabled
                    >
                      <div className="shrink-0">
                        <Spinner className="w-4 h-4" />
                      </div>
                      전송중...
                    </Button>
                  )}
                  {sendSuccess &&
                    !isSending &&
                    !(!codeSuccess && remainSec === 0) && (
                      <Button variant="outline" className="w-24 h-11" disabled>
                        발송 성공
                      </Button>
                    )}
                  {sendSuccess &&
                    !isSending &&
                    !codeSuccess &&
                    remainSec === 0 && (
                      <Button
                        id="reSubmitMail"
                        variant="outline"
                        className="w-24 h-11"
                        onClick={handleSendMail}
                      >
                        재인증
                      </Button>
                    )}
                </div>
              </div>
              <p
                className={`text-xs mt-1 ${
                  valid.username ? "text-green-600" : "text-red-500"
                }`}
              >
                {validMessages.username}
              </p>
              {sendSuccess && (
                <>
                  <div className="flex gap-1.5 mt-2">
                    <Input
                      type="text"
                      name="certificationNum"
                      placeholder="인증번호 입력"
                      maxLength={5}
                      className="likedisabled"
                      value={user.certificationNum}
                      disabled={remainSec === 0}
                      readOnly={submitCodeReadonly}
                      onChange={handleOnChange}
                    />
                    <div className="w-24">
                      {submitCode && (
                        <Button
                          variant="outline"
                          className="w-24 h-11"
                          disabled={remainSec === 0 || !user.certificationNum}
                          onClick={handleVerifyCode}
                        >
                          인증 확인
                        </Button>
                      )}
                      {isVerifying && (
                        <Button
                          variant="outline"
                          className="w-24 h-11 gap-1.5"
                          disabled
                        >
                          <div className="shrink-0">
                            <Spinner className="w-4 h-4" />
                          </div>
                          확인 중...
                        </Button>
                      )}
                      {codeSuccess && (
                        <Button
                          variant="outline"
                          className="w-24 h-11"
                          disabled
                        >
                          인증 완료
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {remainSec > 0 && (
                      <p
                        className={`text-xs ${
                          valid.certificationNum
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {validMessages.certificationNum}
                      </p>
                    )}
                    <p className="text-xs text-red-500">
                      {!codeSuccess && remainSec > 0 && (
                        <>
                          {minutes}:{seconds}
                        </>
                      )}
                      {remainSec === 0 && (
                        <>인증 시간이 만료되었어요. 다시 요청해 주세요.</>
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid w-full items-center gap-3 mb-8">
            <Label htmlFor="password">비밀번호</Label>
            <div>
              <Input
                type="password"
                id="password"
                name="password"
                className="tracking-widest placeholder:tracking-normal"
                placeholder="영문/숫자/특수문자 조합 8~20자"
                value={user.password}
                onChange={handleOnChange}
              />
              <p
                className={`text-xs mt-1 ${
                  valid.password ? "text-green-600" : "text-red-500"
                }`}
              >
                {validMessages.password}
              </p>
              <Input
                type="password"
                name="passwordChk"
                className="tracking-widest placeholder:tracking-normal mt-2"
                placeholder="비밀번호 확인"
                value={user.passwordChk}
                onChange={handleOnChange}
              />
              <p
                className={`text-xs mt-1 ${
                  valid.passwordChk ? "text-green-600" : "text-red-500"
                }`}
              >
                {validMessages.passwordChk}
              </p>
            </div>
          </div>

          <div className="grid w-full items-center gap-3 mb-8">
            <Label htmlFor="name">닉네임</Label>
            <div>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="한글/영문/숫자 조합 2~10자"
                value={user.name}
                onChange={handleOnChange}
              />
              <p
                className={`text-xs mt-1 ${
                  valid.name ? "text-green-600" : "text-red-500"
                }`}
              >
                {validMessages.name}
              </p>
            </div>
          </div>

          <div className="grid w-full items-center gap-3 mt-12 mb-8">
            <Card className="gap-0 p-0 rounded-md overflow-hidden">
              <CardHeader className="block p-0 [.border-b]:pb-0 bg-muted border-b">
                <Label
                  htmlFor="AllTermsChk"
                  className="items-start gap-3 p-4 cursor-pointer"
                >
                  <Checkbox
                    id="AllTermsChk"
                    checked={
                      isAllChecked
                        ? true
                        : isIndeterminate
                        ? "indeterminate"
                        : false
                    }
                    className="bg-white"
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        // 전체 동의 → 모든 약관 id 넣기
                        setUser((prev) => ({
                          ...prev,
                          agreedTermIds: allTermIds,
                        }));
                      } else {
                        // 전체 해제
                        setUser((prev) => ({
                          ...prev,
                          agreedTermIds: [],
                        }));
                      }
                    }}
                  />
                  <div className="pt-0.5">
                    <b>전체 동의</b>
                    <p className="text-xs mt-2 opacity-50">
                      전체 동의에는 필수 및 선택 항목이 포함되며, 선택 항목에
                      동의하지 않아도 서비스 이용이 가능합니다.
                    </p>
                  </div>
                </Label>
              </CardHeader>
              <CardContent className="p-0">
                <ul>
                  {terms.map((item) => {
                    const checkboxId = `term-${item.id}`;
                    const isChecked = user.agreedTermIds.includes(item.id);
                    return (
                      <li key={item.id} className=" not-last:border-b">
                        <div className="flex items-center">
                          <Label className="items-center gap-3 p-4 grow cursor-pointer">
                            <Checkbox
                              name="agreedTermIds"
                              id={checkboxId}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                // shadcn Checkbox는 true | false | "indeterminate" 를 줘서 boolean으로 변환
                                toggleTermAgree(item.id, checked === true);
                              }}
                            />
                            <p>
                              {item.title}
                              {item.required && (
                                <span className="ms-1 text-red-400">
                                  (필수)
                                </span>
                              )}
                            </p>
                          </Label>
                          {item.content !== null && (
                            <div className="p-1.5">
                              <Button
                                variant="outline"
                                size="icon"
                                aria-label="Submit"
                                className="border-0 rounded-sm shadow-none"
                              >
                                <ChevronRight />
                              </Button>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        <Button
          disabled={!isFormValid}
          onClick={handleJoin}
          size="xl"
          className="w-full"
        >
          가입하기
        </Button>
      </div>
    </div>
  );
}

export default Join;
