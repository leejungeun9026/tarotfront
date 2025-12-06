import { NavLink } from "react-router-dom";

function NavItem({ title, icon, link }: { title?: string; icon?: string, link: string }) {
  return (
    <li className="w-1/5 max-w-20" >
      <NavLink to={link} className={({ isActive }) =>
        `w-full ${isActive ? "text-violet-700" : ""}`
      }>
        <div className="max-w-20 flex flex-col gap-0.5 justify-center items-center h-12 rounded-md bg-transparent hover:bg-neutral-50 hover:text-violet-600 active:bg-neutral-100 transition-all">
          <div className="flex justify-center items-center gap-0 w-6 h-6 ">
            <span className="material-symbols-rounded">{icon || "home"}</span>
          </div>
          <p className="text-xs text-nowrap">{title || "메뉴명"}</p>
        </div>
      </NavLink>
    </li>
  );
}

export default NavItem;
