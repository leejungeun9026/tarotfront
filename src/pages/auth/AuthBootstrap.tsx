import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { ResponseCode } from "@/types/enums";
import { userMeRequest } from "@/apis";

export default function AuthBootstrap() {
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const forceLogout = useAuthStore((s) => s.forceLogout);
  const setBootstrapping = useAuthStore((s) => s.setBootstrapping);

  useEffect(() => {
    (async () => {
      try {
        const res = await userMeRequest();

        if (res.data.code === ResponseCode.SUCCESS && res.data.data) {
          setCurrentUser(res.data.data);
        } else {
          forceLogout();
        }
      } catch {
        forceLogout();
      } finally {
        setBootstrapping(false);
      }
    })();
  }, [setCurrentUser, forceLogout, setBootstrapping]);

  return null;
}
