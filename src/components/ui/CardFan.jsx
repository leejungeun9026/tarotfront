import { useState } from 'react';
import CardItem from '../ui/CardItem';

function CardFan() {
  const TOTAL = 78;
  const cards = [];
  for (let i = 0; i < TOTAL; i++) {
    cards.push(i)
  }
  const WRAP_WIDTH = 400;
  const WRAP_HEIGHT = 400;

  const GAP_X = 5;              // 좌우 간격
  const CURVE_STRENGTH = 2;     // 곡선 강도
  const ROT_STEP = 1.2;         // 카드 기울기

  const centerIndex = (TOTAL - 1) / 2;  // 카드 중심
  const baseTop = WRAP_HEIGHT;          // 카드 Y 위치

  const [angle, setAngle] = useState(0);

  return (
    <div>
      <div className="card_wrap"
        style={{
          position: "relative",
          width: WRAP_WIDTH,
          height: WRAP_HEIGHT,
          margin: "0 auto",
        }}>
        {
          cards.map((num, index) => {
            const offset = index - centerIndex;
            const moveX = offset * GAP_X;
            // 곡선: offset을 정규화한 다음 제곱으로 사용
            const normalized = Math.abs(offset) / centerIndex; // 0 ~ 1
            const moveY = -(normalized * normalized) * (centerIndex * CURVE_STRENGTH);
            // → 가운데(0)에선 거의 0, 양끝(1)에선 -centerIndex*CURVE_STRENGTH만큼 올라감

            // 카드 기울기
            const rotate = offset * -ROT_STEP;

            return (
              <CardItem
                key={num}
                style={{
                  position: "absolute",
                  top: baseTop + moveY + "px",
                  left: "50%",
                  transform: `
                  translateX(-50%)
                  translateX(${moveX}px)
                  rotate(${rotate}deg)
                `,
                  zIndex: 100 + index,
                }}
              />
            );
          })}
      </div>
    </div >
  )
}

export default CardFan