import { bottomNavHeight, topNavHeight } from "@/constants/appHeight";
import { useEffect, useState } from "react";

const loadingStep = (type) => {
  return [
    {
      text: (
        <>
          {type}
          <br /> 분석해줄게!
        </>
      ),
      img: "",
    },
    {
      text: (
        <>
          어떤 해석이 나올지
          <br /> 궁금한데?
        </>
      ),
      img: "",
    },
    {
      text: (
        <>
          오?! 그렇구나..! <br /> 음~ 음~!
        </>
      ),
      img: "",
    },
    {
      text: (
        <>
          거의 다 돼가! <br /> 잠시만 기다려 줘
        </>
      ),
      img: "",
    },
  ];
};

function LoadingScreen({ type, activeList }) {
  const [loadingMessages] = useState(() => loadingStep(type));
  const [index, setIndex] = useState(0);
  const [viewLoadingMessage, setViewLoadingMessage] = useState(
    loadingMessages[0]
  );

  useEffect(() => {
    const intervalMessage = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
      setViewLoadingMessage(loadingMessages[index]);
    }, 2000);

    return () => {
      clearInterval(intervalMessage);
    };
  }, [loadingMessages, index]);

  return (
    <div
      className="loadingScreen w-3xl fixed left-1/2 -translate-x-1/2 flex justify-center items-center bg-violet-50"
      style={{ height: `calc(100vh - ${topNavHeight} - ${bottomNavHeight})` }}
    >
      <div className="img_wrap">{viewLoadingMessage.img}</div>
      <div className="text_wrap handwriting text-center text-lg">
        {viewLoadingMessage.text}
      </div>
    </div>
  );
}

export default LoadingScreen;
