import { Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BottomNav from "./components/common/BottomNav";
import GlobalAlertDialog from "./components/common/GlobalAlertDialog";
import TopNav from "./components/common/TopNav";
import { bottomNavHeight } from "./constants/appHeight";
import AuthGuard from "./guards/AuthGuard";
import Home from "./pages/Home";
import Archive from "./pages/archive/Archive";
import Join from "./pages/auth/Join";
import Login from "./pages/auth/Login";
import OAuth from "./pages/auth/OAuth";
import Reading from "./pages/reading/Reading";
import ReadingCategory from "./pages/reading/ReadingCategory";
import MyPage from "./pages/user/MyPage";
import { UserRole } from "./types/enums";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
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
            <Route path="/reading" element={<Reading />} />
            <Route path="/reading/:type" element={<ReadingCategory />} />
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
            <Route
              path="oauth-response/:token/:expirationTime"
              element={<OAuth />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </div>
      </div>
      <BottomNav />

      <GlobalAlertDialog />
    </div>
  );
}

export default App;
