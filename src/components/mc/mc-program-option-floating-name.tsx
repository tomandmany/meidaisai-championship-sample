// @/components/mc/mc-program-option-floating-name.tsx

'use client'

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface MCProgramOptionFloatingNameProps {
  program: {
    title: string;
    group: string;
  };
  shouldAnimate: boolean;
}

export default function MCProgramOptionFloatingName({
  program,
  shouldAnimate,
}: MCProgramOptionFloatingNameProps) {
  const tempSpanRef = useRef<HTMLSpanElement>(null);
  const [positions, setPositions] = useState<[number, number]>([0, 0]);
  const [canAnimate, setCanAnimate] = useState<boolean>(false);
  const [textWidth, setTextWidth] = useState<number>(0);

  const speed = 1;
  const gap = 20;

  // テキスト幅の測定とアニメーション要否の判定
  useLayoutEffect(() => {
    const tempSpan = tempSpanRef.current;
    const parentElement = tempSpan?.parentElement;

    if (tempSpan && parentElement) {
      const spanWidth = tempSpan.offsetWidth;
      const parentWidth = parentElement.offsetWidth;

      setTextWidth(spanWidth);
      setCanAnimate(spanWidth > parentWidth);
      tempSpan.remove();
    } else {
      console.error("要素が見つかりません");
    }
  }, [program.title, program.group]);

  // アニメーションの管理
  useEffect(() => {
    if (!shouldAnimate || !canAnimate) {
      setPositions([0, textWidth + gap]);
      return;
    }

    let animationFrameId: number;

    const animate = () => {
      setPositions(([pos1, pos2]) => [
        pos1 <= -textWidth - gap ? textWidth + gap : pos1 - speed,
        pos2 <= -textWidth - gap ? textWidth + gap : pos2 - speed,
      ]);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldAnimate, canAnimate, textWidth]);

  return (
    <div className="relative overflow-hidden h-6 whitespace-nowrap font-semibold w-full">
      <span ref={tempSpanRef} className="absolute invisible">
        {program.title}（{program.group}）
      </span>

      {canAnimate ? (
        positions.map((position, index) => (
          <span
            key={index}
            style={{ transform: `translateX(${position}px)` }}
            className="absolute"
          >
            {program.title}（{program.group}）
          </span>
        ))
      ) : (
        <span>
          {program.title}（{program.group}）
        </span>
      )}
    </div>
  );
}
