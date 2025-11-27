import NavItem from "../ui/BottomNav/NavItem";

function BottomNav() {
  return (
    <div className="BottomNav">
      <ul className="flex justify-center align-center gap-2 border-t py-2 ">
        <NavItem title={"메인"} icon={"home"} link={"/"} />
        <NavItem title={"타로정보"} icon={"cards_star"} link={"/"} />
        <NavItem title={"운세보기"} icon={"star_shine"} link={"/"} />
        <NavItem title={"커뮤니티"} icon={"sms"} link={"/"} />
        <NavItem title={"마이페이지"} icon={"heart_smile"} link={"/"} />
      </ul>
    </div>
  );
}

export default BottomNav;
