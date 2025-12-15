import { useLocation, useNavigate } from "react-router-dom";
import appIcon from "../../assets/app-icon.png";
import { topNavHeight } from "../../constants/appHeight";

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const from = params.get("from"); // "reading" | "archive" | null
  const isResultPage = location.pathname.startsWith("/reading/result/");

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
    const params = new URLSearchParams(location.search);
    const from = params.get("from");

    if (path.startsWith("/guide")) return "타로 정보";
    if (path.startsWith("/reading/result/")) return from === "archive" ? "보관함" : "운세 보기";
    if (path.startsWith("/reading")) return "운세 보기";
    if (path.startsWith("/archive")) return "보관함";
    return titleMap[path] ?? "";
  };


  const title = getTitle(location.pathname);

  const handleBack = () => {
    if (isResultPage) {
      if (from === "archive") return navigate("/archive");
      if (from === "reading") return navigate("/reading");
      // from이 없거나 애매하면 안전하게 fallback
      return navigate("/reading");
    }
    navigate(-1);
  };


  if (location.pathname === "/") {
    {
      /* 홈화면 nav */
    }
    return (
      <div className="TopNav">
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
          onClick={handleBack}
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
