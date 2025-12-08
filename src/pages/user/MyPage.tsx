import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearCurrentUser = useAuthStore.getState().clearCurrentUser;
  const [, , removeCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const handleLogout = () => {
    clearCurrentUser();
    removeCookie("accessToken", { path: "/" });
    navigate("/login");
  }

  return (
    <div className="Join">
      <div className="inner px-4 py-6 md:py-10">
        <section>
          <div className="grid w-full items-center gap-3 mb-8">
            <Button onClick={handleLogout} variant="link" className="text-neutral-500">로그아웃</Button>
          </div>
        </section>
      </div >
    </div >
  )
}

export default MyPage