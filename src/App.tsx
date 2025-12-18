import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AuthWatcher from "./components/common/AuthWatcher";
import BottomNav from "./components/common/BottomNav";
import GlobalAlertDialog from "./components/common/GlobalAlertDialog";
import ScrollToTop from "./components/common/ScrollToTop";
import TopNav from "./components/common/TopNav";
import { Toaster } from "./components/ui/sonner";
import { bottomNavHeight } from "./constants/appHeight";
import AuthGuard from "./guards/AuthGuard";
import Home from "./pages/Home";
import Archive from "./pages/archive/Archive";
import AuthBootstrap from "./pages/auth/AuthBootstrap";
import Join from "./pages/auth/Join";
import Login from "./pages/auth/Login";
import MyPage from "./pages/auth/MyPage";
import OAuth from "./pages/auth/OAuth";
import OAuthError from "./pages/auth/OAuthError";
import NotFound from "./pages/error/NotFound";
import UnAuthorized from "./pages/error/UnAuthorized";
import GuideCard from "./pages/guide/GuideCard";
import GuideHowTo from "./pages/guide/GuideHowTo";
import GuideInfo from "./pages/guide/GuideInfo";
import GuideLayout from "./pages/guide/GuideLayout";
import GuideTerm from "./pages/guide/GuideTerm";
import ReadingCategory from "./pages/reading/ReadingCategory";
import ReadingLayout from "./pages/reading/ReadingLayout";
import ReadingPick from "./pages/reading/ReadingPick";
import ReadingResult from "./pages/reading/ReadingResult";
import ReadingToday from "./pages/reading/ReadingToday";
import { useReadingStore } from "./stores/useReadingStore";
import { useTarotCardStore } from "./stores/useTarotCardStore";
import { useTermsStore } from "./stores/useTermsStore";
import { UserRole } from "./types/enums";

function App() {
  const { fetchCategories, fetchQuestions } = useReadingStore();
  const { fetchTerms } = useTermsStore();
  const { fetchCards } = useTarotCardStore();

  useEffect(() => {
    AOS.init();
  }, [])

  // 마스터 데이터 호출 (약관, 타로카드, 질문 등)
  useEffect(() => {
    void Promise.all([
      fetchCategories(),
      fetchQuestions(),
      fetchTerms(),
      fetchCards(),
    ]);
  }, [fetchCategories, fetchQuestions, fetchTerms, fetchCards]);

  return (
    <>
      <AuthBootstrap />
      <AuthWatcher />
      <div className="App m-auto w-full max-w-3xl h-dvh flex flex-col justify-start align-stretch overflow-hidden">
        <div
          className="wrap flex-1 w-full max-w-3xl h-auto flex flex-col justify-start align-stretch overflow-hidden"
          style={{ maxHeight: `calc(100dvh - ${bottomNavHeight}px)` }}
        >
          <TopNav />
          <div className="container w-full max-w-3xl flex-1 overflow-y-auto">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/guide" element={<GuideLayout />}>
                <Route index element={<Navigate to="info" replace />} />
                <Route path="info" element={<GuideInfo />} />
                <Route path="howto" element={<GuideHowTo />} />
                <Route path="tarotcard" element={<GuideCard />} />
                <Route path="term" element={<GuideTerm />} />
              </Route>
              <Route path="/reading" element={<ReadingLayout />}>
                <Route index element={<Navigate to="today" replace />} />
                <Route path="today" element={<ReadingToday />} />
                <Route path=":type" element={<ReadingCategory />} />
              </Route>
              <Route path="/reading/pick" element={
                <AuthGuard roles={[UserRole.ADMIN, UserRole.USER]}>
                  <ReadingPick />
                </AuthGuard>
              } />
              <Route path="/reading/result/:uuid" element={<ReadingResult />} />
              <Route
                path="/archive"
                element={
                  <AuthGuard roles={[UserRole.ADMIN, UserRole.USER]}>
                    <Archive />
                  </AuthGuard>
                }
              />
              <Route
                path="/mypage"
                element={
                  <AuthGuard roles={[UserRole.ADMIN, UserRole.USER]}>
                    <MyPage />
                  </AuthGuard>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/auth/oauth-response" element={<OAuth />} />
              <Route path="/auth/oauth-error" element={<OAuthError />} />
              <Route path="/401" element={<UnAuthorized />} />
              <Route path="/403" element={<UnAuthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <BottomNav />
        <Toaster position="top-center" />
        <GlobalAlertDialog />
      </div>
    </>
  );
}

export default App;
