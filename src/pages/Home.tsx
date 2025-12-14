import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import "../styles/home.css";

import TodayCard from "@/components/tarotcard/TodayCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReadingStore } from "@/stores/useReadingStore";
import { getCategoryImg } from "@/utils/imageMapper";
import { useMemo } from "react";
import starsLottie from "../assets/lottie/stars.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Home() {
  const { categories, loadingCategories } = useReadingStore();
  const navigate = useNavigate();

  const uniqueTypes = useMemo(() => {
    const map = new Map<string, { typeEn: string; typeKr: string }>();
    categories.forEach((c) => {
      const key = String(c.typeEn);
      if (!map.has(key))
        map.set(key, { typeEn: key, typeKr: String(c.typeKr) });
    });
    return Array.from(map.values());
  }, [categories]);

  if (loadingCategories && categories.length === 0) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="Home divide-gray-100 divide-y-10">
      <section className="todayReading px-4 pt-2 pb-6 ">
        <Card className="w-full py-8 border-0 overflow-hidden bg_gradient">
          <CardContent>
            <TodayCard
              cardContainerHeight={"h-48 md:h-50"}
              cardMaxWidth={"max-w-20 md:max-w-24"}
            />

            <div className="absolute left-0 top-0 z-0 w-full sm:w-1/2 object-cover opacity-50">
              <Lottie
                width={"100%"}
                height={"100%"}
                animationData={starsLottie}
                loop={true}
              />
            </div>
            <div className="absolute right-0 top-0 z-0 w-0 sm:w-1/2 rotate-y-180 object-cover opacity-50">
              <Lottie
                width={"100%"}
                height={"100%"}
                animationData={starsLottie}
                loop={true}
              />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
          {uniqueTypes.map((category) => {
            const textLow = category.typeEn.toLowerCase();
            return (
              <Link to={`/reading/${textLow}`} key={category.typeEn}>
                <Card className="hover:bg-violet-50 hover:border-violet-200 hover:shadow-md transition-all group">
                  <CardContent className="flex flex-col justify-center items-center gap-1">
                    <div className="imgWrap group-hover:animate-bounce">
                      <img
                        src={getCategoryImg(textLow)}
                        className="size-7 sm:size-8"
                      />
                    </div>
                    <span className="ff_kyobo">{category.typeKr}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="askList px-4 py-6">
        <div className="section_title pb-4 flex items-end justify-between gap-2">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            타로 정보
          </h4>

          {/* 우측 "전체 보기" */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/guide/info")}
          >
            전체 보기
          </Button>
        </div>

        <div className="section_content space-y-3">
          {/* 2x2 가이드 카드 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card
              className="cursor-pointer hover:bg-violet-50 hover:border-violet-200 hover:shadow-md transition-all group"
              onClick={() => navigate("/guide/info")}
            >
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="group-hover:bg-violet-100"
                  >
                    소개
                  </Badge>
                  <span className="text-lg tossface">💜</span>
                </div>
                <p className="ff_kyobo text-sm font-medium">
                  타로버블팁은 뭐야?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  서비스 흐름과 이용 팁을 한 번에 보기
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-violet-50 hover:border-violet-200 hover:shadow-md transition-all group"
              onClick={() => navigate("/guide/howto")}
            >
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="group-hover:bg-violet-100"
                  >
                    기본
                  </Badge>
                  <span className="text-lg tossface">🔮</span>
                </div>
                <p className="ff_kyobo text-sm font-medium">
                  타로점은 어떻게 봐?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  질문 만드는 법 · 결과 읽는 순서
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-violet-50 hover:border-violet-200 hover:shadow-md transition-all group"
              onClick={() => navigate("/guide/term")}
            >
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="group-hover:bg-violet-100"
                  >
                    용어
                  </Badge>
                  <span className="text-lg tossface">📖</span>
                </div>
                <p className="ff_kyobo text-sm font-medium">
                  헷갈리는 단어 모음
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  스프레드 · 역방향 · 아르카나
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-violet-50 hover:border-violet-200 hover:shadow-md transition-all group"
              onClick={() => navigate("/guide/tarotcard")}
            >
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="group-hover:bg-violet-100"
                  >
                    카드
                  </Badge>
                  <span className="text-lg tossface">🪄</span>
                </div>
                <p className="ff_kyobo text-sm font-medium">
                  타로카드 둘러보기
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  78장 의미 · 키워드 빠르게 확인
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 아래 “오늘의 팁” 카드 */}
          <Card className="overflow-hidden border-violet-100 bg-violet-50/50">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="tossface">✨</span>
                  <p className="text-sm font-semibold">오늘의 리딩 팁</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed truncate">
                  질문은 “기간 + 상황 + 내가 할 수 있는 행동”을 넣으면 해석이 더
                  또렷해져요.
                </p>
              </div>

              <Button
                size="sm"
                className="rounded-xl shrink-0"
                onClick={() => navigate("/reading")}
              >
                운세 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="faq px-4 py-6">
        <div className="section_title pb-4">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            자주 묻는 질문
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            처음 이용할 때 많이 궁금해하는 질문들이에요
          </p>
        </div>

        <div className="section_content">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>
                타로 결과는 미래를 확정해 주는 건가요?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                아니에요. 타로는 미래를 단정짓기보다,
                <b>지금의 흐름과 가능성</b>을 보여주는 도구예요. 결과는
                참고용으로 받아들이고, 선택은 언제나 본인의 몫이에요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>
                같은 질문을 여러 번 봐도 되나요?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                가능은 하지만, 너무 짧은 시간 안에 반복하면 오히려 불안이 커질
                수 있어요. 한 번 결과를 본 뒤,{" "}
                <b>내가 할 수 있는 행동을 실천한 후</b>
                다시 보는 걸 추천해요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>
                역방향 카드가 나오면 안 좋은 건가요?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                꼭 그렇지는 않아요. 역방향은{" "}
                <b>지연, 과함, 내면의 상태, 조정이 필요한 부분</b>을 알려주는
                경우가 많아요. 경고이기도 하고, 방향을 잡아주는 힌트이기도 해요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>
                타로버블팁의 해석은 누가 해주나요?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                질문, 선택한 카드, 스프레드를 바탕으로 AI가 종합적인 해석과
                조언을 제공해요. 단순 키워드 나열이 아니라,{" "}
                <b>흐름 중심의 해석</b>을 지향해요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>
                결과가 마음에 안 들면 어떻게 해야 하나요?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                그럴 수 있어요. 불편한 문장은 “피해야 할 점”이나 “조정하면
                좋아질 부분”으로 해석해 보세요. 타로는 불안을 키우기 위한 게
                아니라,
                <b>선택을 돕기 위한 도구</b>예요.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}

export default Home;
