import { Route, Routes } from "react-router-dom"
import BottomNav from "./components/common/BottomNav"
import GlobalAlertDialog from "./components/common/GlobalAlertDialog"
import TopNav from "./components/common/TopNav"
import { Toaster } from "./components/ui/sonner"
import { containerHeight } from "./constants/appHeight"
import AuthGuard from "./guards/AuthGuard"
import Home from "./pages/Home"
import Join from "./pages/auth/Join"
import Login from "./pages/auth/Login"
import MyPage from "./pages/user/MyPage"
import { Role } from "./types/role"

function App() {
  return (
    <div className="App m-auto min-w-xs max-w-3xl max-h-lvh h-full flex flex-col justify-start align-stretch overflow-hidden">
      <TopNav />
      <div className="container max-w-3xl overflow-y-auto" style={containerHeight}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={
            <AuthGuard roles={[Role.ADMIN, Role.USER]}>
              <MyPage />
            </AuthGuard>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </div>
      <BottomNav />

      <GlobalAlertDialog />
      <Toaster position="bottom-center" />
    </div>
  )
}

export default App