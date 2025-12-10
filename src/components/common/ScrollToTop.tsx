import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // 실제로 스크롤되는 요소 찾기
    const container = document.querySelector(".container");

    if (container instanceof HTMLElement) {
      container.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // "smooth"도 가능
      });
    } else {
      // 혹시나 컨테이너 못 찾으면 window라도 올리기
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);
  return null;
}
