import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { ResponseCode } from "@/types/enums";
import { userMeRequest } from "@/apis";


export default function AuthBootstrap() {

  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const clearCurrentUser = useAuthStore((s) => s.clearCurrentUser);
  const forceLogout = useAuthStore((s) => s.forceLogout);
  const setBootstrapping = useAuthStore((s) => s.setBootstrapping);

  useEffect(() => {
    (async () => {
      try {
        const res = await userMeRequest();

        if (res.data.code === ResponseCode.SUCCESS && res.data.data) {
          setCurrentUser(res.data.data);
        } else {
          clearCurrentUser();
        }
      } catch {
        clearCurrentUser();
      } finally {
        setBootstrapping(false);
      }
    })();
  }, [setCurrentUser, clearCurrentUser, setBootstrapping]);

  return null;
}
