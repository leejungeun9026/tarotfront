import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <h2 className="text-black text-3xl font-bold mb-3">서비스 이름</h2>
      <section>
        <Button onClick={() => navigate("/reading/shuffle")}>
          오늘의 운세
        </Button>
      </section>
      <section></section>
    </div>
  );
}

export default Home;
