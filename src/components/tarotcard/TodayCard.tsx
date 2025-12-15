import ReadingSpreadCount from "@/types/enums/readingSpread-count.enum copy";
import ReadingSpreadKr from "@/types/enums/readingSpread-kr.enum";
import { getCardBack } from "@/utils/imageMapper";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import starsLottie from "../../assets/lottie/stars.json";
import { Button } from "../ui/button";

type Props = {
  cardContainerHeight: string | null;
  cardMaxWidth: string | null;
};

export default function TodayCard({
  cardContainerHeight,
  cardMaxWidth,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="TodayCard h-full">
      <div className="relative z-5 h-full flex flex-col items-center justify-center gap-2">
        <h2 className="ff_kyobo text-xl font-medium tracking-tight text-balance text-center">
          나의 오늘 운세는 어떨까?
        </h2>
        <div
          className={`relative card_container w-full ${cardContainerHeight}`}
        >
          <div className="card_bounce">
            <div
              className={`w-auto rounded-md shadow-md border overflow-hidden ${cardMaxWidth}`}
            >
              <img src={getCardBack(null)} alt="" />
            </div>
          </div>
        </div>
        <Button
          onClick={() =>
            navigate("/reading/pick", {
              state: {
                categoryId: null,
                category: "today",
                spreadPosition: ["오늘의 카드"],
                questionText: null,
                spreadType: ReadingSpreadKr["ONE"],
                spreadCount: ReadingSpreadCount["ONE"],
              },
            })
          }
          className="cursor-pointer"
        >
          오늘의 운세 보러가기
        </Button>
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-3 w-full sm:w-1/2 object-cover opacity-50">
        <Lottie
          width={"100%"}
          height={"100%"}
          animationData={starsLottie}
          loop={true}
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-2 w-0 sm:w-1/2 rotate-y-180 object-cover opacity-50">
        <Lottie
          width={"100%"}
          height={"100%"}
          animationData={starsLottie}
          loop={true}
        />
      </div>
    </div>
  );
}
