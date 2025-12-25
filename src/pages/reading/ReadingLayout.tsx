import { useReadingStore } from "@/stores/useReadingStore";
import { useEffect, useMemo, useRef } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { CATEGORY_EMOJI } from "@/constants/catagoryEmoji";

type TabItem = {
  key: string;
  type?: string;
  label: string;
  emoji: string;
  to: string;
};

export default function ReadingLayout() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);

  const { categories, questions, fetchAllMasterData } = useReadingStore();

  useEffect(() => {
    if (categories.length === 0 || questions.length === 0) {
      void fetchAllMasterData();
    }
  }, [categories.length, questions.length, fetchAllMasterData]);

  // 현재 활성화된 탭 key (기본값: today)
  const activeKey = params.type ? params.type.toLowerCase() : "today";

  const typeTabs: TabItem[] = useMemo(() => {
    const base: TabItem[] = [
      { key: "today", label: "오늘의 운세", emoji: "🔮", to: "/reading/today" },
    ];

    const map = new Map<string, string>();
    categories.forEach((c) => {
      const en = String(c.typeEn).toLowerCase();
      if (!map.has(en)) map.set(en, String(c.typeKr));
    });

    const dynamic: TabItem[] = Array.from(map.entries()).map(
      ([type, label]) => ({
        key: type,
        type,
        label,
        emoji: CATEGORY_EMOJI(type.toUpperCase()) ?? "",
        to: `/reading/${type}`,
      })
    );

    return [...base, ...dynamic];
  }, [categories]);

  // 현재 라우트에 해당하는 탭이 Swiper의 첫 번째 위치로 오도록 이동
  useEffect(() => {
    if (!swiperRef.current) return;

    // 현재 active 탭의 index를 찾아 Swiper 위치를 동기화
    const activeIndex = typeTabs.findIndex((tab) => tab.key === activeKey);

    if (activeIndex >= 0) {
      // active 탭이 Swiper에서 잘 보이도록 위치 이동
      swiperRef.current.slideTo(activeIndex, 300);
    }
  }, [activeKey, typeTabs, location.pathname]);

  return (
    <div className="ReadingLayout">
      <div className="nav py-1.5 border-b">
        <Swiper
          slidesPerView={"auto"}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          centeredSlidesBounds
          watchOverflow
          className="navSwiper md:[&_.swiper-wrapper]:justify-center"
        >
          {typeTabs.map((item) => (
            <SwiperSlide
              key={item.key}
              className="max-w-fit first:ms-2 me-1 last:me-2"
            >
              <div
                className={`inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-medium transition-all cursor-pointer hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-2 ${
                  activeKey === item.key
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => navigate(item.to)}
              >
                <span className="tossface">{item.emoji}</span>
                {item.label}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Outlet />
    </div>
  );
}
