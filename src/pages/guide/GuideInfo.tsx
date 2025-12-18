import ChatBubble from "@/components/common/ChatBubble";
import PageTitle from "@/components/common/PageTitle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import appIcon from "../../assets/app-icon.png";
import memoji from "../../assets/memoji.jpg";

export default function GuideInfo() {
  const navigate = useNavigate();

  return (
    <div className="GuideInfo divide-gray-100 divide-y-10">
      <section className="hidden px-4 py-6 sm:py-8 border-0">
        <PageTitle
          title={
            <>타로버블팁 소개</>
          }
          subtitle={
            <>
              전문 타로 리더의 리딩 경험을 기반으로 한 <br />AI 개인 맞춤형 타로 해석 서비스
            </>}
        />
      </section>
      <section className="px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-end items-start gap-3" data-aos="fade-up">
            <ChatBubble
              colorClass="text-violet-200"
              tail="right-top"
              className="max-w-4/5 mt-3"
              contentClassName="rounded-3xl px-4 py-3 whitespace-pre-wrap text-start text-white"
            >
              <p className="relative z-5 text-neutral-700 ff_kyobo text-sm xs:text-lg">
                “AI 리딩? <br className="block sm:hidden" />다 똑같은 대답만 하는거 아니야?”
              </p>
            </ChatBubble>
            <div className="hidden xs:block img_wrap relative size-10 rounded-2xl sm:size-14 sm:rounded-3xl border overflow-hidden">
              <img src={memoji} alt="미모지프로필" className="absolute w-40 left-1/2 top-1/2 -translate-1/2" />
            </div>
          </div>
          <div className="flex justify-start items-start gap-3" data-aos="fade-up">
            <div className="img_wrap relative size-10 rounded-2xl sm:size-14 sm:rounded-3xl border overflow-hidden">
              <img src={appIcon} alt="타로버블팁 프로필" className="absolute w-10 left-1/2 top-1/2 -translate-1/2" />
            </div>
            <ChatBubble
              colorClass="text-violet-300"
              tail="left-top"
              className="max-w-4/5 mt-3"
              contentClassName="rounded-3xl px-4 py-3 bg_gradient whitespace-pre-wrap text-start text-white"
            >
              <p className="relative z-5 text-violet-900 ff_kyobo text-sm xs:text-lg">
                그렇게 느껴졌다면, <br />
                아직 ‘해석하는 AI 타로’를 만나지 못한 거예요.
              </p>
            </ChatBubble>
          </div>
        </div>
        <Card className="py-6 sm:py-8 mt-10 rounded-3xl">
          <CardContent>
            <ul className="flex flex-col gap-6 sm:gap-8">
              <li>
                <h2 className="inline-flex items-start gap-2 text-base font-semibold mb-2">
                  <span className="tossface text-lg">1️⃣</span>
                  <div>
                    <p className="inline-block relative w-fit h-auto m-auto">
                      <span className="absolute z-0 bg-violet-400 w-full h-2 left-0 bottom-0.5 opacity-20"></span>
                      <span className="relative z-1 text-nowrap">전문 타로 리더</span>
                    </p>
                    의 리딩 방식
                  </div>
                </h2>
                <div className="flex flex-col gap-2 ps-7.5 text-sm">
                  <p>카드를 뽑자마자 의미부터 나열하지 않아요.</p>
                  <p>
                    먼저 당신이 어떤 질문을 던졌는지, 지금 어떤 상황에서 이 질문을 하게 되었는지를 살펴봐요.
                  </p>
                  <p>
                    그리고 나서 카드가 놓인 포지션과 카드들 사이의 관계, 흐름이 이어지는 방향을 천천히 읽어가요.
                  </p>
                </div>
              </li>
              <li>
                <h2 className="inline-flex items-start gap-2 text-base font-semibold mb-2">
                  <span className="tossface text-lg">2️⃣</span>
                  <div>
                    사람이 섞는 흐름을 닮은{" "}
                    <p className="inline-block relative w-fit h-auto m-auto">
                      <span className="absolute z-0 bg-violet-400 w-full h-2 left-0 bottom-0.5 opacity-20"></span>
                      <span className="relative z-1 text-nowrap">셔플 알고리즘</span>
                    </p>
                  </div>
                </h2>
                <div className="flex flex-col gap-2 ps-7.5 text-sm">
                  <p>
                    타로에서 카드를 <b>'어떻게 섞느냐'</b>는 생각보다 중요한 과정이에요.
                  </p>
                  <p>
                    무작위로 숫자를 뽑는 방식이 아니라, 사람이 카드를 섞을 때 생기는 순서의 변화와 리듬을 알고리즘으로 구현했어요.
                  </p>
                  <p>
                    카드가 섞이는 속도, 중간에 흐트러지는 순서와 역방향, 그리고 컷(cut) 후 다시 이어지는 배열까지.
                  </p>
                </div>
              </li>
              <li>
                <h2 className="inline-flex items-start gap-2 text-base font-semibold mb-2">
                  <span className="tossface text-lg">3️⃣</span>
                  <div>
                    같은 카드라도, {" "}
                    <p className="inline-block relative w-fit h-auto m-auto">
                      <span className="absolute z-0 bg-violet-400 w-full h-2 left-0 bottom-0.5 opacity-20"></span>
                      <span className="relative z-1 text-nowrap">해석은 달라져요</span>
                    </p>
                  </div>
                </h2>
                <div className="flex flex-col gap-2 ps-7.5 text-sm">
                  <p>
                    타로카드 하나의 의미는 항상 하나로 정해져 있지 않아요.
                  </p>
                  <p>
                    같은 카드라도 연애를 묻는 질문인지,  커리어를 고민하는 상황인지, 지금의 마음  상태가 어떤지에 따라 전혀 다른 메시지가 될 수 있어요.
                  </p>
                  <p>
                    카드의 기본 의미에 질문의 맥락을 겹쳐서, <b>지금 이 순간의 당신에게 더 필요한 해석</b>을 찾아드려요.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
      <section className="px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="rounded-3xl bg-violet-50 border-violet-100 w-full mx-auto text-center">
            <CardHeader className="block">
              <h2 className="text-lg font-semibold leading-tight">
                <p className="tossface pb-2">🗝</p>
                이런 순간, <br />타로버블팁이 필요할 거예요!
              </h2>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="h-full flex flex-col gap-1 justify-center items-center ff_kyobo text-neutral-600">
                <li>답은 없는데, 마음은 너무 복잡할 때</li>
                <li>친구에게 말하기엔 애매한 고민이 생겼을 때</li>
                <li>선택지 앞에서 자꾸 마음이 흔들릴 때</li>
              </ul>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="button_wrap">
                <p className="mb-3 text-sm">
                  <b className="text-violet-700">진짜 내 마음</b>은 무엇인지, <br /><b className="text-violet-700">단서</b>를 찾아볼까요?
                </p>
                <Button onClick={() => navigate("/reading/love")}>상황별 운세</Button>
              </div>
            </CardFooter>
          </Card>
          <Card className="rounded-3xl bg-violet-50 border-violet-100 w-full mx-auto text-center">
            <CardHeader className="block">
              <h2 className="text-lg font-semibold leading-tight">
                <p className="tossface pb-2">💬</p>
                질문하기 막막해도, <br />시작할 수 있어요
              </h2>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="h-full flex flex-col gap-1 justify-center items-center ff_kyobo text-neutral-600">
                <li>상황별로 정리된 질문 예시가 있어요</li>
                <li>많이 선택된 질문도 한눈에 볼 수 있어요</li>
                <li>물론, 직접 질문을 입력할 수도 있어요</li>
              </ul>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="button_wrap">
                <p className="mb-3 text-sm">
                  다른 사람들은 <br /><b className="text-violet-700">어떤 질문을 많이 하는지</b> 보러갈까요?
                </p>
                <Button onClick={() => navigate("/reading/love")}>많이 찾는 질문</Button>
              </div>
            </CardFooter>
          </Card>
          <Card className="rounded-3xl bg-violet-50 border-violet-100 w-full mx-auto text-center">
            <CardHeader className="block">
              <h2 className="text-lg font-semibold leading-tight">
                <p className="tossface pb-2">📖</p>
                기록되고, <br />다시 돌아볼 수 있어요
              </h2>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="h-full flex flex-col gap-1 justify-center items-center ff_kyobo text-neutral-600">
                <li>오늘의 리딩은 보관함에 남아요</li>
                <li>시간이 지난 뒤 다시 읽어볼 수 있어요</li>
                <li>짧은 코멘트도 함께 기록할 수 있어요</li>
              </ul>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="button_wrap">
                <p className="mb-3 text-sm">
                  순간의 기록이 아니라, <br />
                  돌아보며 <b className="text-violet-700">나를 이해하는 위로</b>가 될 거예요
                </p>
                <Button onClick={() => navigate("/archive")}>보관함 보기</Button>
              </div>
            </CardFooter>
          </Card>
          <Card className="rounded-3xl bg-violet-50 border-violet-100 w-full mx-auto text-center">
            <CardHeader className="block">
              <h2 className="text-lg font-semibold leading-tight">
                <p className="tossface pb-2">🔗</p>
                <span>
                  필요할 땐, <br />마음을 나눌 수 있어요
                </span>
              </h2>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="h-full flex flex-col gap-1 justify-center items-center ff_kyobo text-neutral-600">
                <li>리딩 결과를 링크로 공유할 수 있어요</li>
                <li>카드와 해석을 그대로 담아 전달해요</li>
                <li>내가 작성한 코멘트는 공유되지 않아요</li>
              </ul>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="button_wrap">
                <p className="mb-3 text-sm">
                  말로 하기 어려운 순간에도, <br />
                  <b className="text-violet-700">카드가 대신 이야기</b>를 건네줘요
                </p>
                <Button onClick={() => navigate("/archive")}>리딩 공유하기</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section >
      <section className="px-4 py-6 sm:py-8">
        <h2 className="text-lg font-semibold leading-tight mb-3">자주 묻는 질문</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer">
              <p className="text-base">
                같은 질문을 반복해서 봐도 괜찮을까요?
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-neutral-600 space-y-2 leading-relaxed">
                <p>
                  짧은 시간 안에 같은 질문을 여러 번 반복해서 보는 것은 권장하지 않아요.
                </p>
                <p>
                  타로는 지금 이 순간의 흐름과 에너지 상태를 보여주는 도구이기 때문에, <br />
                  상황에 큰 변화가 없다면 결과 역시 비슷하거나 오히려 혼란스러워질 수 있어요.
                </p>
                <p>
                  다만, 내가 어떤 선택을 했거나 환경이나 마음가짐에 분명한 변화가 생겼다면 <br />
                  다시 한 번 점을 보는 것도 의미가 있을 수 있어요.
                </p>
                <p>
                  타로의 역할은 답을 강요하는 것이 아니라 현재의 방향을 안내하는 것이에요. <br />
                  <b>상황이 바뀌었을 때, 새로운 안내를 받아보세요.</b>
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer">
              <p className="text-base">
                타로 카드로 미래를 정확히 예측할 수 있나요?
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-neutral-600 space-y-2 leading-relaxed">
                <p>
                  타로 점은 완전히 고정된 미래를 예언하는 것이 아니에요.
                </p>
                <p>
                  카드는 현재의 상태와 흐름, 그리고 앞으로 이어질 수 있는 가능성을 보여줄 뿐이에요. <br />
                  미래는 언제든 당신의 선택과 행동에 따라 달라질 수 있어요.
                </p>
                <p>
                  만약 결과가 기대와 다르더라도 “이건 끝이야”라고 받아들이기보다는 <br />
                  어떤 부분을 조심하면 좋을지, 어디에서 방향을 바꿀 수 있을지를 살펴보는 것이 좋아요.
                </p>
                <p>
                  <b>타로의 역할은 미리 대비하고, 더 나은 선택을 돕는 데 있어요.</b>
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="cursor-pointer">
              <p className="text-base">
                온라인 타로 결과는 얼마나 신뢰할 수 있나요?
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-neutral-600 space-y-2 leading-relaxed">
                <p>
                  타로 결과의 만족도와 깊이는 여러 요소에 따라 달라져요. <br />
                  그중 가장 중요한 것은 질문의 명확함과 진정성이에요.
                </p>
                <p>
                  질문이 구체적일수록 카드와 해석은 당신의 상황에 더 정확하게 맞닿아요.
                </p>
                <p>
                  또한 결과를 절대적인 진리로 받아들이기보다는 <br />
                  지금 나를 돌아보게 해주는 참고 자료이자 성찰의 도구로 바라보는 것이 좋아요.
                </p>
                <p>
                  타로는 직관과 자기 인식을 깨우는 도구이며, <br />
                  <b>해석과 선택의 최종 권한은 언제나 자신에게 있다는걸 잊지마세요.</b>
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="cursor-pointer">
              <p className="text-base">
                더 좋은 타로 질문을 하려면 어떻게 해야 하나요?
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-neutral-600 space-y-2 leading-relaxed">
                <p>
                  너무 막연한 질문은 타로 카드도 방향을 잡기 어려워요.
                </p>
                <p>
                  예를 들어 <br />
                  "나는 뭘 하고 있는 걸까?"처럼 범위가 넓고 추상적인 질문보다는,
                </p>
                <p>

                  "앞으로 나의 커리어 흐름은 어떻게 이어질까요?"<br />
                  "현재 두 가지 선택지 중 어떤 방향이 나에게 더 맞을까요?"<br />
                  "지금 이 관계에서 상대는 나를 어떻게 바라보고 있나요?"<br />
                  처럼 <b>상황과 대상이 비교적 분명한 질문</b>이 좋아요.
                </p>
                <p>
                  질문이 구체할수록 해석은 더 명확해지고, 당신에게 필요한 조언도 또렷해져요.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div >
  );
}
