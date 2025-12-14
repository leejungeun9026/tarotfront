import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Info() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="ff_kyobo text-2xl font-semibold tracking-tight">
          타로버블팁 소개
        </h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          타로버블팁은 “정답”을 찍어주는 서비스가 아니라, 지금의 마음과 상황을
          카드의 상징으로 부드럽게 비춰보는 공간이에요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary">AI 맞춤 해석</Badge>
        <Badge variant="secondary">데일리 1장 운세</Badge>
        <Badge variant="secondary">카테고리 리딩</Badge>
        <Badge variant="secondary">보관함</Badge>
      </div>

      <div className="grid gap-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">
              타로버블팁에서 할 수 있는 것
            </CardTitle>
            <CardDescription>
              기능은 많아도 흐름은 단순하게, 감정은 더 편안하게.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed">
            <ul className="list-disc ps-5 space-y-2 text-sm">
              <li>
                <b>운세 보기</b>: 질문과 카드 조합에 따라 해석/조언을 받기
              </li>
              <li>
                <b>오늘의 운세</b>: 하루의 흐름을 가볍게 체크하기
              </li>
              <li>
                <b>보관함</b>: 결과를 저장하고, 북마크/코멘트로 기록하기
              </li>
            </ul>

            <Separator />

            <div className="rounded-2xl border p-4 bg-muted/40">
              <p className="text-sm text-muted-foreground">
                팁: “질문”을 조금만 구체적으로 적으면, 해석이 훨씬 내 상황에
                가까워져요. (예: “연락 올까요?” → “이번 주 안에 먼저 연락이 올
                가능성이 있을까요?”)
              </p>
            </div>

            <div className="flex gap-2">
              <Button asChild className="rounded-xl">
                <Link to="/reading">운세 보러가기</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-xl">
                <Link to="/reading/today">오늘 운세 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">해석을 읽는 추천 순서</CardTitle>
            <CardDescription>
              한 번에 다 보려고 하지 않아도 돼요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed">
            <div className="flex items-start gap-2">
              <Badge>1</Badge>
              <p>요약(한 줄)을 먼저 보고 전체 톤을 잡기</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge>2</Badge>
              <p>카드별 해석에서 “내 상황과 맞는 문장”에 밑줄 긋듯 체크</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge>3</Badge>
              <p>조언은 “오늘 할 수 있는 행동 1개”로 바꿔보기</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
