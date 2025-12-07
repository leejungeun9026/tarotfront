import { signInRequest, SNS_SIGN_IN_URL } from "@/apis";
import type { SignInResponseDTO } from "@/apis/response/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGlobalAlertDialog } from "@/stores/useGlobalAlertDialog";
import { ResponseCode } from "@/types/enums";
import type { ResponseBody } from "@/types/indes";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

// 정규식
const validateEmail = (email: string) => {
  // 영문/숫자/일부 특수문자만 허용하는 이메일 정규식
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return regex.test(email);
};

function Login() {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const { open, showDialog } = useGlobalAlertDialog();

  const signInResponse = (responseBody: ResponseBody<SignInResponseDTO>) => {
    if (!responseBody) return;

    const { code } = responseBody;

    if (code === ResponseCode.VALIDATION_FAIL) {
      showDialog({
        title: "로그인 실패",
        description: "아이디와 비밀번호를 입력해주세요.",
        confirmText: "확인",
      });
    }
    if (code === ResponseCode.SIGN_IN_FAIL) {
      showDialog({
        title: "로그인 실패",
        description: "아이디와 비밀번호를 입력해주세요.",
        confirmText: "확인",
      });
    }
    if (code === ResponseCode.DATABASE_ERROR) {
      showDialog({
        title: "로그인 실패",
        description: "DB에러, 잠시 후 다시 시도해주세요.",
        confirmText: "확인",
      });
    }
    if (code !== ResponseCode.SUCCESS) return;

    const { token, expirationTime } = responseBody as SignInResponseDTO;
    const now = new Date().getTime() * 1000;
    const expires = new Date(now + expirationTime);

    setCookie("accessToken", token, { expires, path: "/" });
    navigate("/");
  };

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [valid, setValid] = useState({
    username: false,
    password: false,
  });
  const [validMessages, setValidMessages] = useState({
    username: "",
    password: "",
  });
  const [currentInput, setCurrentInput] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      if (currentInput === "username") {
        usernameRef.current?.focus();
        console.log("focus");
      }
      if (currentInput === "password") {
        passwordRef.current?.focus();
        console.log("focus");
      }
    }
  }, [open]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 공백제거
    const trimValue = e.target.value.replace(/[\s\u200B-\u200D\uFEFF]/g, "");

    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: trimValue,
      };
    });
    setValidMessages((prev) => ({
      ...prev,
      password: "",
    }));

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
    // 비밀번호 체크
    if (e.target.name === "password") {
      if (trimValue === "") {
        setValid((prev) => ({ ...prev, password: false }));
        setValidMessages((prev) => ({ ...prev, password: "" }));
        return;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.currentTarget);
    setCurrentInput(e.currentTarget.name);
    console.log(currentInput);
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.currentTarget.blur();
      handleOnLogin();
    }
  };

  const handleOnLogin = () => {
    if (!user.username || !user.password) {
      setValid((prev) => ({ ...prev, password: false }));
      setValidMessages((prev) => ({
        ...prev,
        password: "아이디와 비밀번호를 입력해주세요.",
      }));
    }
    const requestBody = {
      username: user.username,
      password: user.password,
    };

    signInRequest(requestBody).then(signInResponse);
  };

  const handleOnSnsLogin = (provider: "kakao" | "naver") => {
    window.location.href = SNS_SIGN_IN_URL(provider);
  };

  return (
    <div className="Login">
      <div className="inner px-4 py-6 md:py-10">
        <div className="max-w-80 mx-auto">
          <section>
            <div className="grid w-full items-center gap-3 mb-4">
              <Label htmlFor="username">이메일 주소</Label>
              <div>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={user.username}
                  ref={usernameRef}
                  placeholder="example@xxx.com"
                  onChange={handleOnChange}
                  onKeyDown={handleKeyDown}
                />
                <p
                  className={`text-xs mt-1 ${
                    valid.username ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {validMessages.username}
                </p>
              </div>
            </div>
            <div className="grid w-full items-center gap-3 mb-8">
              <Label htmlFor="password">비밀번호</Label>
              <div>
                <Input
                  type="password"
                  name="password"
                  className="tracking-widest placeholder:tracking-normal"
                  id="password"
                  value={user.password}
                  ref={passwordRef}
                  placeholder="비밀번호를 입력해주세요"
                  onChange={handleOnChange}
                  onKeyDown={handleKeyDown}
                />
                <p
                  className={`text-xs mt-1 ${
                    valid.password ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {validMessages.password}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                size="xl"
                className="w-full cursor-pointer"
                onClick={handleOnLogin}
                onKeyDown={() => handleKeyDown}
              >
                로그인
              </Button>
              <Button
                onClick={() => navigate("/join")}
                variant="outline"
                size="xl"
                className="w-full cursor-pointer"
              >
                회원가입
              </Button>
              <div className="mt-2 flex justify-center items-center h-5 space-x-6 text-sm">
                <Link to="/" className="text-neutral-500">
                  아이디 찾기
                </Link>
                <Separator orientation="vertical" />
                <Link to="/" className="text-neutral-500">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </section>
          <div className="flex justify-between items-center gap-2 max-w-80 my-10">
            <Separator className="" />
            <p className="text-sm text-neutral-400 text-nowrap">
              다른 방법으로 로그인
            </p>
            <Separator className="" />
          </div>
          <section>
            <Button
              onClick={() => {
                handleOnSnsLogin("kakao");
              }}
            >
              카카오 로그인
            </Button>
            <Button
              onClick={() => {
                handleOnSnsLogin("naver");
              }}
            >
              네이버 로그인
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
