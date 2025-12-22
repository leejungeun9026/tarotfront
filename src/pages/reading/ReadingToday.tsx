import TodayCard from "@/components/tarotcard/TodayCard";
import { bottomNavHeight, topNavHeight } from "@/constants/appHeight";

function ReadingToday() {
  return (
    <div
      className="ReadingToday"
      style={{
        height: `calc(100dvh - ${topNavHeight}px - ${bottomNavHeight}px - 45px)`,
        minHeight: "380px",
      }}
    >
      <div className="bg_gradient h-full py-8 ">
        <TodayCard
          cardContainerHeight={"h-68 md:h-96"}
          cardMaxWidth={"max-w-30 md:max-w-36"}
        />
      </div>
    </div>
  );
}

export default ReadingToday;
