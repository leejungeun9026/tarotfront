import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Cookies } from "react-cookie";

export interface UserStore {
  id: number;
  username: string;
  name: string;
  role: string;
}

interface AuthState {
  user: UserStore | null;
  bootstrapping: boolean;

  setCurrentUser: (user: UserStore) => void;
  clearCurrentUser: () => void;

  setBootstrapping: (v: boolean) => void;

  forceLogout: (message?: string) => void;
}

const cookies = new Cookies();

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        bootstrapping: true,

        setBootstrapping: (v) => set({ bootstrapping: v }),

        setCurrentUser: (user) => set({ user }),

        clearCurrentUser: () => set({ user: null }),

        forceLogout: (message) => {
          // 이미 로그아웃 상태면 중복 처리 방지
          if (!get().user) return;

          set({ user: null });
          cookies.remove("accessToken", { path: "/" });

          // 메시지는 선택
          if (message) console.log("[forceLogout]", message);
        },
      }),
      {
        name: "currentUser",
        partialize: (state) => ({ user: state.user }), // bootstrapping은 저장 X
      }
    ),
    { name: "authStore" }
  )
);

export default useAuthStore;
