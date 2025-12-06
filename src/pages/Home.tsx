import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { TAROT_CARDS } from "../constants/tarotCards";
import { todayDate } from "../constants/today";

function Home() {
  const deck = TAROT_CARDS
  console.log("deck", deck)

  const navigate = useNavigate();
  return (
    <div className="Home divide-gray-100 divide-y-10">
      <section className="todayReading px-4 py-6">
        <Card className="relative border-0 bg-violet-50 overflow-hidden">
          <div className="absolute bottom-3 right-3">
          </div>
          <CardHeader className="ff_kyobo">
            <CardTitle>
              <h5 className="mb-2">{todayDate}</h5>
              <h2 className="text-xl font-extrabold tracking-tight text-balance">
                오늘의 운세는 어떨까?
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/reading")}>
              오늘의 운세 보러가기
            </Button>
          </CardContent>
        </Card>
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
    </div>
  );
}

export default Home;
