import ChatBubble from "@/components/common/ChatBubble";
import PageTitle from "@/components/common/PageTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export default function GuideHowTo() {
  const navigate = useNavigate();

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
        <ul className="space-y-4 leading-relaxed text-sm">
          <li>
            <p>
              타로카드 점은 <b>각 카드에 담긴 상징과 의미</b>를 통해 질문자의 <b>상황과 마음을 살펴보는 카드 리딩</b>이에요. <br />
              타로는 총 78장의 카드로 이루어져 있고, 각각의 카드는 서로 다른 인물과 장면, 감정을 담고 있어요.
            </p>
          </li>
          <li>
            <h6 className="mb-1 text-base font-semibold"><span className="tossface">🌞</span> 메이저 아르카나는</h6>
            <p>
              0번 바보(The Fool) 카드부터 21번 세계(The World) 카드까지, 인생의 흐름과 중요한 전환점을 상징하는 카드들이에요.
            </p>
          </li>
          <li>
            <h6 className="mb-1 text-base font-semibold"><span className="tossface">🌜</span> 마이너 아르카나는</h6>
            <p>
              흙(동전 Pentacles)&middot;물(컵 Cups)&middot;불(지팡이 Wands)&middot;공기(검 Swords), 네 가지 원소를 바탕으로 에이스부터 10까지의 숫자 카드와 왕(King)&middot;여왕(Queen)&middot;기사(Knight)&middot;시종(Page)으로 이루어진 코트 카드로 구성되어있어 일상 속 감정, 관계, 현실적인 상황을 더 섬세하게 보여줘요.
            </p>
          </li>
          <li>
            <p>
              이 78장의 카드를 통해 질문자의 <b className="text-violet-700">현재 상황과 심리,
                그리고 그 안에 담긴 흐름</b>을 읽어보는 것이
              타로카드 점이에요.
            </p>
          </li>
        </ul>
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">
            타로점 스프레드(배열) 종류
          </h2>
          <p className="text-neutral-600 text-sm">카드를 어떤 순서와 위치로 펼쳐 해석할지 정하는 방식이에요.</p>
        </div>
        <div>
          <ul className="space-y-6 leading-relaxed text-sm">
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">1️⃣</span> 원카드 스프레드</h6>
              <p>
                가장 단순한 스프레드예요. <br />
                카드 한 장으로 지금 이 순간의 핵심 메시지를 살펴보기 때문에 주로 오늘의 운세처럼 가볍고 직관적인 질문에 많이 사용해요.
              </p>
              <p className="ps-2 text-violet-600"><span className="tossface">🪄</span> 타로버블팁의 <span onClick={() => { navigate("/reading/today") }} className="underline underline-offset-2 font-semibold cursor-pointer">오늘의 운세보기</span>는 원카드로 해석하고 있어요!</p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">3️⃣</span> 쓰리카드 스프레드</h6>
              <p>
                타로에서 가장 많이 사용되는 스프레드예요. <br />카드 3장을 통해 상황의 흐름을 자연스럽게 읽을 수 있어요.
              </p>
              <p>
                보통은
                <ul className="list-disc ps-6">
                  <li>과거 - 현재 - 미래</li>
                  <li>나 - 상대방 - 관계</li>
                  <li>상황 - 행동 - 결과</li>
                  <li>선택A - 선택B - 조언</li>
                  <li>메세지 - 장애물 - 팁</li>
                </ul>
                처럼 질문에 맞게 위치의 의미를 정해서 해석해요.
              </p>
              <p className="ps-2 text-violet-600"><span className="tossface">🪄</span> 타로버블팁의 <span onClick={() => { navigate("/reading/love") }} className="underline underline-offset-2 font-semibold cursor-pointer">상황별 운세보기</span>는 쓰리카드로 해석하고 있어요!</p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">🔟</span> 켈틱 크로스 스프레드</h6>
              <p>
                조금 더 깊은 질문에 사용하는 전통적인 스프레드예요. <br />
                10장의 카드를 통해 상황, 장애물, 내면의 마음, 주변 환경, 가능성 등을 입체적이고 심층적으로 살펴봐요.</p>
              <p>
                복합적인 고민이나 "왜 이런 상황이 반복될까?"" 같은 질문에 잘 어울려요.
              </p>
              <p className="ps-2 text-violet-600"><span className="tossface">🪄</span> 타로버블팁의 <span onClick={() => { navigate("/") }} className="underline underline-offset-2 font-semibold cursor-pointer">심층 운세보기</span>는 켈틱 크로스로 해석하고 있어요!</p>
            </li>
          </ul>
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
              <h5 className="text-base font-semibold mb-2">
                타로의 기원
              </h5>
              <div className="content text-sm leading-relaxed">
                <p>
                  타로의 시작에 대해서는 여러 설이 전해지고 있어요. <br />
                  아직 어느 하나가 정설로 받아들여지지는 않았지만, 대표적으로 많이 알려진 세 가지 이야기가 있어요.
                </p>
                <ul className="mt-3 space-y-3">
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        1️⃣
                      </span>
                      {" "}이집트 기원설
                    </h6>
                    <p>
                      고대 이집트나 인도에서 사용되던 점술용 카드가 형태를 바꾸어 오늘날의 타로가 되었다는 이야기예요. <br />
                      이 카드들은 12세기 십자군 전쟁을 거치며 유럽으로 전해졌고, 놀이와 점술의 도구로 함께 사용되었다고 전해져요. <br />
                      다만 이를 뒷받침하는 명확한 기록은 남아 있지 않아요.
                    </p>
                  </li>
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        2️⃣
                      </span>
                      {" "}인도 기원설
                    </h6>
                    <p>
                      인도의 힌두교 신들의 상징이나, '차투랑가'라는 고대 보드게임에서 유래되었다는 설도 있어요. <br /> 이 게임은 계급 구조와 네 가지 원소를 담고 있어 체스, 트럼프 카드, 그리고 타로의 구조와 닮아 있다고 이야기돼요.
                    </p>
                  </li>
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        3️⃣
                      </span>
                      {" "}유대 기원설
                    </h6>
                    <p>
                      메이저 아르카나 22장이 히브리어 알파벳 22자와 하나씩 연결된다는 점에서 나온 이야기예요. <br /> 고대에는 타로가 언어와 상징을 가르치기 위한 도구로 사용되었고, 유대교 신비주의인 카발라(Kabbalah)와 깊이 연결되어 '생명의 나무' 구조와 함께 해석되기도 해요.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="border rounded-xl p-4">
              <h5 className="text-base font-semibold mb-2">
                타로의 역사
              </h5>
              <div className="content text-sm leading-relaxed">
                <p>
                  현재까지 전해지는 기록을 보면, 타로카드는 14세기 말~15세기 초 이탈리아에서 처음 본격적으로 모습을 드러냈다고 알려져 있어요.
                </p>
                <ul className="mt-3 space-y-3">
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        1️⃣
                      </span>
                      {" "}비스콘티-스포르차 타로
                    </h6>
                    <p>
                      가장 오래된 타로 중 하나로 꼽히는 것은 밀라노의 귀족 가문을 위해 제작된 <b>비스콘티-스포르차 타로</b>예요. <br />
                      이 카드들은 오늘날 우리가 알고 있는 타로처럼 이미 메이저 아르카나와 마이너 아르카나 구조를 갖추고 있었고, 당시에는 점술보다는 귀족들이 즐기던 카드 게임용으로 사용되었어요.
                    </p>
                  </li>
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        2️⃣
                      </span>
                      {" "}마르세유 타로
                    </h6>
                    <p>
                      이와 함께 중요한 위치를 차지하는 덱이 <b>마르세유 타로</b>예요. <br />
                      마르세유 타로는 17~18세기 프랑스 지역을 중심으로 널리 퍼졌고, 카드의 상징과 구성이 비교적 단순하면서도 전통적인 형태를 잘 유지하고 있어 오늘날까지도 "타로의 원형"에 가까운 덱으로 여겨져요. <br />
                      이 두 덱, 비스콘티–스포르차 타로와 마르세유 타로를 보통 <b className="text-violet-700">클래식 타로</b>라고 불러요.
                    </p>
                  </li>
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        3️⃣
                      </span>
                      {" "}라이더-웨이트 타로
                    </h6>
                    <p>
                      시간이 흐르며 타로는 단순한 카드 놀이에서 벗어나 상징과 해석을 통해 마음을 들여다보는 도구로 발전했어요. <br />
                      18세기 이후 유럽의 신비주의와 점성학 사상 속에서 타로카드는 인생의 흐름과 내면의 이야기를 담은 상징 체계로 해석되기 시작했어요. <br />
                      이 흐름을 정리해 완성한 덱이 1909년에 등장한 <b>라이더-웨이트 타로</b>예요. <br />
                      메이저뿐 아니라 마이너 카드에도 장면과 이야기가 담겨 있어 누구나 직관적으로 해석할 수 있다는 특징이 있어요. <br />
                      이후 이를 바탕으로 보정된 <b>유니버셜 웨이트 타로</b>도 함께 사용되며, 오늘날 가장 널리 쓰이는 <b className="text-violet-700">모던 타로</b>의 기준이 되었어요.
                    </p>
                  </li>
                </ul>
                <div className="mt-4 rounded-xl bg-violet-50 border border-violet-200 p-4 text-neutral-600">
                  <div className="flex items-start gap-1">
                    <span className="tossface">🪐</span>
                    <p>
                      <b>타로버블팁</b>은 이 중에서도 <b>라이더-웨이트 타로</b>를 기본 덱으로 사용해요. <br />상징이 명확해, 처음 타로를 접하는 분들도 부담 없이 자신의 이야기를 살펴볼 수 있답니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="card">
            <div className="border rounded-xl p-4">
              <h5 className="text-base font-semibold mb-2">
                타로카드 종류
              </h5>
              <div className="content text-sm leading-relaxed">
                <p>
                  타로카드는 표현 방식과 해석 흐름에 따라 크게 몇 가지 유형으로 나눌 수 있어요. <br />
                  각각의 카드들은 성격과 쓰임이 조금씩 달라요.
                </p>
                <ul className="mt-3 space-y-3">
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        1️⃣
                      </span>
                      {" "}모던 타로
                    </h6>
                    <p>
                      가장 널리 사용되는 타로 카드로 대표적으로 <b>라이더-웨이트</b>, <b>유니버셜 웨이트 타로</b>가 여기에 속해요. <br />
                      이 계열의 타로는 카드 속 인물, 표정, 배경, 상황이 함께 그려져 있어 이미지 자체만으로도 의미를 떠올리기 쉬워요. <br />
                      그래서 키워드와 이미지를 함께 보며 비교적 자유롭고 풍부한 해석이 가능해요. <br />
                      현재 온라인 타로, 서적, 교육 자료에서 가장 많이 사용되는 기준이 되는 타로예요.
                    </p>
                  </li>
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        2️⃣
                      </span>
                      {" "}클래식 타로(마르세유 계열)
                    </h6>
                    <p>
                      마르세유 타로는 현존하는 타로 중 가장 오래된 형태에 가까운 카드예요. 그래서 보통 클래식 타로 또는 고전 타로라고 불러요. <br />
                      모던 타로와 가장 큰 차이는 마이너 아르카나의 숫자 카드에
                      인물이나 배경 그림이 없고 원소의 상징만 단순하게 배치되어 있다는 점이에요. 그렇기에 해석에는 더 많은 상징 이해와 경험이 필요해요.<br />
                      또 하나의 차이점은 힘(Strength)과 정의(Justice) 카드의 번호가 다르다는 점이에요.
                    </p>
                  </li>
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        3️⃣
                      </span>
                      {" "}아트덱&middot;주제덱
                    </h6>
                    <p>
                      아트덱이나 주제덱은 특정 세계관, 예술 스타일, 메시지를 중심으로 제작자의 개성이 강하게 담긴 카드들이에요. <br />
                      전체 구조는 보통 라이더-웨이트 계열을 따르지만, 세부 상징이나 키워드는 덱마다 크게 달라요. <br />
                      그래서 리딩용보다는 감상용이나 영감용으로 사용되는 경우도 많아요.
                    </p>
                  </li>
                  <li>
                    <h6 className="font-semibold">
                      <span className="tossface">
                        4️⃣
                      </span>
                      {" "}오라클 카드
                    </h6>
                    <p>
                      오라클 카드는 타로와 비슷하게 점을 보는 도구지만, 타로카드와는 다른 체계를 가지고 있어요. <br />
                      카드 장수 자유, 주제 자유, 고정된 규칙 없음 <br />
                      타로처럼 78장 구조나 메이저·마이너 구분이 없고, 메시지 중심으로 직관적인 사용이 가능해요. <br />
                      타로와 함께 쓰이기도 하지만, 구조와 개념은 명확히 다른 카드예요.
                    </p>
                  </li>
                </ul>
                <div className="mt-4 rounded-xl bg-violet-50 border border-violet-200 p-4 text-neutral-600">
                  <div className="flex items-start gap-1">
                    <span className="tossface">🪐</span>
                    <b>
                      왜 라이더-웨이트가 '기본'이 될까요?
                    </b>
                  </div>
                  <div className="ps-5">
                    <p>
                      라이더 웨이트는 오랜 시간 쌓여온 타로 상징을 비교적 체계적으로 정리했고, 그만큼 자료와 해석 방식이 가장 풍부하게 축적된 덱이에요. <br />
                      그래서 타로를 처음 배우거나 익힐 때 라이더-웨이트를 기준으로 시작하면 기초가 탄탄해지고, 다른 덱을 볼 때도 훨씬 편해져요.
                    </p>
                  </div>
                  <div className="flex items-start gap-1 pt-3">
                    <span className="tossface">🪐</span>
                    <b>
                      그런데 왜 덱이 이렇게 다양할까요?
                    </b>
                  </div>
                  <div className="ps-5">
                    <p>
                      요즘은 시중에 판매되는 타로 덱이 정말 많아요.
                      기본 상징에 충실한 카드도 있고, 현대적인 감각으로 새롭게 재해석된 카드도 있죠. <br />
                      라이더 웨이트는 대중적인 만큼 기준이 되는 덱이지만, 디자인이나 분위기가 요즘의 감정과 현실에 바로 맞지 않는 느낌이 들 때도 있어요. <br />
                      그래서 사람들은 각자의 취향과 감정에 더 가까운 표현을 찾고, 그 과정에서 정말 다양한 덱이 계속 만들어지고 사랑받게 됐답니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
