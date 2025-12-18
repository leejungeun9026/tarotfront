import ChatBubble from "@/components/common/ChatBubble";
import PageTitle from "@/components/common/PageTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GuideHowTo() {
  return (
    <div className="GuideHowTo divide-gray-100 divide-y-10">
      <section className="px-4 py-6 sm:py-8">
        <PageTitle
          wrapClassName="mb-5"
          title={
            <>
              <span className="tossface me-1">🔮</span>
              타로점이란?
            </>
          }
        />
        <div className="space-y-4 leading-relaxed">
          <p>
            타로카드 점은 <b>각 카드에 담긴 상징과 의미</b>를 통해 질문자의 <b>상황과 마음을 살펴보는 카드 리딩</b>이에요. <br />
            타로는 총 78장의 카드로 이루어져 있고, 각각의 카드는 서로 다른 인물과 장면, 감정을 담고 있어요.
          </p>
          <p>
            <b><span className="tossface">🌞</span> 메이저 아르카나는</b><br />
            0번 바보(The Fool) 카드부터 21번 세계(The World) 카드까지, 인생의 흐름과 중요한 전환점을 상징하는 카드들이에요.
          </p>
          <p>
            <b><span className="tossface">🌜</span> 마이너 아르카나는</b> <br />
            흙(동전 Pentacles)&middot;물(컵 Cups)&middot;불(지팡이 Wands)&middot;공기(검 Swords), 네 가지 원소를 바탕으로 에이스부터 10까지의 숫자 카드와 왕(King)&middot;여왕(Queen)&middot;기사(Knight)&middot;시종(Page)으로 이루어진 코트 카드로 구성되어있어 일상 속 감정, 관계, 현실적인 상황을 더 섬세하게 보여줘요.
          </p>
          <p>
            이 78장의 카드를 통해 질문자의 <b className="text-violet-700">현재 상황과 심리,
              그리고 그 안에 담긴 흐름</b>을 읽어보는 것이
            타로카드 점이에요.
          </p>
        </div>
        <div className="py-6 text-violet-500 text-xs text-center">&#x2736; &#x2736; &#x2736;</div>
        <div className="space-y-4">
          <div className="flex justify-start">
            <ChatBubble
              colorClass="text-violet-100"
              tail="left-top"
              className="w-full sm:max-w-11/12 me-auto"
              contentClassName=""
            >
              <Card className="rounded-3xl border-0 bg-violet-100 gap-3">
                <CardHeader className="block">
                  <h2 className="text-lg ff_kyobo">
                    왜 카드가 내 이야기를 알려줄까요?
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 leading-relaxed text-sm text-neutral-600">
                    <p>
                      타로 카드는 무작위로 뽑지만, 그 카드가 지금 내 이야기처럼 느껴지는 이유는 왜일까요?
                    </p>
                    <p>
                      타로 리딩의 핵심은 <b>'정해진 운명'</b>이 아니라 <b>시의적절한 우연</b>이에요. 카드를 뽑는 순간의 마음 상태와 무의식이 카드의 이미지와 자연스럽게 겹쳐진다고 보는 거죠.
                    </p>
                    <p>
                      타로 카드를 바라보고 의미를 떠올리는 과정은 우리가 외부 이미지에 내 마음을 투영하는 경험과 닮아 있어요. 같은 그림을 보고도 사람마다 전혀 다른 이야기를 떠올리는 것처럼요.
                    </p>
                    <p>
                      그래서 타로에서 중요한 건 "이 해석이 맞다, 틀리다"가 아니라 <b>"왜 나는 이렇게 느꼈을까?"</b>를 돌아보는 거예요. <br />
                      그 해석 안에는 지금 내 감정과 고민이 담겨있을 거예요.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ChatBubble>
          </div>
          <div className="flex justify-end">
            <ChatBubble
              colorClass="text-violet-100"
              tail="right-top"
              className="w-full sm:max-w-11/12"
              contentClassName=""
            >
              <Card className="rounded-3xl border-0 bg-violet-100 gap-3">
                <CardHeader className="block">
                  <h2 className="text-lg ff_kyobo">
                    결국 중요한 건 마음가짐
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 leading-relaxed text-sm text-neutral-600">
                    <p>
                      "어차피 랜덤인데 의미가 있을까?" <br />그렇게 느껴질 수도 있어요.
                    </p>
                    <p>
                      하지만 타로는 미래를 증명하려는 도구가 아니라, <b>내 마음을 들여다보기 위한 창</b>에 가까워요. <br />조금 열린 마음으로 카드를 바라볼 때, 우연 속에서도 나에게 필요한 메시지를 자연스럽게 발견할 수 있어요.
                    </p>
                    <p>
                      타로버블팁은 그런 순간을 <b>조금 더 가볍고 편안하게 마주할 수 있도록 도와주는 공간</b>이에요 <span className="tossface">🌙</span>
                    </p>
                  </div>

                </CardContent>
              </Card>
            </ChatBubble>
          </div>
        </div>
      </section>
      <section className="px-4 py-6 sm:py-8">
        <h2 className="text-lg font-semibold mb-4">
          더 알아보기
        </h2>
        <Tabs defaultValue="origin">
          <TabsList className="mb-2">
            <TabsTrigger value="origin" className="cursor-pointer">타로의 기원</TabsTrigger>
            <TabsTrigger value="history" className="cursor-pointer">타로의 역사</TabsTrigger>
            <TabsTrigger value="card" className="cursor-pointer">타로카드 종류</TabsTrigger>
          </TabsList>
          <TabsContent value="origin">
            <div className="border rounded-xl p-4">
              <h5 className="text-base font-semibold mb-3">
                타로의 기원
              </h5>
              <div className="content text-sm leading-relaxed">
                <p>
                  타로의 시작에 대해서는 여러 설이 전해지고 있어요. <br />
                  아직 어느 하나가 정설로 받아들여지지는 않았지만, 대표적으로 많이 알려진 세 가지 이야기가 있어요.
                </p>
                <ul className="mt-3 space-y-3">
                  <li>
                    <h6 className="font-medium">
                      <span className="tossface">
                        1️⃣
                      </span>
                      {" "}이집트 기원설
                    </h6>
                    고대 이집트나 인도에서 사용되던 점술용 카드가 형태를 바꾸어
                    오늘날의 타로가 되었다는 이야기예요.
                    이 카드들은 12세기 십자군 전쟁을 거치며 유럽으로 전해졌고,
                    놀이와 점술의 도구로 함께 사용되었다고 전해져요.
                    다만 이를 뒷받침하는 명확한 기록은 남아 있지 않아요.

                  </li>
                  <li>
                    <h6 className="font-medium">
                      <span className="tossface">
                        2️⃣
                      </span>
                      {" "}인도 기원설
                    </h6>

                  </li>
                </ul>



                인도의 힌두교 신들의 상징이나,
                ‘차투랑가’라는 고대 보드게임에서 유래되었다는 설도 있어요.
                이 게임은 계급 구조와 네 가지 원소를 담고 있어
                체스, 트럼프 카드, 그리고 타로의 구조와 닮아 있다고 이야기돼요.

                3️⃣ 유대 기원설

                메이저 아르카나 22장이
                히브리어 알파벳 22자와 하나씩 연결된다는 점에서 나온 이야기예요.
                고대에는 타로가 언어와 상징을 가르치기 위한 도구로 사용되었고,
                유대교 신비주의인 **카발라(Kabbalah)**와 깊이 연결되어
                ‘생명의 나무’ 구조와 함께 해석되기도 해요.
              </div>
            </div>
          </TabsContent>
          <TabsContent value="origin">
            타로의 기원
          </TabsContent>
        </Tabs>
        <div className="space-y-2 leading-relaxed">
          <p>
            타로의 시작에 대해서는 하나로 정해진 설은 없어요.
            <br /> 고대 이집트, 인도, 유대 신비주의 등 여러 문화와 상징이 영향을 주었을 것이라 이야기돼요.
          </p>
          <p>
            중요한 건, 타로가 오래전부터 상징과 이야기로 마음을 읽는 도구로 사용되어 왔다는 점이죠 <span className="tossface">🪐</span>
          </p>
        </div>
      </section>
    </div>
  );
}
