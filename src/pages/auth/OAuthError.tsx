import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthError() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // 로그인 페이지로 code로 메시지 전달, 매핑해서 alert 띄우기
    navigate(`/login?code=${encodeURIComponent(code ?? "")}`, {
      replace: true,
    });
  }, [navigate]);

  return null;
}
