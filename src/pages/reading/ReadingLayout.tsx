import { useReadingStore } from "@/stores/useReadingStore";
import { useEffect, useMemo } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

type TabItem = {
  key: string;
  type?: string;
  label: string;
  emoji: string;
  to: string;
};

const TYPE_EMOJIS = ["💖", "💸", "💼", "🎓", "🍀", "🤝"];

export default function ReadingLayout() {
  const params = useParams();
  const navigate = useNavigate();

  const { categories, questions, fetchAllMasterData } = useReadingStore();

  useEffect(() => {
    if (categories.length === 0 || questions.length === 0) {
      void fetchAllMasterData();
    }
  }, [categories.length, questions.length, fetchAllMasterData]);

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
      ([type, label], idx) => ({
        key: type,
        type,
        label,
        emoji: TYPE_EMOJIS[idx] ?? "✨",
        to: `/reading/${type}`,
      })
    );

    return [...base, ...dynamic];
  }, [categories]);

  return (
    <div className="ReadingLayout">
      <div className="nav py-1.5 border-b">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides
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
                className={`inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-medium transition-all cursor-pointer hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-2 ${activeKey === item.key
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
