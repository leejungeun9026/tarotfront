import kakao from "../assets/loginIcon/icon_kakao.png"
import naver from "../assets/loginIcon/icon_naver.png"
import google from "../assets/loginIcon/icon_google.png"

export const getLoginIcon = (type: string) => {
  switch (type) {
    case "kakao":
      return <img src={kakao} alt="kakao_icon" className="size-4" />;
    case "naver":
      return <img src={naver} alt="naver_icon" className="size-4" />;
    case "google":
      return <img src={google} alt="google_icon" className="size-4" />;
    default: return;
  }
} 