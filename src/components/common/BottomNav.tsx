import {
  Archive,
  BookMarked,
  CircleUserRound,
  House,
  Sparkles,
} from "lucide-react";
import { bottomNavHeight } from "../../constants/appHeight";
import NavItem from "./NavItem";

function BottomNav() {
  return (
    <div className="BottomNav bg-white">
      <ul
        className="flex justify-center sm:justify-around items-center gap-2 border-t py-2 px-3"
        style={{ height: bottomNavHeight }}
      >
        <NavItem title={"메인"} icon={<House />} link={"/"} />
        <NavItem title={"타로정보"} icon={<BookMarked />} link={"/guide"} />
        <NavItem title={"운세보기"} icon={<Sparkles />} link={"/reading"} />
        <NavItem title={"보관함"} icon={<Archive />} link={"/archive"} />
        <NavItem
          title={"마이페이지"}
          icon={<CircleUserRound />}
          link={"/mypage"}
        />
      </ul>
    </div>
  );
}

export default BottomNav;
