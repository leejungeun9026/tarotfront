import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { readingCategoryListByTypeRequest } from '@/apis';
import type { ReadingCategoryBase, ReadingQuestionBase } from '@/apis/response/reading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ReadingTypeKr, type ReadingTypeEn } from '@/types/enums';
import { getCategoryImg } from '@/utils/imageMapper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ReadingCategory() {
  const params = useParams();
  const type = params.type;
  const typeEn = params.type?.toUpperCase() as ReadingTypeEn;
  const typeKr = ReadingTypeKr[typeEn];
  const [categoryList, setCategoryList] = useState<ReadingCategoryBase[]>([]);
  const [questionList, setQuestionList] = useState<ReadingQuestionBase[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const EMOJI_LIST = {
    love: ["💗", "💞", "💓", "💘", "💔", "🙏", "💍"],
    money: ["💰", "📈", "📋", "💎", "🛒"],
    job: ["💻", "📨", "🔄", "❎", "📑", "🦄"],
    study: ["📚", "📝", "🎯", "🤹‍♀️", "💡", "📉"],
    life: ["🌿", "💪", "🎭", "🏝"],
    human: ["🏡", "🦋", "🗣", "⚡️"]
  }

  useEffect(() => {
    if (!typeEn) return;
    readingCategoryListByTypeRequest(typeEn)
      .then(responseBody => {
        const category = responseBody.readingCategoryList;
        setCategoryList(category);

        const allQuestions = category.flatMap(c => c.readingQuestionList ?? []);
        setQuestionList(allQuestions);

        setLoading(true)
      })
  }, [typeEn])

  return (
    <div className='ReadingType'>
      <section className='pageTitle px-4 py-6'>
        {!loading &&
          <div className="flex gap-2 items-center">
            <Skeleton className="size-7 sm:size-8" />
            <Skeleton className="w-20 h-7" />
          </div>
        }
        <div className="flex gap-2 items-center">
          <img src={getCategoryImg(params?.type ? params.type : undefined)} className="size-7 sm:size-8 animate-bounce" />
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {typeKr}운
          </h3>
        </div>
        <p className='mt-2 text-neutral-600 text-sm'>상황별 운세나 질문을 클릭하면 타로점을 볼 수 있어요.</p>
      </section>
      <section>
        <Swiper
          pagination={{
            el: ".askSwiper-pagination",
            clickable: true,
          }}
          navigation={{
            prevEl: ".mySwiper-prev",
            nextEl: ".mySwiper-next",
          }}
          loop={true}
          modules={[Pagination, Navigation]}
          slidesPerView={"auto"}
          className="askSwiper pl-3 group"
        >
          {categoryList.map(c => {
            function replaceDotWithEnter(text: string) {
              return text.replace(/\. /g, '.\n');
            }
            return (
              <SwiperSlide key={c.id}>
                <Card className='h-full bg-violet-50 border-violet-100 cursor-grab active:cursor-grabbing'>
                  <CardHeader className='flex-1'>
                    <CardTitle>
                      <span className='tossface'>{EMOJI_LIST[type as keyof typeof EMOJI_LIST]?.[c.sortOrder - 1] ?? ""}</span>{" "}
                      <span>{c.category}</span>
                    </CardTitle>
                    <CardDescription className='whitespace-pre-line flex-1'>{replaceDotWithEnter(c.description)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className='flex flex-col gap-3 items-stretch'>
                      {questionList
                        .filter((q) => c.id === q.readingCategoryId)
                        .map((q, index) => (
                          <li key={index} className='w-full'>
                            <div className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[>svg]:px-4">
                              {q.questionText}
                            </div>
                          </li>
                        ))}
                      <li>
                        <Button variant="outline" size="lg">
                          다른 질문 하기
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </SwiperSlide>
            )
          })}
          <div className="mySwiper-prev opacity-0 group-hover:opacity-100 transition-all">
            <ChevronLeft className='me-0.5' />
          </div>
          <div className="mySwiper-next opacity-0 group-hover:opacity-100 transition-all">
            <ChevronRight className='ms-0.5' />
          </div >
        </Swiper>
        <div className="askSwiper-pagination my-4 h-4 flex justify-center items-center" />
      </section >
    </div >
  )
}

export default ReadingCategory