import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";

function NavItem({ title, icon, link }: { title?: string; icon?: string | ReactElement, link: string }) {
  return (
    <li className="w-1/5 max-w-20" >
      <NavLink to={link} className={({ isActive }) => `group ${isActive ? "active" : ""}`}>
        <div className="max-w-20 flex flex-col gap-0.5 justify-center items-center h-12 rounded-md bg-transparent hover:bg-neutral-50 transition-all">
          <div className="flex justify-center items-center gap-0 size-6 group-hover:text-violet-500 group-[.active]:text-violet-700">
            {icon}
          </div>
          <p className="text-xs text-nowrap text-neutral-500 font-semibold">{title || "메뉴명"}</p>
        </div>
      </NavLink>
    </li >
  );
}

export default NavItem;
