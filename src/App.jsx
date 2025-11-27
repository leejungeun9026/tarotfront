import { Route, Routes } from "react-router-dom";
import BottomNav from "./components/layout/common/BottomNav";
import Home from "./pages/Home";
import ReadingMain from "./pages/reading/ReadingMain";
import Guide from "./pages/guide/Guide";
import ReadingShuffle from "./pages/reading/ReadingShuffle";

const minMaxHeight = {
  height: "calc(100vh - 67px)",
};

function App() {
  return (
    <div className="App m-auto min-w-xs max-w-3xl max-h-lvh h-full flex flex-col justify-start align-stretch ">
      <div className="container py-4 px-3 overflow-y-auto" style={minMaxHeight}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/reading" element={<ReadingMain />} />
          <Route path="/reading/shuffle" element={<ReadingShuffle />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
