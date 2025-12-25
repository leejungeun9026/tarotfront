import {
  Archive,
  BookMarked,
  CircleUserRound,
  House,
  Sparkles,
} from "lucide-react";
import { bottomNavHeight } from "../../constants/appHeight";
import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from"); // "reading" | "archive" | null

  const isResultPage = location.pathname.startsWith("/reading/result/");

  const isReadingActive =
    (!isResultPage && location.pathname.startsWith("/reading")) ||
    (isResultPage && from === "reading");

  const isArchiveActive =
    location.pathname.startsWith("/archive") ||
    (isResultPage && from === "archive");

  return (
    <div className="BottomNav bg-white">
      <ul
        className="flex justify-center sm:justify-around items-center gap-2 border-t py-2 px-3"
        style={{ height: bottomNavHeight }}
      >
        <NavItem title="홈" icon={<House />} link="/" />
        <NavItem title="타로정보" icon={<BookMarked />} link="/guide" />
        <NavItem
          title="운세보기"
          icon={<Sparkles />}
          link="/reading"
          forceActive={isReadingActive}
        />
        <NavItem
          title="보관함"
          icon={<Archive />}
          link="/archive"
          forceActive={isArchiveActive}
        />
        <NavItem title="마이페이지" icon={<CircleUserRound />} link="/mypage" />
      </ul>
    </div>
  );
}

export default BottomNav;
