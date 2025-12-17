import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HowTo() {
  return (
    <div className="ReadingType">
      <section className="px-4 py-6 sm:py-8">

      </section>
      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="mb-5">
          <h1 className="ff_kyobo text-2xl font-semibold tracking-tight">
            타로점이란?
          </h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            타로는 “미래를 단정”하기보다, 지금의 흐름과 마음을 상징으로 정리해
            선택을 돕는 방식이에요.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">상징</Badge>
          <Badge variant="secondary">흐름</Badge>
          <Badge variant="secondary">선택</Badge>
          <Badge variant="secondary">조언</Badge>
        </div>

        <div className="grid gap-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">타로버블팁에서 보는 방식</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <div className="rounded-2xl border p-4 bg-muted/40">
                <p className="text-muted-foreground">
                  카드가 말해주는 건 “정답”이 아니라 “가능성”이에요. 그래서 결과를
                  읽을 때는, 내 상황과 마음에 맞는 부분을 골라 활용하는 게 좋아요.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="font-medium">질문 예시</p>
                <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
                  <li>연애: “상대 마음이 어떤지”, “내가 취할 행동은?”</li>
                  <li>커리어: “지금 방향이 맞는지”, “다음 흐름은?”</li>
                  <li>금전: “지출/투자에서 조심할 점은?”</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">자주 묻는 질문</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="a1">
                  <AccordionTrigger>
                    역방향(뒤집힌 카드)은 무조건 나쁜가요?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    아니에요. 역방향은 “막힘/과함/내면화/지연”처럼 에너지가 다른
                    방식으로 나타나는 경우가 많아요. 상황에 따라 경고이기도 하고,
                    조정 포인트이기도 해요.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="a2">
                  <AccordionTrigger>
                    같은 질문을 계속 봐도 되나요?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    가능은 하지만, 너무 짧은 간격으로 반복하면 불안만 커질 수
                    있어요. “지금 내가 바꿀 수 있는 행동”을 하나 정한 뒤에, 흐름이
                    바뀐 다음 다시 보는 걸 추천해요.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="a3">
                  <AccordionTrigger>
                    결과가 마음에 안 들면 어떡하죠?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    결과는 확정이 아니라 “현재 기준 가능성”이에요. 불편한 문장이
                    있다면, 그 문장을 “내가 조정할 수 있는 요소”로 바꿔서
                    생각해보면 도움돼요. (예: ‘거리감’ → ‘연락 빈도/표현 방식
                    조절’)
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">읽을 때 주의할 점</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc ps-5 space-y-1">
                <li>타로는 의료/법률/투자 판단을 대신할 수 없어요.</li>
                <li>불안을 줄이려는 목적이라면 “행동 1개”로 마무리해보세요.</li>
                <li>
                  타인의 의사(상대가 무조건 연락한다 등)를 확정으로 받아들이지
                  않기.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
