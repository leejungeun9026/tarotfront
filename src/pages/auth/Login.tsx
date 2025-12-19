import { signInRequest, SNS_SIGN_IN_URL } from "@/apis";
import { handleApiError } from "@/apis/error-handler";
import type { BaseResponseDTO } from "@/apis/response";
import type { SignInResponseDTO } from "@/apis/response/auth";
import type ResponseDTO from "@/apis/response/response.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/stores/useAuthStore";
import { useGlobalAlertDialog } from "@/stores/useGlobalAlertDialog";
import { ResponseCode } from "@/types/enums";
import { getLoginIcon } from "@/utils/loginIcon";
import { OAUTH_ERROR_MESSAGE } from "@/utils/oauth2ErrorMessage";
import type { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

// 정규식
const validateEmail = (email: string) => {
  // 영문/숫자/일부 특수문자만 허용하는 이메일 정규식
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return regex.test(email);
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const shownRef = useRef(false);
  // const currentUser = useAuthStore((state) => state.user);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const [, setCookie] = useCookies();
  const { showDialog } = useGlobalAlertDialog.getState();
  const dialogOpen = useGlobalAlertDialog((state) => state.open);
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

  // sns로그인 실패 시 메세지
  useEffect(() => {
    if (shownRef.current) return;

    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (!code) return;

    shownRef.current = true;

    const mapped = OAUTH_ERROR_MESSAGE[code] ?? "로그인에 실패했어요.";
    showDialog({
      title: "로그인 실패",
      description: mapped,
      confirmText: "확인",
    });

    // query 제거
    navigate("/login", { replace: true });
  }, [location.search, navigate]);

  useEffect(() => {
    if (!dialogOpen) {
      if (currentInput === "username") {
        usernameRef.current?.focus();
      }
      if (currentInput === "password") {
        passwordRef.current?.focus();
      }
    }
  }, [dialogOpen]);

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

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.name;
    setCurrentInput(inputName);

    if (e.key === "Enter" || e.key === "NumpadEnter") {
      if (inputName === "username") {
        if (!user.username) return;
        passwordRef.current?.focus();
        setValid((prev) => ({ ...prev, password: true }));
        setValidMessages((prev) => ({ ...prev, password: "" }));
      }
      if (inputName === "password") {
        if (!user.password) return;
        handleLogin();
        e.currentTarget.blur();
      }
    }
  };

  const handleLogin = async () => {
    if (!user.username || !user.password) {
      setValid((prev) => ({ ...prev, password: false }));
      setValidMessages((prev) => ({
        ...prev,
        password: "아이디 또는 비밀번호를 입력해주세요.",
      }));
      return;
    }

    // 요청 객체 생성
    const req = {
      username: user.username,
      password: user.password,
    };

    try {
      // 서버 요청
      const responseBody: ResponseDTO<SignInResponseDTO> = await signInRequest(
        req
      );
      console.log("[Login] handleLogin 호출됨, 요청 body:", responseBody);

      const { code, data } = responseBody;
      // 실패시 서버 응답코드 실행
      if (!data || code !== ResponseCode.SUCCESS) {
        handleApiError(responseBody);
        return;
      }

      const { id, username, name, role, token, expirationTime } = data;

      // store에 유저 정보 담기
      setCurrentUser({
        id,
        username,
        name,
        role,
      });

      // 쿠키에 토큰 담기
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);
      setCookie("accessToken", token, { expires, path: "/" });

      navigate("/", { replace: true });
    } catch (error) {
      const err = error as AxiosError<BaseResponseDTO>;
      const apiError = err.response?.data;

      if (apiError) {
        handleApiError(apiError); // 서버 ResponseDTO
      } else {
        handleApiError(null); // 네트워크 단절 등
      }
    }
  };

  const handleSnsLogin = (provider: "kakao" | "naver") => {
    window.location.href = SNS_SIGN_IN_URL(provider);
  };

  return (
    <div className="Login">
      <div className="inner px-4 py-6 sm:py-10 md:py-30 transition-all">
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
                  onKeyDown={handleOnKeyDown}
                />
                <p
                  className={`text-xs mt-1 ${valid.username ? "text-green-600" : "text-red-500"
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
                  onKeyDown={handleOnKeyDown}
                />
                <p
                  className={`text-xs mt-1 ${valid.password ? "text-green-600" : "text-red-500"
                    }`}
                >
                  {validMessages.password}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full h-12" onClick={handleLogin}>
                로그인
              </Button>
              <Button
                onClick={() => navigate("/join")}
                variant="outline"
                size="lg"
                className="w-full h-12"
              >
                회원가입
              </Button>
              <div className="mt-2 flex justify-center items-center h-5 space-x-6 text-sm">
                <Link to="/" className="text-neutral-600">
                  아이디 찾기
                </Link>
                <Separator orientation="vertical" />
                <Link to="/" className="text-neutral-600">
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
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                className="bg-yellow-400 text-stone-900 hover:bg-yellow-400/90 focus-visible:ring-yellow-400/20 dark:focus-visible:ring-yellow-400/40 dark:bg-yellow-400/60"
                onClick={() => {
                  handleSnsLogin("kakao");
                }}
              >
                {getLoginIcon("kakao")}
                카카오로 시작하기
              </Button>
              <Button
                size="lg"
                className="bg-green-500 text-white hover:bg-green-500/90 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40 dark:bg-green-500/60"
                onClick={() => {
                  handleSnsLogin("naver");
                }}
              >
                {getLoginIcon("naver")}
                네이버로 시작하기
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
