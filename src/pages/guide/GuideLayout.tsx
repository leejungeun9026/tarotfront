import { NavLink, Outlet } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const tabs = [
  { to: "info", label: "타로버블팁", emoji: "💜" },
  { to: "howto", label: "타로점", emoji: "🔮" },
  { to: "term", label: "용어 소개", emoji: "📖" },
  { to: "tarotcard", label: "타로카드", emoji: "🪄" },
] as const;

export default function GuideLayout() {
  return (
    <div className="ReadingLayout">
      <div className="nav py-2 border-b">
        <Swiper
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          watchOverflow
          className="navSwiper md:[&_.swiper-wrapper]:justify-center"
        >
          {tabs.map((tab) => (
            <SwiperSlide
              key={tab.to}
              className="max-w-fit first:ms-2 last:me-2"
            >
              <NavLink
                to={tab.to}
                end={tab.to === "info"} // info일 때만 /guide/info에서 정확히 active
                className={({ isActive }) =>
                  [
                    "inline-flex items-center justify-center gap-1 whitespace-nowrap",
                    "text-sm font-medium transition-all cursor-pointer",
                    "h-10 rounded-md px-3",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "",
                  ].join(" ")
                }
              >
                <span className="tossface">{tab.emoji}</span>
                {tab.label}
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Outlet />
    </div>
  );
}
