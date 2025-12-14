import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAuthStore from "@/stores/useAuthStore";

export default function AuthWatcher() {
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    const check = () => {
      const { user, forceLogout } = useAuthStore.getState();

      // "스토어에 user 있는데" + "쿠키 토큰 없다" => 만료 처리
      if (user && !cookies.accessToken) {
        forceLogout("로그인이 만료되었어요. 다시 로그인해 주세요.");
        window.location.replace("/login");
      }
    };

    check(); // 첫 로드
    const onFocus = () => check();
    window.addEventListener("focus", onFocus);

    const t = window.setInterval(check, 15_000);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(t);
    };
  }, [cookies.accessToken]);

  return null;
}
