import { create } from "zustand";
import { devtools, persist, } from "zustand/middleware";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserStoreState {
  user: User | null;
  lastAction: typeof SET_CURRENT_USER | typeof CLEAR_CURRENT_USER | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}

const logger = (config) => (set, get, api) => {
  return config(
    (...args) => {
      console.log("[Zustand]로그", ...args);
      set(...args);
    },
    get, api
  )
}
const useUserStore = create(
  logger(
    devtools(
      persist(
        (set) => ({
          user: null,
          setCurrentUser: (user: User) => set({
            user,
            lastAction: SET_CURRENT_USER,
          }),
          clearCurrentUser: () => set({
            user: null,
            lastAction: CLEAR_CURRENT_USER,
          })
        })
        , { name: "currentUser" }
      )
      , { name: "currentUser" }
    )
  )
)

export default useUserStore