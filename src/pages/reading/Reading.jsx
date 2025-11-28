import { useState } from "react";
import { Button } from "../../components/ui/button";
import CardDeck from "../../components/ui/tarotcard/CardDeck";
import "../../styles/tarotcard.css";

function Reading() {
  const [shuffle, setShuffle] = useState(false);
  const [spread, setSpread] = useState(false);
  const [progress, setProgress] = useState(0);
  const [angle, setAngle] = useState(0);
  const [btnShuffleHidden, setBtnShuffleHidden] = useState(false);
  const [btnSpreadHidden, setBtnSpreadHidden] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const TOTAL = 78;

  const handleShuffle = () => {
    setShuffle(true);
    setIsDisabled(true);

    setTimeout(() => {
      setShuffle(false);
      setIsDisabled(false);
    }, 2000)
  }

  const handleSpread = () => {
    setBtnShuffleHidden(true)
    setBtnSpreadHidden(true)

    setSpread(true)
    setProgress(0)
    setAngle(0)
    let i = 0;
    const interval = setInterval(() => {
      setProgress(i);
      i++;

      if (i >= TOTAL) clearInterval(interval);
    }, 5); // 카드 하나당 35ms씩 움직임 (자연스러움)
  }

  return (
    <div className="Reading">
      <h2>오늘의 운세</h2>
      <section className="card_section">
        <CardDeck shuffle={shuffle} spread={spread} progress={progress} angle={angle} setAngle={setAngle} />
      </section>
      <div className="flex gap-2 ">
        <Button className={btnShuffleHidden ? "hidden" : ""} onClick={handleShuffle}>카드 섞기</Button>
        <Button className={btnSpreadHidden ? "hidden" : ""} disabled={isDisabled} onClick={handleSpread}>펼치기</Button>
      </div>
    </div>
  );
}

export default Reading;