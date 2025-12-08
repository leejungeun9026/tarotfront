import { create } from "zustand";
import { devtools, persist, } from "zustand/middleware";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";

export interface UserStore {
  id: string;
  username: string;
  name: string;
  role: string;
}

interface UserStoreState {
  user: UserStore | null;
  lastAction: string | null;
  setCurrentUser: (user: UserStore) => void;
  clearCurrentUser: () => void;
}

const useAuthStore = create<UserStoreState>()(
  devtools(
    persist<UserStoreState>(
      (set) => ({
        user: null,
        lastAction: null,
        setCurrentUser: (user: UserStore) => set({
          user,
          lastAction: SET_CURRENT_USER,
        }),
        clearCurrentUser: () => set({
          user: null,
          lastAction: CLEAR_CURRENT_USER,
        })
      }),
      { name: "currentUser" }
    ),
    { name: "currentUser" }
  )
);

export default useAuthStore