import { useLocation, useNavigate } from "react-router-dom";
import { topNavHeight } from "../../constants/appHeight";

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const titleMap: Record<string, string> = {
    "/": "타로버블팁",
    "/guide": "타로 정보",
    "/reading": "운세 보기",
    // "/reading/love": "애정",
    // "/reading/money": "금전",
    // "/reading/job": "직업·커리어",
    // "/reading/study": "학업·진로운",
    // "/reading/life": "일상·건강",
    // "/reading/human": "대인관계",
    "/archive": "보관함",
    "/login": "로그인",
    "/join": "회원가입",
    "/mypage": "마이페이지",
  };

  const getTitle = (path: string) => {
    if (path.startsWith("/reading")) return "상황별 운세 보기";
    return titleMap[path] ?? "";
  };

  const title = getTitle(location.pathname);

  if (location.pathname === "/") {
    {
      /* 홈화면 nav */
    }
    return (
      <div className="TopNav bg-background">
        <div
          className="flex justify-start items-center px-5 py-1"
          style={{ height: topNavHeight }}
        >
          <div>
            <p className="text-start text-lg font-semibold">
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
