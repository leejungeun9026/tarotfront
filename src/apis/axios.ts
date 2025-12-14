import axios from "axios";
import { Cookies } from "react-cookie";
import useAuthStore from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: "http://localhost:8085/api/v1",
  withCredentials: true,
});

const cookies = new Cookies();

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    // 인증 실패/만료
    if ([401, 403, 419].includes(status)) {
      const { user, forceLogout } = useAuthStore.getState();

      // 로그인 상태였는데 인증 깨짐 -> 정리 + 로그인으로 이동
      if (user) {
        forceLogout("로그인이 만료되었어요. 다시 로그인해 주세요.");
        cookies.remove("accessToken", { path: "/" });
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);
