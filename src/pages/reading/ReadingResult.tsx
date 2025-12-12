import type ReadingResultResponseDTO from "@/apis/response/reading/reading-result.response";
import ChatBubble from "@/components/common/ChatBubble";
import PageTitle from "@/components/common/PageTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { todayDate } from "@/constants/today";
import { getCardImg } from "@/utils/imageMapper";
import { Heart, ImageDown } from "lucide-react";

type ReadingQuestionsContext = {
  categoryId: number;
  category: string;
  question: string;
  spreadType: string;
  spreadCount: number;
};

type Props = {
  result: ReadingResultResponseDTO;
  questions: ReadingQuestionsContext;
};

function ReadingResult({ result, questions }: Props) {

  const {
    readingId,
    resultTitle,
    resultSummary = "",
    overallAdvice = "",
    positions = [],
    cardList = [],
  } = result;

  const { categoryId, category, question, spreadType, spreadCount } = questions;

  const replaceDotWithBr = (text: string): string => {
    return text.replace(/\. /g, ".\n");
  }

  return (
    <div className="ReadingResult">
      <section className="title_wrap px-4 py-6 sm:py-8 text-center">
        <PageTitle
          wrapClassName={""}
          title={<>나의 {category}운 결과</>}
          subtitle={
            <>
              <p className="relative w-fit h-auto m-auto">
                <span className="absolute z-0 bg-violet-400 w-full h-2 left-0 bottom-0.5 animate-pulse opacity-50"></span>
                <span className="relative z-1">"{question}"</span>
              </p>
              <p>질문에 대한 카드 해석이에요.</p>
            </>
          }
        />
      </section>
      <section className="resultCard_wrap px-4 py-6 sm:py-8">
        <ul className="flex gap-3 xs:gap-8 justify-center">
          {cardList.map((c, index) => {
            return (
              <li key={index}>
                <div className="flex flex-col items-center gap-3">
                  <Badge variant="outline">{c.positionName}</Badge>
                  <div className="w-auto max-w-40 rounded-md shadow-md border overflow-hidden">
                    <img
                      src={getCardImg(c.cardId) ?? undefined}
                      alt={c.nameEn}
                      className={`${c.reverse && "rotate-180"}`}
                    />
                  </div>
                  <div className="text-center">
                    {c.reverse ? (
                      <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-red-100 text-red-500">
                        역방향
                      </span>
                    ) : (
                      <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-500">
                        정방향
                      </span>
                    )}
                    <div className="mt-2 text-sm">
                      <p>{c.nameEn}</p>
                      <p>({c.nameKr})</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="context_wrap px-4 py-10">
        <div className="flex flex-col items-stretch gap-12">
          <div className="inline-flex gap-3 items-center flex-wrap">
            <h4 className="text-2xl font-bold">
              <span className="tossface">🔮</span> {resultTitle}
            </h4>
            <ul className="inline-flex gap-2">
              <li>
                <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-violet-100/20 dark:aria-invalid:ring-violet-100/40 aria-invalid:border-violet-100 transition-[color,box-shadow] overflow-hidden border-transparent bg-violet-100 text-violet-500 [a&]:hover:bg-violet-100/90 focus-visible:ring-violet-100/20 dark:focus-visible:ring-violet-100/40 dark:bg-violet-100/60">
                  {category}
                </span>
              </li>
              <li>
                <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-violet-100/20 dark:aria-invalid:ring-violet-100/40 aria-invalid:border-violet-100 transition-[color,box-shadow] overflow-hidden border-transparent bg-violet-100 text-violet-500 [a&]:hover:bg-violet-100/90 focus-visible:ring-violet-100/20 dark:focus-visible:ring-violet-100/40 dark:bg-violet-100/60">
                  {spreadType}
                </span>
              </li>
              <li>
                <Badge variant="secondary">{todayDate}</Badge>
              </li>
            </ul>
          </div>
          <div className="px-2">
            <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
              <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
              <span className="relative z-1">
                전체적인 해석은 이렇게 나왔어요!
              </span>
            </h6>
            <div className=" whitespace-pre-wrap leading-relaxed">
              {replaceDotWithBr(resultSummary)}
            </div>
          </div>
          <div className="px-2">
            <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
              <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
              <span className="relative z-1">카드를 자세히 해석해볼게요</span>
            </h6>
            <div className="whitespace-pre-wrap leading-relaxed">
              <ul>
                {positions.map((position) => {
                  return (
                    <li key={position.position} className="not-last:pb-8">
                      <div className="inline-flex items-center gap-2">
                        <b>{position.positionName}</b>:
                        <div className="inline-flex items-center gap-1">
                          {cardList
                            .filter((c) => c.position == position.position)
                            .map((p) => {
                              return (
                                <>
                                  <Badge variant="outline">{p.nameEn}</Badge>
                                  <Badge variant="outline">{p.nameKr}</Badge>
                                  {p.reverse ? (
                                    <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-red-100 text-red-500">
                                      역방향
                                    </span>
                                  ) : (
                                    <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-500">
                                      정방향
                                    </span>
                                  )}
                                </>
                              );
                            })}
                        </div>
                      </div>
                      <p className="my-2">
                        {replaceDotWithBr(position.interpretation)}
                      </p>
                      <p className="">
                        <span className="me-1.5 text-violet-900 text-sm font-bold">
                          TIP!
                        </span>
                        <span className="ff_kyobo text-neutral-600">
                          {position.advice}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="px-2">
            <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
              <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
              <span className="relative z-1">종합적으로 정리해보자면..</span>
            </h6>
            <div className="whitespace-pre-wrap leading-relaxed">
              {replaceDotWithBr(resultSummary)}
            </div>
          </div>
          <div className="px-2">
            <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
              <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
              <span className="relative z-1">마지막 버블 팁!</span>
            </h6>
            <div className="w-full">
              <ChatBubble
                colorClass="text-violet-800"
                tail="left-top"
                className="max-w-4/5 "
                contentClassName="whitespace-pre-wrap text-start text-white ff_kyobo text-lg leading-relaxed"
              >
                {replaceDotWithBr(overallAdvice)}
              </ChatBubble>
              <div>
                {(category === "금전" ||
                  category === "투자" ||
                  category === "계약" ||
                  category === "재물" ||
                  category === "쇼핑&지출") && (
                    <p className="mt-8 text-xs text-neutral-500">
                      투자와 관련된 선택은 사용자 본인의 판단과 책임이 요구돼요.
                      <br />
                      제공되는 카드는 예측이나 보장을 의미하지 않으며, 참고
                      수준으로만 이용해 주세요.
                    </p>
                  )}
              </div>
              <div className="w-full text-right mt-6">
                <ChatBubble
                  colorClass="text-violet-300"
                  tail="right-bottom"
                  className="w-full max-w-4/5 px-0 py-0"
                  contentClassName="whitespace-pre-wrap text-foreground ff_kyobo text-lg leading-relaxed w-full"
                >

                  <Textarea className="border-0"></Textarea>
                </ChatBubble>
              </div>
              <h6 className="ff_kyobo text-xl text-end relative w-fit h-auto mt-4 ms-auto">
                <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
                <span className="relative z-1">내 감정을 기록해 놓을까요?</span>
              </h6>
            </div>
          </div>
          <div className="px-2">

          </div>
        </div>
      </section>
      <section className="title_wrap px-4 pt-6 pb-8 text-center">
        <div className="flex justify-center gap-3">
          <Button variant="outline">
            {readingId}
            <Heart />
            좋아요
          </Button>
          <Button variant="outline">
            <ImageDown />
            이미지 저장
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ReadingResult;
