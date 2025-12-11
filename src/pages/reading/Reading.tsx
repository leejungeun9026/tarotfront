import { useLocation } from "react-router-dom";
import ReadingPick from "./ReadingPick";
import ReadingResult from "./ReadingResult";

export default function Reading() {
  const { state } = useLocation();

  if (state?.screen === "pick") {
    return (
      <ReadingPick
        categoryId={state.categoryId}
        category={state.category}
        question={state.question}
        spreadType={state.spreadType}
        spreadCount={state.spreadCount}
      />
    );
  }

  if (state?.screen === "result") {
    return <ReadingResult questions={state.questions} result={state.result} />;
  }

  return (
    <div className="Reading">
      <h2>전체 목차</h2>
    </div>
  );
}
