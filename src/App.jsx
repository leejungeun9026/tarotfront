import { Route, Routes } from "react-router-dom";
import BottomNav from "./components/layout/BottomNav";
import Home from "./pages/Home";
import Today from "./pages/reading/Today";

function App() {
  return (
    <div className="App m-auto min-w-xs max-w-3xl max-h-lvh h-full flex flex-col justify-start align-stretch ">
      <div className="overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reading" element={<Today />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
