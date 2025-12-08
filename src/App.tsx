import { Route, Routes } from "react-router-dom";
import BottomNav from "./components/common/BottomNav";
import GlobalAlertDialog from "./components/common/GlobalAlertDialog";
import TopNav from "./components/common/TopNav";
import { Toaster } from "./components/ui/sonner";
import { containerHeight } from "./constants/appHeight";
import AuthGuard from "./guards/AuthGuard";
import Home from "./pages/Home";
import Archive from "./pages/archive/Archive";
import Join from "./pages/auth/Join";
import Login from "./pages/auth/Login";
import OAuth from "./pages/auth/OAuth";
import Reading from "./pages/reading/Reading";
import MyPage from "./pages/user/MyPage";
import { Role } from "./types/role";
import { UserRole } from "./types/enums";

function App() {
  return (
    <div className="App m-auto min-w-xs max-w-3xl max-h-lvh h-full flex flex-col justify-start align-stretch overflow-hidden">
      <TopNav />
      <div
        className="container max-w-3xl overflow-x-hidden overflow-y-auto"
        style={containerHeight}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reading" element={<Reading />} />

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
      <BottomNav />

      <GlobalAlertDialog />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
