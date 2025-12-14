import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuthStore from "@/stores/useAuthStore";
import { ResponseCode } from "@/types/enums";
import { Spinner } from "@/components/ui/spinner";
import { userMeRequest } from "@/apis";

export default function OAuth() {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);

  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const forceLogout = useAuthStore((s) => s.forceLogout);

  useEffect(() => {
    (async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", ""));

      const token = params.get("token");
      const expirationTime = Number(params.get("exp") ?? "3600");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const expires = new Date(Date.now() + expirationTime * 1000);

      setCookie("accessToken", token, {
        expires,
        path: "/",
        sameSite: "lax",
      });

      // hash 제거
      window.history.replaceState(null, "", "/auth/oauth-response");

      try {
        const res = await userMeRequest();
        if (res.data.code === ResponseCode.SUCCESS && res.data.data) {
          setCurrentUser(res.data.data);
          navigate("/", { replace: true });
        } else {
          forceLogout();
          navigate("/login", { replace: true });
        }
      } catch {
        forceLogout();
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate, setCookie, setCurrentUser, forceLogout]);

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Spinner />
    </div>
  );
}
