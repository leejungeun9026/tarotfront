import { useRef, useState } from "react";
import CardItem from "./CardItem";

function CardDeck({ shuffle, spread, progress, angle, setAngle }) {
  const TOTAL = 78;
  const deck = Array.from({ length: TOTAL }, (_, i) => i + 1);

  const RADIUS = 614.3;   // 마지막 카드 반지름 위치
  const START_DEG = -90;  // 아래 방향
  const END_DEG = 0;      // 오른쪽 방향

  const START_RAD = (START_DEG * Math.PI) / 180;
  const END_RAD = (END_DEG * Math.PI) / 180;


  // 드래그 상태
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);

  const baseAngle = spread ? 45 : 0;
  const totalAngle = baseAngle + angle;

  // 드래그 이벤트
  const onMouseDown = (e) => {
    if (!spread) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartAngle.current = angle;
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;

    const diff = e.clientX - dragStartX.current;

    const newAngle = dragStartAngle.current + diff * -0.1;

    const clamped = Math.max(-20, Math.min(20, newAngle)); // ±20도 안으로 제한
    setAngle(clamped);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onTouchStart = (e) => {
    if (!spread) return;
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartAngle.current = angle;
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;

    const diff = e.touches[0].clientX - dragStartX.current;
    const newAngle = dragStartAngle.current + diff * -0.1;
    const clamped = Math.max(-20, Math.min(20, newAngle));
    setAngle(clamped);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={[
        "card_deck",
        shuffle ? "shuffle" : "stacked",
        spread ? "spread" : ""
      ].join(" ")}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: `rotate(${totalAngle}deg)`,
        transition: isDragging
          ? "none"
          : "transform 0.6s ease-out", // 펼치기 눌렀을 때 0 → 45 부드럽게
        cursor: spread ? (isDragging ? "grabbing" : "grab") : "default"
      }}
    >
      {deck.map((num, index) => {
        const targetIndex = index < progress ? index : progress;
        const t = targetIndex / (TOTAL - 1);

        // 1) 각도: 90deg → 0deg 를 균일하게 나눔
        const angle = START_RAD + (END_RAD - START_RAD) * t;

        // 2) 원호에서의 위치를 "시작점 기준 offset"으로 변환
        const moveX =
          RADIUS * (Math.cos(angle) - Math.cos(START_RAD)); // 0 → +614.3
        const moveY =
          -RADIUS * (Math.sin(angle) - Math.sin(START_RAD)); // 0 → -614.3

        // 3) 회전: 0deg → -90deg 균일하게
        const rotate = -90 * t;

        return (
          <div className='card_wrap' key={num}
            style={{
              transform: `
                translateX(${moveX}px)
                translateY(${moveY}px)
                rotate(${rotate}deg)
              `,
              transition: "transform 0.02s ease-in-out",
            }} >
            <CardItem num={num} />
          </div>)
      })}
    </div>
  );
}

export default CardDeck;
