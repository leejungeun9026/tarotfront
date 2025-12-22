import { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const tabs = [
  { to: "info", label: "타로버블팁", emoji: "💜" },
  { to: "howto", label: "타로점", emoji: "🔮" },
  { to: "question", label: "질문 방법", emoji: "🎯" },
  { to: "tarotcard", label: "타로카드", emoji: "🪄" },
  { to: "term", label: "용어 소개", emoji: "📖" },
] as const;

export default function GuideLayout() {
  const swiperRef = useRef<SwiperType | null>(null);
  const location = useLocation();

  // 현재 라우트에 해당하는 탭이 Swiper의 첫 번째 위치로 오도록 이동
  useEffect(() => {
    if (!swiperRef.current) return;

    const activeIndex = tabs.findIndex(
      (tab) => location.pathname.endsWith(tab.to)
    );

    if (activeIndex >= 0) {
      swiperRef.current.slideTo(activeIndex, 300);
    }
  }, [location.pathname, tabs]);

  return (
    <div className="ReadingLayout">
      <div className="nav py-1.5 border-b">
        <Swiper
          slidesPerView="auto"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          centeredSlidesBounds
          watchOverflow
          className="navSwiper md:[&_.swiper-wrapper]:justify-center"
        >
          {tabs.map((tab) => (
            <SwiperSlide
              key={tab.to}
              className="max-w-fit first:ms-2 me-1 last:me-2"
            >
              <NavLink
                to={tab.to}
                end={tab.to === "info"} // info일 때만 /guide/info에서 정확히 active
                className={({ isActive }) =>
                  [
                    "inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-medium transition-all cursor-pointer h-8 rounded-md px-2 hover:bg-accent hover:text-accent-foreground",
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
