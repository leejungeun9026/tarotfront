import styled from "@emotion/styled";
import React, {
  cloneElement,
  useEffect,
  useRef,
} from "react";
import type { ReactElement } from "react";

type Side = "top" | "right" | "bottom" | "left";
type Align = "left" | "center" | "right";

// children이 최소한 className을 props로 가질 거라고 가정
type BubbleChild = ReactElement<{ className?: string }>;

interface SpeechBubbleProps {
  side?: Side;
  align?: Align;
  pointerSize?: number;
  tailPosition?: number;
  fullWidth?: boolean;

  // Wrapper에만 적용할 className
  bubbleClassName?: string;

  // children(Card)에 추가로 넣고 싶은 className
  childClassName?: string;

  children: BubbleChild;
}

const Wrapper = styled.div<{
  side: Side;
  align: Align;
  pointerSize: number;
  tailPosition?: number;
  fullWidth?: boolean;
}>`
  position: relative;
  display: ${(p) => (p.fullWidth ? "block" : "inline-block")};
  width: ${(p) => (p.fullWidth ? "100%" : "auto")};

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    border-width: ${(p) => p.pointerSize}px;
  }

  ${(p) => {
    const { side, align, tailPosition } = p;

    const percentByAlign = (a: Align) =>
      a === "left" ? "25%" : a === "right" ? "75%" : "50%";

    // 공통: 꼬리 색은 CSS 변수로부터 가져옴
    const colorVar = "var(--bubble-color, transparent)";

    if (side === "top") {
      if (tailPosition == null) {
        return `
          &::before {
            top: 0;
            left: ${percentByAlign(align)};
            transform: translate(-50%, -100%);
            border-top-width: 0;
            border-bottom-color: ${colorVar};
          }
        `;
      } else {
        return `
          &::before {
            top: 0;
            left: ${tailPosition}px;
            transform: translate(0, -100%);
            border-top-width: 0;
            border-bottom-color: ${colorVar};
          }
        `;
      }
    }

    if (side === "bottom") {
      if (tailPosition == null) {
        return `
          &::before {
            bottom: 0;
            left: ${percentByAlign(align)};
            transform: translate(-50%, 100%);
            border-bottom-width: 0;
            border-top-color: ${colorVar};
          }
        `;
      } else {
        return `
          &::before {
            bottom: 0;
            left: ${tailPosition}px;
            transform: translate(0, 100%);
            border-bottom-width: 0;
            border-top-color: ${colorVar};
          }
        `;
      }
    }

    if (side === "right") {
      if (tailPosition == null) {
        return `
          &::before {
            right: 0;
            top: ${percentByAlign(align)};
            transform: translate(100%, -50%);
            border-right-width: 0;
            border-left-color: ${colorVar};
          }
        `;
      } else {
        return `
          &::before {
            right: 0;
            top: ${tailPosition}px;
            transform: translate(100%, 0);
            border-right-width: 0;
            border-left-color: ${colorVar};
          }
        `;
      }
    }

    // side === "left"
    if (tailPosition == null) {
      return `
        &::before {
          left: 0;
          top: ${percentByAlign(align)};
          transform: translate(-100%, -50%);
          border-left-width: 0;
          border-right-color: ${colorVar};
        }
      `;
    } else {
      return `
        &::before {
          left: 0;
          top: ${tailPosition}px;
          transform: translate(-100%, 0);
          border-left-width: 0;
          border-right-color: ${colorVar};
        }
      `;
    }
  }}
`;
interface SpeechBubbleProps {
  side?: Side;
  align?: Align;
  pointerSize?: number;
  tailPosition?: number;
  fullWidth?: boolean;

  // 👉 말풍선(wrapper)에 적용할 클래스
  bubbleClassName?: string;

  // 👉 children(Card)에 추가로 붙일 클래스
  childClassName?: string;

  children: BubbleChild;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  side = "top",
  align = "center",
  pointerSize = 10,
  bubbleClassName = "",
  childClassName = "",
  tailPosition,
  fullWidth = false,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const style = window.getComputedStyle(wrapperRef.current);
      const color = style.backgroundColor || "transparent";
      wrapperRef.current.style.setProperty("--bubble-color", color);
    }
  }, [bubbleClassName, children]);

  const clonedChild = cloneElement(children, {
    className: [children.props.className, childClassName]
      .filter(Boolean)
      .join(" "),
  });

  return (
    <Wrapper
      ref={wrapperRef}
      side={side}
      align={align}
      pointerSize={pointerSize}
      tailPosition={tailPosition}
      fullWidth={fullWidth}
      className={bubbleClassName}
    >
      {clonedChild}
    </Wrapper>
  );
};

export default SpeechBubble;
