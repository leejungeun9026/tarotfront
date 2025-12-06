import { useLayoutEffect, useRef, useState } from "react";
import CardItem from "./CardItem";

function CardDeck({
  cardList,
  shuffle,
  spread,
  progress,
  angle,
  setAngle,
  onCardClick,
}) {
  const total = cardList.length;

  const deckRef = useRef(null);
  const cardRef = useRef(null);

  // 실제 DOM 사이즈를 저장할 상태값
  const [deckWidth, setDeckWidth] = useState(1400); // 기본값
  const [cardWidth, setCardWidth] = useState(100); // 기본값
  function calcHeight(width: number) {
    const ratioW = 7;
    const ratioH = 12;
    return (width * ratioH) / ratioW;
  }

  // window resize 감지
  useLayoutEffect(() => {
    const updateSize = () => {
      if (!deckRef.current || !cardRef.current) return;

      const deckW = deckRef.current.offsetWidth;
      const cardW = cardRef.current.offsetWidth;

      setDeckWidth(deckW);
      setCardWidth(cardW);
    };

    // 카드가 생긴 시점 / 마운트 시점마다 측정
    updateSize();

    // 리사이즈 리스너는 여기서 한 번만 등록
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
    // ✅ 카드 개수가 바뀔 때만 다시 실행
  }, [cardList.length]);

  const RADIUS = deckWidth / 2 - calcHeight(cardWidth) / 2; // 마지막 카드 반지름 위치 (deck 가로길이 반 - 카드 세로길이 반)
  const START_DEG = -90;
  const END_DEG = 0;
  const START_RAD = (START_DEG * Math.PI) / 180;
  const END_RAD = (END_DEG * Math.PI) / 180;

  const isInCardArea = (clientX, clientY) => {
    if (!deckRef.current) return false;

    const rect = deckRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.hypot(dx, dy); // 중심으로부터 거리

    const cardHeight = calcHeight(cardWidth);

    // 1) 윗부분(덱 중심 위쪽)은 드래그 금지
    //    => 카드 팬은 아래쪽에만 있으니까, 중심보다 어느 정도 아래에서만 허용
    if (dy < cardHeight * 0.2) {
      // centerY 기준으로 너무 위쪽이면 false
      return false;
    }

    // 2) 반지름 근처(카드가 깔린 원호 주변)에서만 허용
    const minR = RADIUS - cardHeight * 0.5;
    const maxR = RADIUS + cardHeight * 0.5;

    return dist >= minR && dist <= maxR;
  };

  // 드래그 상태
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);

  const [cursor, setCursor] = useState("default");

  const baseAngle = spread ? 45 : 0;
  const totalAngle = baseAngle + angle;

  // 드래그 이벤트
  const onMouseDown = (e) => {
    if (!spread) return;
    if (!isInCardArea(e.clientX, e.clientY)) return;
    setIsDragging(true);
    setDragMoved(false);
    dragStartX.current = e.clientX;
    dragStartAngle.current = angle;
  };

  const onMouseMove = (e) => {
    if (spread) {
      if (isInCardArea(e.clientX, e.clientY)) {
        setCursor("pointer");
      } else {
        setCursor("default");
      }
    } else {
      setCursor("default");
    }

    if (!isDragging) return;

    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 2) {
      setDragMoved(true);
    }
    const newAngle = dragStartAngle.current + diff * -0.1;
    const clamped = Math.max(-45, Math.min(45, newAngle));
    setAngle(clamped);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };
  const onMouseLeave = () => {
    setIsDragging(false);
    setCursor("default");
  };

  // 모바일 터치 대응
  const onTouchStart = (e) => {
    if (!spread) return;
    const touch = e.touches[0];
    if (!isInCardArea(touch.clientX, touch.clientY)) return;
    setIsDragging(true);
    setDragMoved(false);
    dragStartX.current = e.touches[0].clientX;
    dragStartAngle.current = angle;
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;

    const diff = e.touches[0].clientX - dragStartX.current;
    if (Math.abs(diff) > 2) {
      setDragMoved(true);
    }
    const newAngle = dragStartAngle.current + diff * -0.1;
    const clamped = Math.max(-45, Math.min(45, newAngle));
    setAngle(clamped);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={deckRef}
      className={[
        "card_deck",
        shuffle ? "shuffle" : "stacked",
        spread ? "spread" : "",
      ].join(" ")}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: `rotate(${totalAngle}deg)`,
        transition: isDragging ? "none" : "transform 0.6s ease-out", // 펼치기 눌렀을 때 0 → 45 부드럽게
        cursor: spread ? (isDragging ? "grabbing" : cursor) : "default",
      }}
    >
      {cardList.map((card, index) => {
        const targetIndex = index < progress ? index : progress;
        const t = targetIndex / (total - 1);

        // 1) 각도: 90deg → 0deg 를 균일하게 나눔
        const angle = START_RAD + (END_RAD - START_RAD) * t;

        // 2) 원호에서의 위치를 "시작점 기준 offset"으로 변환
        const moveX = RADIUS * (Math.cos(angle) - Math.cos(START_RAD)); // 0 → +614.3
        const moveY = -RADIUS * (Math.sin(angle) - Math.sin(START_RAD)); // 0 → -614.3

        // 3) 회전: 0deg → -90deg 균일하게
        const rotate = -90 * t;
        return (
          <div
            ref={cardRef}
            className={["card_wrap", `${card.isSelected ? "active" : ""}`].join(
              " "
            )}
            key={card.id}
            style={{
              transform: `
                translate3d(${moveX}px, ${moveY}px, 0) 
                rotate(${rotate}deg)`,
              transition: "transform 0.05s ease-in-out",
            }}
            onClick={() => {
              if (isDragging || dragMoved) return;
              onCardClick(card);
            }}
          >
            <CardItem card={card} />
          </div>
        );
      })}
    </div>
  );
}

export default CardDeck;
