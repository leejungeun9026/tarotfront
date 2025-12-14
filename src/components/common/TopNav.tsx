import { useLocation, useNavigate } from "react-router-dom";
import { topNavHeight } from "../../constants/appHeight";
import appIcon from "../../assets/app-icon.png";
import { useEffect, useState } from "react";

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [glass, setGlass] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setGlass(window.scrollY >= topNavHeight);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // 새로고침 대비
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const titleMap: Record<string, string> = {
    "/": "타로버블팁",
    "/guide": "타로 정보",
    "/reading": "운세 보기",
    "/archive": "보관함",
    "/login": "로그인",
    "/join": "회원가입",
    "/mypage": "마이페이지",
  };

  const getTitle = (path: string) => {
    if (path.startsWith("/guide")) return "타로 정보";
    if (path.startsWith("/reading")) return "운세 보기";
    if (path.startsWith("/archive/result/")) return "보관함";
    return titleMap[path] ?? "";
  };

  const title = getTitle(location.pathname);

  if (location.pathname === "/") {
    {
      /* 홈화면 nav */
    }
    return (
      <div
        className={`TopNav
        transition-all duration-300
        ${
          glass
            ? "bg-white/60 backdrop-blur-md border-b border-white/20 shadow-sm"
            : "bg-transparent"
        }
      `}
      >
        <div
          className="flex justify-start items-center px-5 py-1"
          style={{ height: topNavHeight }}
        >
          <div className="flex justify-start items-center gap-1">
            <div className="size-8">
              <img src={appIcon} alt="로고" className="w-full" />
            </div>
            <p className="text-start text-xl font-semibold">
              {title || "타로버블팁"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="TopNav bg-background">
      <div
        className="flex justify-start items-center gap-2 px-1 py-1 border-b"
        style={{ height: topNavHeight }}
      >
        <div
          className="flex justify-center items-center w-11 h-11"
          onClick={() => navigate(-1)}
        >
          <div className="flex justify-center items-center w-10 h-10 bg-transparent hover:bg-neutral-50 active:bg-neutral-100 rounded-sm cursor-pointer">
            <span className="material-symbols-rounded">arrow_back</span>
          </div>
        </div>
        <div className="grow text-center text-lg font-semibold">
          <p className="">{title || ""}</p>
        </div>
        <div className="flex justify-center items-center w-11 h-11"></div>
      </div>
    </div>
  );
}

export default TopNav;
