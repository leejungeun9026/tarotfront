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

  console.log(card?.id)

  return (
    <div className="fixed inset-0 z-999">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="닫기"
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 w-full max-w-3xl overflow-y-auto bg-foreground/60 backdrop-blur-sm border-x"
        style={{
          height: `calc(100dvh - ${topNavHeight}px - ${bottomNavHeight}px)`,
          top: `${topNavHeight}px`,
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 border-b bg-foreground/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onPrev}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>


        <div className="px-4 py-4">
          <Card3d cardId={card?.id ?? 1} />
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {card?.arcanaType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
