import SpeechBubble from "@/components/bubble/Bubble";
import CardItem from "@/components/tarotcard/CardItem";
import { TAROT_CARDS_CONST } from "@/constants/tarotCards";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent
} from "../components/ui/card";
import "../styles/home.css";

function Home() {
  const deck = TAROT_CARDS_CONST
  console.log("deck", deck)

  const navigate = useNavigate();
  return (
    <div className="Home divide-gray-100 divide-y-10">
      <section className="todayReading px-4 pt-2.5 pb-6 border-0">
        <SpeechBubble
          fullWidth
          side="top"
          pointerSize={10}
          tailPosition={34}
          bubbleClassName="rounded-xl bg-[#e0d0fe]"
          childClassName="rounded-xl card_bg_gradient"
        >
          <Card className="w-full border-0 overflow-hidden bg-transparent">
            <CardContent className="text-center">
              <h2 className="ff_kyobo text-xl font-medium tracking-tight text-balance text-center">
                오늘의 운세는 어떨까?
              </h2>
              <div className="card_container relative w-full h-58">
                <div className="card_bounce">
                  <div className="card_wrap ">
                    <CardItem card={{ type: "back", id: null }} />
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate("/reading")} className="cursor-pointer">
                오늘의 운세 보러가기
              </Button>
            </CardContent>
          </Card>
        </SpeechBubble>
      </section>
      <section className="askList px-4 py-6">
        <div className="section_title pb-4">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            운세 보기
          </h4>
        </div>
        <div className="section_content">
          <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 gap-3">
            {/* {askList.map((item, index) => {
              return (
                <Link to={item.type} key={index}>
                  <Card className="hover:bg-violet-50 hover:border-violet-200 hover:shadow-md transition-all">
                    <CardContent className="flex flex-col justify-center items-center gap-1">
                      <span>{item.icon}</span>
                      <span className="ff_kyobo">{item.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })} */}
          </div>
        </div>
      </section>
      <section className="askList px-4 py-6">
        <div className="section_title pb-4">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            타로 정보
          </h4>
        </div>
        <div className="section_content"></div>
      </section>
    </div >
  );
}

export default Home;
