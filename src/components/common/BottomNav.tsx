import { bottomNavHeight } from "../../constants/appHeight";
import NavItem from "./NavItem";

function BottomNav() {
  return (
    <div className="BottomNav bg-white">
      <ul
        className="flex justify-center sm:justify-around items-center gap-2 border-t py-2 px-3"
        style={{ height: bottomNavHeight }}
      >
        <NavItem title={"메인"} icon={"home"} link={"/"} />
        <NavItem title={"타로정보"} icon={"cards_star"} link={"/guide"} />
        <NavItem title={"운세보기"} icon={"star_shine"} link={"/reading"} />
        <NavItem title={"보관함"} icon={"history_edu"} link={"/archive"} />

        <NavItem
          title={"마이페이지"}
          icon={"account_circle"}
          link={"/mypage"}
        />
      </ul>
    </div>
  );
}

export default BottomNav;
