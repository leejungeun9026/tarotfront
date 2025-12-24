import type { TarotCardResponseDTO } from "@/apis/response/tarotcard";
import { bottomNavHeight, topNavHeight } from "@/constants/appHeight";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Card3d from "./Card3d";
import numberToRoman from "@/utils/numberToRoman";

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
      <div className="relative w-full max-w-3xl h-full overflow-y-auto bg-foreground/80 backdrop-blur-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer text-accent hover:bg-accent/10 hover:text-accent dark:hover:bg-accent/50 size-8"
        >
          <X className="size-4" />
        </button>

        <button onClick={onPrev} className="absolute left-2 top-1/4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer text-accent hover:bg-accent/10 hover:text-accent dark:hover:bg-accent/50 size-8">
          <ChevronLeft className="size-5 pe-0.5" />
        </button>
        <button onClick={onNext} className="absolute right-2 top-1/4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer text-accent hover:bg-accent/10 hover:text-accent dark:hover:bg-accent/50 size-8">
          <ChevronRight className="size-5 ps-0.5" />
        </button>

        <div className="flex flex-col items-stretch">
          <Card3d cardId={card?.id ?? 1} />
          <div className="px-10 py-8">
            <div className="w-full max-w-100 mx-auto">
              <Card className="border-t-white/10 border-l-white/20 border-r-white/30 border-b-white/40 bg-background/50">
                <CardHeader className="text-center gap-0">
                  <CardTitle className="space-y-4">
                    <Badge variant="outline" className="bg-background">
                      {card?.arcanaType}
                    </Badge>
                    <div>
                      <p className="mb-1 ff_roman font-normal">
                        {numberToRoman(card?.cardNumber ?? 0)}
                      </p>
                      <p className="text-lg">
                        {card?.nameEn}{" "}{card?.nameKr}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  <ul className="space-y-4">
                    <li>
                      <h6 className="font-semibold">정방향 키워드</h6>
                      {card?.keyword}
                    </li>
                    <li>
                      <h6 className="font-semibold">역방향 키워드</h6>
                      {card?.reverseKeyword}
                    </li>
                    <li>
                      <h6 className="font-semibold">그림 설명</h6>
                      {card?.description}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
