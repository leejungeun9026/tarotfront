// ChatBubble.tsx
import type { ReactNode } from "react";

interface ChatBubbleProps {
  colorClass?: string;
  tail?: "left-bottom" | "right-bottom" | "left-top" | "right-top";
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export default function ChatBubble({
  colorClass = "bg-emerald-400",
  tail = "right-bottom",
  className = "",
  contentClassName = "",
  children,
}: ChatBubbleProps) {
  // 배경 → 텍스트 자동 변환
  const effectiveColorClass = colorClass.startsWith("bg-")
    ? colorClass.replace(/^bg-/, "text-")
    : colorClass;

  /**
   * 꼬리 위치 + transform 조합 설정
   */
  const tailMap: Record<
    ChatBubbleProps["tail"],
    { position: string; transform: string }
  > = {
    "left-bottom": {
      position: "absolute -left-[3px] bottom-0",
      transform: "scaleX(-1)", // 좌측
    },
    "right-bottom": {
      position: "absolute -right-[3px] bottom-0",
      transform: "", // 기본 오른쪽
    },
    "left-top": {
      position: "absolute -left-[3px] top-0",
      transform: "scaleX(-1) scaleY(-1)", // 좌+상
    },
    "right-top": {
      position: "absolute -right-[3px] top-0",
      transform: "scaleY(-1)", // 우+상
    },
  };

  const { position: tailPositionClass, transform: tailTransform } =
    tailMap[tail];

  return (
    <div
      className={[
        "relative inline-block rounded-3xl bg-current",
        effectiveColorClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 말풍선 내용 */}
      <div className={["relative z-10", contentClassName].join(" ")}>
        {children}
      </div>

      {/* 말꼬리 */}
      <svg
        viewBox="0 0 24 24"
        className={["h-6 w-6 fill-current", tailPositionClass].join(" ")}
        aria-hidden="true"
        style={{ transform: tailTransform }}
      >
        <path d="M20.7,14.6V0H12v12.7c0,1.9,0.5,3.6,1.3,5.2c1.9,3.7,5.7,6.2,10.1,6.2H24C24,24,20.7,22.3,20.7,14.6z" />
      </svg>
    </div>
  );
}
