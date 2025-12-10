import { readingCategoryListRequest } from "@/apis";
import type { ReadingCategoryBase } from "@/apis/response/reading";
import SpeechBubble from "@/components/bubble/Bubble";
import CardItem from "@/components/tarotcard/CardItem";
import { READING_CATEGORY_CONST } from "@/constants/readingCategory";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import "../styles/home.css";
import "../styles/tarotcard.css";

import { getCategoryImg } from "@/utils/imageMapper";
import starsLottie from "../assets/lottie/stars.json";

function Home() {
  const navigate = useNavigate();
  const categoryList = READING_CATEGORY_CONST;
  const [readingCategory, setReadingCategory] =
    useState<ReadingCategoryBase[]>(categoryList);
  const uniqueTypes = [
    ...new Map(readingCategory.map((item) => [item.typeEn, item])).values(),
  ].map((item) => ({
    id: item.id,
    typeEn: item.typeEn,
    typeKr: item.typeKr,
  }));

  useEffect(() => {
    readingCategoryListRequest().then((responseData) => {
      const { readingCategoryList } = responseData;
      setReadingCategory(readingCategoryList);
    });
  }, []);

  return (
    <div className="Home divide-gray-100 divide-y-10">
      <section className="todayReading px-4 pt-2.5 pb-6 border-0">
        <SpeechBubble
          fullWidth
          side="top"
          pointerSize={12}
          tailPosition={34}
          bubbleClassName="rounded-xl bg-[#e0d0fe]"
          childClassName="rounded-xl bg_gradient"
        >
          <Card className="w-full py-0 border-0 overflow-hidden bg-transparent">
            <CardContent className="py-6 text-center relative">
              <div className="relative z-9">
                <h2 className="ff_kyobo text-xl font-medium tracking-tight text-balance text-center">
                  나의 오늘 운세는 어떨까?
                </h2>
                <div className="card_container relative w-full h-58">
                  <div className="card_bounce">
                    <div className="card_wrap ">
                      <CardItem card={{ type: "back", id: null }} />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/reading")}
                  className="cursor-pointer"
                >
                  오늘의 운세 보러가기
                </Button>
              </div>
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
        </SpeechBubble>
      </section>
      <section className="readingType px-4 py-6">
        <div className="section_title pb-4">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            운세 보기
          </h4>
        </div>
        <div className="section_content">
          <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 gap-3">
            {uniqueTypes.map((category) => {
              const textLow = category.typeEn.toLowerCase();
              return (
                <Link to={`/reading/${textLow}`} key={category.id}>
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
        </div>
      </section>
      <section className="askList px-4 py-6">
        <div className="section_title pb-4">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            타로 정보
          </h4>
        </div>
        <div className="section_content"></div>
      </section>
    </div>
  );
}

export default Home;
