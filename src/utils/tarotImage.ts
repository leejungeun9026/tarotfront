type TarotImageMap = Record<number, string>;

const modules = import.meta.glob("../assets/tarotcard/RWS_Tarot_*.jpg", {
  eager: true,
}) as Record<string, { default: string }>;

// id(1~78) -> 이미지 URL 매핑 객체
const TAROT_IMAGES: TarotImageMap = {};

for (const path in modules) {
  const match = path.match(/RWS_Tarot_(\d+)\.jpg$/);
  if (match) {
    const id = Number(match[1]); // "1" → 1
    // Vite에서 이미지 default export에 실제 URL이 들어 있음
    TAROT_IMAGES[id] = modules[path].default;
  }
}

export const getCardImg = (id: number | string): string | null => {
  const numId = Number(id);
  return TAROT_IMAGES[numId] || null;
};

export const TAROT_IMAGE_MAP = TAROT_IMAGES;
