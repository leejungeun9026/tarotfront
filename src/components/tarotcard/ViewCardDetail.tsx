import type { TarotCardResponseDTO } from "@/apis/response/tarotcard";
import { bottomNavHeight, topNavHeight } from "@/constants/appHeight";
import { getCardImg } from "@/utils/imageMapper";

type viewCard = {
  display: boolean;
  card: TarotCardResponseDTO;
};

export default function ViewCardDetail({ display, card }: viewCard) {
  return (
    <div
      className={`fixed z-999 left-1/2 -translate-x-1/2 w-full max-w-3xl overflow-y-auto bg-black/60 backdrop-blur-xs ${
        display ? "block" : "hidden"
      }`}
      style={{
        height: `calc(100dvh - ${topNavHeight}px - ${bottomNavHeight}px - 45px)`,
        top: `calc(${topNavHeight}px + 45px)`,
      }}
    >
      <div className="flex flex-col">
        <p>{card.arcanaType}</p>
        <div className="w-fit mx-auto rounded-md shadow-sm border overflow-hidden">
          <img
            src={getCardImg(card.id) ?? ""}
            alt={card.nameKr}
            className="w-24 h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
