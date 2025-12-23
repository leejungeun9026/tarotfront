import { bottomNavHeight, topNavHeight } from "@/constants/appHeight";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "../ui/button";
import Card3d from "./Card3d";
import type { TarotCardResponseDTO } from "@/apis/response/tarotcard";

type Props = {
  open: boolean;
  card: TarotCardResponseDTO | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function ViewCardDetail({
  open,
  card,
  onClose,
  onPrev,
  onNext,
}: Props) {
  if (!open) return null;

  console.log(card?.id);

  return (
    <div
      className="fixed w-full max-w-3xl left-1/2 -translate-x-1/2 z-999"
      style={{
        height: `calc(100dvh - ${topNavHeight}px - ${bottomNavHeight}px)`,
        top: `${topNavHeight}px`,
      }}
    >
      <div className="relative w-full max-w-3xl h-full overflow-y-auto bg-foreground/80 backdrop-blur-md ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-accent/20 hover:bg-accent/40 hover:text-accent-foreground dark:hover:bg-accent/50 size-9"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPrev}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="px-4 py-4">
          <Card3d cardId={card?.id ?? 1} />
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">{card?.arcanaType}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
