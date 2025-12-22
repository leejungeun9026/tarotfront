import PageTitle from "@/components/common/PageTitle";
import { Badge } from "@/components/ui/badge";
import { useTopQuestionStore } from "@/stores/useTopQuestion";
import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function GuideQuestion() {
  const { topQuestionList } = useTopQuestionStore();

  return (
    <div className="GuideQuestion divide-gray-100 divide-y-10">
      <section className="px-4 py-6 sm:py-8">
        <PageTitle
          wrapClassName="mb-5"
          title={
            <>
              <span className="tossface me-1">🎯</span>
              질문 방법
            </>
          }
        />
        <div className="space-y-6 leading-relaxed text-sm">
          <p className="">
            타로카드는 질문이 얼마나 또렷한지에 따라, <br />카드가 전하는 메시지의 깊이와 명확함도 크게 달라져요.
          </p>
          <ul className="space-y-6">
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">1️⃣</span> 질문은 한 번에 하나, 구체적으로</h6>
              <p>
                타로 질문은 한 가지 주제에 집중할수록 해석이 선명해져요.
                여러 질문을 한꺼번에 던지면 카드의 메시지도 흐려질 수 있어요.
              </p>
              <p>
                <span className="tossface">❌</span> <b>막연한 질문</b>
                <ul className="list-disc ps-5.5">
                  <li>연애운은 언제 좋아질까요?</li>
                  <li>재물운 봐주세요</li>
                </ul>
              </p>
              <p>
                <span className="tossface">⭕</span> <b>좋은 질문</b>
                <ul className="list-disc ps-5.5">
                  <li>이번 달 연애운은 어떤 흐름인가요?</li>
                  <li>앞으로 3개월 안에 금전적으로 주의해야 할 점은 뭘까요?</li>
                </ul>
              </p>
              <p>
                '언제', '어떻게', '어떤 흐름인지'처럼 <br />
                질문의 범위를 조금만 좁혀보는 것이 중요해요.
              </p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">2️⃣</span> 반복 질문은 피해주세요</h6>
              <p>
                같은 질문을 짧은 기간 안에 계속 반복하면 타로는 새로운 답을 주기보다, 이미 알고 있는 마음을 다시 보여주는 경우가 많아요.
              </p>
              <p>
                원하는 답이 나오지 않는다고 다음 날, 며칠 뒤 다시 같은 질문을 던지는 건 타로를 보는 행위라기보다 불안이나 집착에 가까워질 수 있어요.
              </p>
              <p>
                카드의 메시지를 받아들인 뒤 조금의 시간과 현실적인 행동을 거쳐 다시 질문해보는 게 좋아요.
              </p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">3️⃣</span> 질문은 현실적이고, 지금의 나와 연결되어야 해요</h6>
              <p>
                타로는 막연한 호기심보다 지금 내가 마주한 고민, 선택의 갈림길에서 더 분명한 메시지를 보여줘요.
              </p>
              <p>
                <span className="tossface">❌</span> <b>타로가 답하기 어려운 질문</b>
                <ul className="list-disc ps-5.5">
                  <li>제가 뭘 해서 먹고 살아야 할까요?</li>
                  <li>언제쯤 대박 날까요?</li>
                </ul>
              </p>
              <p>
                <span className="tossface">⭕</span> <b>타로와 잘 맞는 질문</b>
                <ul className="list-disc ps-5.5">
                  <li>지금 내가 이 선택을 고민하는 이유는 뭘까요?</li>
                  <li>앞으로 6개월 동안 이 방향을 선택했을 때 흐름은 어떨까요?</li>
                </ul>
              </p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">4️⃣</span> 다른 사람에 대한 질문일수록 더 명확하게</h6>
              <p>
                상대방에 관한 질문은 특히 질문을 또렷하게 정해두는 게 좋아요.
              </p>
              <ul className="list-disc ps-5.5">
                <li>상대방의 속마음이 궁금한 건지</li>
                <li>지금의 관계 상황이 궁금한 건지</li>
                <li>앞으로의 관계 흐름이 알고 싶은 건지</li>
                <li>내가 어떤 태도를 취하면 좋을지 알고 싶은 건지</li>
              </ul>
              <p>
                목적이 정리되지 않은 상태에서 카드를 뽑으면 해석이 내가 원하는 방향으로 흐르기 쉬워요.
              </p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">5️⃣</span>YES / NO보다 "어떻게"를 물어보세요</h6>
              <p>
                단답형 질문보다는 행동과 방향을 묻는 질문이 타로와 잘 어울려요.
              </p>
              <p>
                <span className="tossface">❌</span> <b>단답형 질문</b>
                <ul className="list-disc ps-5.5">
                  <li>이거 하면 잘 될까요?</li>
                </ul>
              </p>
              <p>
                <span className="tossface">⭕</span> <b>행동과 방향을 묻는 질문</b>
                <ul className="list-disc ps-5.5">
                  <li>잘 되기 위해 내가 신경 써야 할 점은 뭘까요?</li>
                  <li>이 선택을 했을 때 주의해야 할 부분은 뭘까요?</li>
                </ul>
              </p>
              <p>
                미래를 묻고 싶다면 기간을 함께 정해주는 것도 도움이 돼요. <br />(예: 1주일 안에, 3개월 동안, 올해 안에 등)
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">
            질문 시 주의사항
          </h2>
          <p className="text-neutral-600 text-sm mb-1.5">
            사행성·결과 예측 질문은 리딩 대상이 아니에요.
          </p>
          <p className="text-neutral-600 text-sm mb-1.5">
            로또, 베팅, 도박, 당첨 여부, 주식&middot;코인 등에서 수익이나 시점을 맞히는 질문은 타로버블팁에서 원하는 방식의 해석을 제공하지 않아요.
          </p>
          <div className="inline-flex items-start gap-1 text-sm text-red-600">
            <div>
              <CircleAlert className="mt-0.5 w-4 h-4" />
            </div>
            <p>
              아래 질문에 대해 원하는 결과나 리딩이 정상적으로 나오지 않더라도 리딩 포인트는 차감되니 참고해주세요.
            </p>
          </div>
        </div>
        <div>
          <ul className="space-y-6 leading-relaxed text-sm">
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">🎲</span> 사행성&middot;베팅 관련 질문은 다루지 않아요</h6>
              <p>
                타로버블팁에서는 사행성·베팅성 질문은 받지 않아요. <br />
                다음과 같은 질문은 해석 대상이 아니에요.
              </p>
              <ul className="list-disc ps-5.5">
                <li>로또, 경마, 스포츠토토, 성인용 베팅 게임 관련 질문</li>
                <li>"이번에 당첨될까요?", "몇 번에 베팅하면 좋을까요?"</li>
                <li>결과나 수익을 맞히려는 질문</li>
              </ul>
              <p>
                이런 질문은 결과에 대한 집착을 키우고, <br />
                타로가 전하려는 메시지를 흐리게 만들 수 있어요.
              </p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">📉</span> 투자&middot;재테크 질문은 방향 중심으로만 가능해요</h6>
              <p>
                주식, 코인, 부동산 등 투자 자체를 묻는 질문은 가능하지만, 수익이나 시점을 예측하는 질문은 다루지 않아요.
              </p>
              <p>
                <span className="tossface">❌</span> <b>다루지 않는 질문 예시</b>
                <ul className="list-disc ps-5.5">
                  <li>이 종목 오를까요?</li>
                  <li>언제 대박 날까요?</li>
                  <li>지금 사면 수익 날까요?</li>
                </ul>
              </p>
              <p>
                <span className="tossface">⭕</span> <b>가능한 질문 방향</b>
                <ul className="list-disc ps-5.5">
                  <li>지금 투자에서 제가 조심해야 할 부분은 뭘까요?</li>
                  <li>무리하지 않으려면 어떤 기준을 세우는 게 좋을까요?</li>
                  <li>투자를 대하는 제 태도에서 점검할 점은 뭘까요?</li>
                </ul>
              </p>
              <p>
                타로는 결과보다 과정과 태도를 비추는 데 더 잘 어울려요.
              </p>
            </li>
            <li className="space-y-1.5">
              <h6 className="text-base font-semibold"><span className="tossface">📄</span> 계약&middot;결정 관련 질문은 '확인'과 '준비' 중심으로</h6>
              <p>
                계약이나 중요한 결정에 대한 질문은 결과 예측보다는 체크 포인트에 초점을 맞춰 주세요.
              </p>
              <ul className="list-disc ps-5.5">
                <li>계약 전에 꼭 확인해야 할 조건은 뭘까요?</li>
                <li>이 선택에서 제가 놓치고 있는 부분은 뭘까요?</li>
              </ul>
              <p>
                타로는 결과보다 과정과 태도를 비추는 데 더 잘 어울려요.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">
            어떤 질문을 많이 하고있을까요?
          </h2>
          <p className="text-neutral-600 text-sm mb-1.5">
            이번 달 가장 많이 물어본 질문들이에요.
          </p>
        </div>
        <div>
          <ul>
            {topQuestionList.map((item, index) => {
              const EMOJI_LIST = ['💖', '💸', '💼', '🎓', '🍀', '🤝']
              const categoryEmoji = (type: string) => {
                switch (type) {
                  case "LOVE":
                    return EMOJI_LIST[0];
                  case "MONEY":
                    return EMOJI_LIST[1];
                  case "JOB":
                    return EMOJI_LIST[2];
                  case "STUDY":
                    return EMOJI_LIST[3];
                  case "LIFE":
                    return EMOJI_LIST[4];
                  case "HUMAN":
                    return EMOJI_LIST[5];
                  default:
                    return null;
                }
              }
              const itemType = item.typeEn.toLowerCase()
              return (
                <li key={item.question} className="first:pt-0 not-last:border-b py-3">
                  <div className="w-full flex items-center gap-3">
                    <p className="shrink-0 flex justify-center items-center  w-6 h-6 rounded-sm bg-violet-700 text-white text-xs font-semibold text-nowrap">{index + 1}위</p>
                    <div className="grow">
                      <Badge variant="outline">
                        <span className="tossface">{categoryEmoji(item.typeEn)}</span> {item.typeKr}
                      </Badge>
                      <Badge variant="secondary" className="ms-1">
                        {item.category}
                      </Badge>
                      <p className="mt-1 line-clamp-2 font-semibold">
                        {item.question}
                      </p>
                    </div>
                    <Link to={`/reading/${itemType}#cat-${item.readingCategoryId}`} className="shrink-0 ms-auto text-sm underline underline-offset-3 text-violet-600 text-nowrap self-end pb-0.5">질문하기</Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section >
    </div >
  );
}
