import type { ReadingResultRequestDTO } from "@/apis/request/reading";
import type { ReadingCardWithImg } from "@/apis/response/tarotcard";
import CardItem from "@/components/tarotcard/CardItem";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { bottomNavHeight } from "@/constants/appHeight";
import numberToRoman from "@/utils/numberToRoman";
import { useEffect, useMemo, useState } from "react";


type Props = {
  request: ReadingResultRequestDTO;
  activeList: ReadingCardWithImg[];
  isResultReady: boolean;
  onFinish: () => void;
};

function LoadingScreen({ request, activeList, isResultReady, onFinish }: Props) {
  const { category, spreadCount } = request;

  const TOTAL_LOADING_TIME = 20000;
  const loadingMessage = useMemo(() => [
    `${category}운을 분석하고 올게요!`,
    "좋은 의미일까? 나쁜 의미일까?",
    "조언을 살짝 구해볼까요?",
    "거의 다 돼가요, 조금만 기다려주세요💜",
    "결과가 나온 것 같아요!"
  ], [category]);
  const [cardIdx, setCardIdx] = useState<number>(0);
  const [msgIdx, setMsgIdx] = useState<number>(0);
  const cardIntervalTime = TOTAL_LOADING_TIME / spreadCount;
  const progressSteps = [5, 38, 64, 88, 100];
  const [progressBar, setProgressBar] = useState(progressSteps[0]);

  // 선택 카드 미리보기 스텝
  useEffect(() => {
    const intervalCard = setInterval(() => {
      setCardIdx((prev) => (prev + 1) % spreadCount);
    }, cardIntervalTime);

    return () => clearInterval(intervalCard);
  }, [spreadCount, cardIntervalTime]);


  // 로딩 메세지 및 프로그레스 바
  useEffect(() => {
    // 시간 스텝 (메시지 기준으로 분배)
    const msgCount = loadingMessage.length;
    const timePerStep = TOTAL_LOADING_TIME / msgCount;
    const timers: number[] = [];

    for (let i = 0; i < msgCount; i++) {
      const time = timePerStep * i;
      timers.push(
        window.setTimeout(() => {
          setMsgIdx(i);

          const progressIndex = Math.min(i, progressSteps.length - 1);
          setProgressBar(progressSteps[progressIndex]);
        }, time)
      );
    }

    // 마지막에 99까지 끌어올리는 타이머
    timers.push(
      window.setTimeout(() => {
        setProgressBar(99);
      }, TOTAL_LOADING_TIME)
    );

    return () => timers.forEach(clearTimeout);
  }, [])

  // open ai 응답 준비되면 실행
  useEffect(() => {
    if (!isResultReady) return;

    // 100까지 확 채우기 (애니메이션 느낌 주고 싶으면 setInterval로 조금씩 올려도 됨)
    setMsgIdx(loadingMessage.length - 1);
    setProgressBar(99);

    const timer = window.setTimeout(() => {
      onFinish();
    }, 500); // 마지막 화면 잠깐 보여주고 이동 (0.5초 정도)

    return () => clearTimeout(timer);
  }, [isResultReady, onFinish, loadingMessage.length]);


  const viewIntervalCard = activeList[cardIdx];
  const viewIntervalMessage = loadingMessage[msgIdx];

  return (
    <div
      className="loadingScreen w-full max-w-3xl fixed z-999 left-1/2 top-0 -translate-x-1/2 flex justify-center items-center bg-violet-50" style={{ height: `calc(100vh - ${bottomNavHeight}px)` }}>
      <div className="absolute w-full max-w-3xl h-auto top-0 left-1/2 -translate-x-1/2">
        <Progress value={progressBar} className="w-full animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-8">
        <h5 className="text-xl font-bold tracking-tight text-violet-700">
          {viewIntervalMessage}
        </h5>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="ff_kyobo text-base">선택한 카드를 미리 살펴봐요</p>
          <div className="card_wrap show_card rounded-sm">
            <CardItem card={{ type: "front", id: viewIntervalCard.id, reverse: viewIntervalCard.reverse }} />
          </div>
          <Card className="py-3 rounded-md text-center">
            <CardContent className="px-3 text-sm">
              <p className="ff_roman text-sm">
                <span>
                  {viewIntervalCard.arcanaType}
                </span>
                {" "}
                <span>
                  {numberToRoman(viewIntervalCard.cardNumber)}
                </span>
              </p>
              <p className="font-semibold mb-2">
                {viewIntervalCard.nameEn} ({viewIntervalCard.nameKr})
                {viewIntervalCard.reverse ?
                  <span className="ms-2 inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-red-100 text-red-500">역방향
                  </span>
                  :
                  <span className="ms-2 inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-500">
                    정방향
                  </span>
                }
              </p>
              <p className="text-xs">
                {viewIntervalCard.keyword ? `${viewIntervalCard.reverseKeyword}` : `${viewIntervalCard.keyword}`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  );
}

export default LoadingScreen;
