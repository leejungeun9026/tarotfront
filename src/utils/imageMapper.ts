import back01 from "../assets/back01.jpg";
import back02 from "../assets/back02.jpg";
type ImageMapNumber = Record<number, string>;

// 타로카드
const tarotModules = import.meta.glob("../assets/tarotcard/RWS_Tarot_*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// id(1~78) -> 이미지 URL 매핑 객체
const TAROT_IMAGES: ImageMapNumber = {};

for (const path in tarotModules) {
  const match = path.match(/RWS_Tarot_(\d+)\.jpg$/);
  if (match) {
    const id = Number(match[1]); // "1" → 1
    // Vite에서 이미지 default export에 실제 URL이 들어 있음
    TAROT_IMAGES[id] = tarotModules[path]
  }
}

export const getCardImg = (id: number | string): string | null => {
  const numId = Number(id);
  return TAROT_IMAGES[numId] || null;
};

export const TAROT_IMAGE_MAP = TAROT_IMAGES;

export const getCardBack = (backType: string | null) => {
  switch (backType) {
    case "back01":
      return back01;
    default:
      return back02;
  }
};

// 카테고리
import human from "../assets/icon/category_human.svg";
import job from "../assets/icon/category_job.svg";
import life from "../assets/icon/category_life.svg";
import love from "../assets/icon/category_love.svg";
import money from "../assets/icon/category_money.svg";
import study from "../assets/icon/category_study.svg";

export const getCategoryImg = (type: string | undefined) => {
  const textTransform = type?.toLowerCase();
  switch (textTransform) {
    case "love":
      return love;
    case "money":
      return money;
    case "job":
      return job;
    case "study":
      return study;
    case "life":
      return life;
    case "human":
      return human;
    default:
      return undefined;
  }
};
