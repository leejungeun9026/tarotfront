import type { ReadingResultRequestDTO } from "@/apis/request/reading";
import type ReadingResultResponseDTO from "@/apis/response/reading/reading-result.response";
import PageTitle from "@/components/common/PageTitle";
import CardItem from "@/components/tarotcard/CardItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReadingSpreadCount from "@/types/enums/readingSpread-count.enum copy";
import numberToRoman from "@/utils/numberToRoman";
import { Bookmark } from "lucide-react";

type ResultProps = Omit<ReadingResultResponseDTO, "code" | "message">;
type QuestionProps = Pick<
  ReadingResultRequestDTO,
  "categoryId" | "category" | "question" | "spreadType" | "spreadCount"
>;
type Props = ResultProps & QuestionProps;

function ReadingResult({ category, question, spreadType, spreadCount,
  readingId, resultTitle, resultSummary, cardList, positions, overallAdvice }: Props) {
  return (
    <div className="ReadingResult">
      <section className="title_wrap px-4 py-6">
        <PageTitle
          wrapClassName={"text-center"}
          title={<>
            <span className="text-violet-700 font-bold">나의 {category}운 </span>
          </>}
          subtitle={
            <>
              <p className="relative w-fit h-auto m-auto">
                <span className="absolute z-0 bg-violet-400 w-full h-2 left-0 bottom-0.5 animate-pulse opacity-50"></span>
                <span className="relative z-1">"{question}"</span>
              </p>
              <p>
                질문에 대한 카드 해석이에요.
              </p>
            </>
          }
        />
      </section>
      <section className="content_wrap px-4 py-6">
        <div className="inner flex flex-col gap-10">
          <div className="card_img_section">
            <ul className="flex gap-4 justify-center">
              {cardList.map(c => {
                return (
                  <li key={c.cardId}>
                    <div className="flex flex-col items-center gap-2">
                      <Badge variant="outline">{c.positionName}</Badge>
                      <div className="card_wrap show_card rounded-sm shadow-sm">
                        <CardItem card={{ type: "front", id: c.cardId, reverse: c.reverse }} />
                      </div>
                      <div>
                        <p className="ff_roman text-sm">
                          <span>
                            { }
                          </span>
                          {" "}
                          <span>
                            {numberToRoman(5)}
                          </span>
                        </p>
                        {c.nameEn}{c.nameKr}
                      </div>
                      {c.reverse ?
                        <span className="ms-2 inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-red-100 text-red-500">역방향
                        </span>
                        :
                        <span className="ms-2 inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-500">
                          정방향
                        </span>
                      }
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="card_text_section">
            <ul>
              <li>리딩 방식 : {spreadType}</li>
              <li></li>
            </ul>
          </div>

          {resultSummary}
          {positions.map(position => {
            return (
              <div key={position.position}>
                <p>{position.positionName}</p>
                <p>{position.interpretation}</p>
                <p>{position.advice}</p>
              </div>
            )
          })}
          {overallAdvice}
        </div>
      </section>

      <Button>
        {readingId}
        <Bookmark />
      </Button>
    </div>
  )
}

export default ReadingResult