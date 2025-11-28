import { Route, Routes } from "react-router-dom";
import BottomNav from "./components/layout/common/BottomNav";
import Guide from "./pages/guide/Guide";
import Home from "./pages/Home";
import Reading from "./pages/reading/Reading";

const minMaxHeight = {
  height: "calc(100vh - 67px)",
};

function App() {
  return (
    <div className="App m-auto min-w-xs max-w-3xl max-h-lvh h-full flex flex-col justify-start align-stretch ">
      <div className="container py-4 px-3 max-w-3xl overflow-x-hidden overflow-y-auto" style={minMaxHeight}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/reading" element={<Reading />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
