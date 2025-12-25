import type {
  ReadingCategoryResponseDTO,
  ReadingQuestionResponseDTO,
} from "@/apis/response/reading";
import PageTitle from "@/components/common/PageTitle";
import SkeletonMySwiperCard from "@/components/skeletons/SkeletonMySwiperCard";
import SkeletonPageTitle from "@/components/skeletons/SkeletonPageTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CATEGORY_EMOJI } from "@/constants/catagoryEmoji";
import { useReadingStore } from "@/stores/useReadingStore";
import ReadingSpreadCount from "@/types/enums/readingSpread-count.enum copy";
import ReadingSpreadKr from "@/types/enums/readingSpread-kr.enum";
import { READING_POSITION } from "@/utils/readingPosition";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function ReadingCategory() {
  const navigate = useNavigate();
  const params = useParams();
  const type = params.type;
  const typeEn = params.type?.toUpperCase();

  const spread = "THREE" as const;
  const spreadType = ReadingSpreadKr[spread];
  const spreadCount = ReadingSpreadCount[spread];

  const [swiper, setSwiper] = useState<any>(null);

  type questionObj = {
    categoryId: number;
    category: string;
    questionText: string;
    spreadPosition: string[];
    spreadType: string;
    spreadCount: number;
  };
  const [questionInfo, setQuestionInfo] = useState<questionObj>({
    categoryId: 0,
    category: "",
    questionText: "",
    spreadPosition: [],
    spreadType: spreadType,
    spreadCount: spreadCount,
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const EMOJI_LIST = {
    love: ["💗", "❤️‍🔥", "💓", "💘", "💔", "❤️‍🩹", "💍"],
    money: ["💰", "📈", "📋", "💎", "🛒"],
    job: ["💻", "📨", "🔄", "❎", "📑", "🦄"],
    study: ["📚", "📝", "🎯", "🤹‍♀️", "💡", "📉"],
    life: ["🌿", "💪", "🎭", "🏝"],
    human: ["🏡", "🦋", "🗣", "⚡️"],
  } as const;

  // 카테고리, 질문리스트 스토어에서 가져오기
  const {
    categories,
    questions,
    loadingCategories,
    loadingQuestions,
    getQuestionsByCategoryId,
  } = useReadingStore();

  const isLoading =
    loadingCategories ||
    loadingQuestions ||
    categories.length === 0 ||
    questions.length === 0;

  // params랑 일치하는 카테고리 제목 찾기
  const currentTypeKr = useMemo(() => {
    if (!typeEn) return "";
    const found = categories.find((c) => c.typeEn === typeEn);
    return found ? String(found.typeKr) : "";
  }, [categories, typeEn]);

  // 현재 타입의 카테고리 리스트 (질문 포함)
  const categoryList: ReadingCategoryResponseDTO[] = useMemo(() => {
    if (!typeEn) return [];
    return categories.filter((c) => c.typeEn === typeEn);
  }, [categories, typeEn]);

  type QuestionRequest = Record<string, { message: string }>;
  const [questionMessage, setQuestionMessage] = useState<QuestionRequest>({});
  const [openQuestionMap, setOpenQuestionMap] = useState<
    Record<number, boolean>
  >({});

  const requestToPick = (questionInfo: questionObj) => {
    console.log(questionInfo);
    const {
      categoryId,
      category,
      questionText,
      spreadPosition,
      spreadType,
      spreadCount,
    } = questionInfo;
    navigate("/reading/pick", {
      state: {
        categoryId,
        category,
        questionText,
        spreadPosition,
        spreadType,
        spreadCount,
      },
    });
  };

  const hashCategoryId = useMemo(() => {
    const raw = (window.location.hash || "").replace("#", "");
    const m = raw.match(/^cat-(\d+)$/);
    return m ? Number(m[1]) : null;
  }, [params.type]);

  // hashId에 해당하는 slide index 찾기
  const hashIndex = useMemo(() => {
    if (!hashCategoryId) return -1;
    return categoryList.findIndex((c) => c.id === hashCategoryId);
  }, [categoryList, hashCategoryId]);

  useEffect(() => {
    if (!swiper) return;
    if (isLoading) return;
    if (hashIndex < 0) return;

    swiper.slideToLoop(hashIndex, 0);
  }, [swiper, isLoading, hashIndex]);

  // 질문 리스트에서 질문 선택
  const handleQuestionSelectSubmit = (
    categoryId: number,
    category: string,
    questionText: string
  ) => {
    setQuestionInfo((prev) => ({
      ...prev,
      categoryId,
      category,
      questionText,
    }));
    setDialogOpen(true);
  };

  // 다른 질문 버튼 클릭
  const handleOpenQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    const num = Number(e.currentTarget.dataset.num);
    if (Number.isNaN(num)) return;

    setOpenQuestionMap({ [num]: true }); // 해당 id 인풋만 열기
    setQuestionMessage({ [num]: { message: "" } });
  };

  // 다른 질문 input onChange
  const handleOnChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setQuestionMessage((prev) => ({
      ...prev,
      [id]: { message: value },
    }));
  };

  // 다른 질문 input onKeydown, 엔터키로 전송
  const handleOnKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryId: number,
    category: string
  ) => {
    if (e.key === "Enter") {
      handleQuestionInputSubmit(categoryId, category);
    }
  };

  // 다른 질문 버튼으로 전송
  const handleQuestionInputSubmit = (categoryId: number, category: string) => {
    const key = String(categoryId);
    const message = questionMessage[key]?.message;
    if (!message) return;
    setQuestionInfo((prev) => ({
      ...prev,
      categoryId,
      category,
      questionText: message,
    }));
    setDialogOpen(true);
  };

  // 설명 줄바꿈 처리
  function replaceDotWithEnter(text: string) {
    return text.replace(/\. /g, ".\n");
  }

  return (
    <div className="ReadingType">
      <section className="px-4 py-6 sm:py-8">
        {isLoading ? (
          <SkeletonPageTitle />
        ) : (
          <PageTitle
            title={
              <div className="flex gap-1 items-center">
                <span className="tossface text-xl animate-bounce">
                  {CATEGORY_EMOJI(typeEn ?? "")}
                </span>
                {currentTypeKr}운
              </div>
            }
            subtitle={
              <p>궁금한 질문을 선택하거나 입력하면 운세를 볼 수 있어요</p>
            }
          />
        )}
      </section>
      <section>
        <Swiper
          key={params.type}
          onSwiper={setSwiper}
          pagination={{
            el: ".askSwiper-pagination",
            clickable: true,
          }}
          navigation={{
            prevEl: ".mySwiper-prev",
            nextEl: ".mySwiper-next",
          }}
          autoHeight={true}
          loop={true}
          mousewheel={true}
          modules={[Pagination, Navigation, Mousewheel]}
          slidesPerView={"auto"}
          className="askSwiper group"
        >
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <SkeletonMySwiperCard />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {categoryList.map((c) => {
                const categoryQuestions: ReadingQuestionResponseDTO[] =
                  getQuestionsByCategoryId(c.id);

                return (
                  <SwiperSlide key={c.id}>
                    <Card className="h-auto sm:h-full gap-3 bg-violet-50 border-violet-100 cursor-grab active:cursor-grabbing">
                      <CardHeader className="sm:flex-1 sm:grid-rows-none text-lg">
                        <CardTitle>
                          <a id={`cat-${c.id}`} />
                          <span className="tossface">
                            {EMOJI_LIST[type as keyof typeof EMOJI_LIST]?.[
                              c.sortOrder - 1
                            ] ?? ""}
                          </span>{" "}
                          <span>{c.category}</span>
                        </CardTitle>
                        <CardDescription className="whitespace-pre-line sm:flex-1">
                          {replaceDotWithEnter(c.description)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="flex flex-col gap-2 items-stretch">
                          {categoryQuestions.map((q, index) => (
                            <li
                              key={index}
                              className="w-full"
                              onClick={() =>
                                handleQuestionSelectSubmit(
                                  c.id,
                                  c.category,
                                  q.questionText
                                )
                              }
                            >
                              <div className="ff_kyobo w-full inline-flex items-center justify-center gap-2 whitespace-wrap text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 py-2 min-h-12 rounded-md px-3 md:px-4 has-[>svg]:px-4">
                                {q.questionText}
                              </div>
                            </li>
                          ))}
                          <li className="mt-1">
                            {!openQuestionMap[c.id] && (
                              <Button
                                size="lg"
                                className="w-full h-12  bg-violet-700"
                                data-num={c.id}
                                onClick={handleOpenQuestion}
                              >
                                다른 질문 하기
                              </Button>
                            )}
                            {openQuestionMap[c.id] && (
                              <div
                                className="flex gap-1.5 items-center"
                                id={`question-${c.id}`}
                              >
                                <Input
                                  type="text"
                                  className="h-12 bg-background text-base ff_kyobo"
                                  placeholder={`${c.category} 상황에서 내가 궁금한 점은...`}
                                  value={questionMessage[c.id]?.message ?? ""}
                                  id={String(c.id)}
                                  autoComplete="off"
                                  onChange={handleOnChangeQuestion}
                                  onKeyDown={(e) =>
                                    handleOnKeydown(e, c.id, c.category)
                                  }
                                />
                                <Button
                                  onClick={() =>
                                    handleQuestionInputSubmit(c.id, c.category)
                                  }
                                  className="h-12"
                                >
                                  확인
                                </Button>
                              </div>
                            )}
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                );
              })}
            </>
          )}
          <div className="mySwiper-prev opacity-0 group-hover:opacity-100 transition-all">
            <ChevronLeft className="me-0.5" />
          </div>
          <div className="mySwiper-next opacity-0 group-hover:opacity-100 transition-all">
            <ChevronRight className="ms-0.5" />
          </div>
        </Swiper>
        <div className="pagination py-4 sm:py-6">
          <div className="askSwiper-pagination flex justify-center items-center" />
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="pb-5">
            <DialogTitle className="text-lg leading-none font-semibold">
              어떤 상황으로 운세를 볼까요?
            </DialogTitle>
          </DialogHeader>
          <div>
            <ul>
              {Object.entries(READING_POSITION).map(([key, value]) => (
                <li key={key} className="not-last:mb-2">
                  <Button
                    onClick={() => {
                      const nextQuestionInfo = {
                        ...questionInfo,
                        spreadPosition: [...value],
                      };
                      setQuestionInfo(nextQuestionInfo);
                      requestToPick(nextQuestionInfo);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    {value.join(" - ")}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
              variant="secondary"
              className="w-full"
            >
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReadingCategory;
