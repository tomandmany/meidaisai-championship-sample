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
  const tempSpanRef = useRef<HTMLSpanElement>(null); // 一時的な文字の幅測定用
  const [position, setPosition] = useState<number>(0);
  const [canAnimate, setCanAnimate] = useState<boolean>(false);
  const [textWidth, setTextWidth] = useState<number>(0);
  const speed = 1;
  const gap = 20;

  // 一時的な要素で幅を測定し、測定後に削除する
  useLayoutEffect(() => {
    const tempSpan = tempSpanRef.current;
    const parentElement = tempSpan?.parentElement;

    if (!tempSpan || !parentElement) {
      console.error("要素が見つかりません");
      return;
    }

    const spanWidth = tempSpan.offsetWidth;
    const parentElemWidth = parentElement.offsetWidth;

    console.log(`Temp Span Width: ${spanWidth}, Parent Width: ${parentElemWidth}`);

    setTextWidth(spanWidth);

    // テキストの幅が親を超えているかどうかでアニメーションを判定
    const newCanAnimate = spanWidth > parentElemWidth;
    console.log(`newCanAnimate: ${newCanAnimate}`);
    setCanAnimate(newCanAnimate);

    // 測定が終わったら一時的な要素を削除
    tempSpan.remove();
  }, [program.title, program.group]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!canAnimate) return;

      setPosition((prev) => {
        const newPosition = prev - speed;
        return newPosition <= -textWidth ? 0 : newPosition;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (shouldAnimate && canAnimate) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setPosition(0);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldAnimate, canAnimate, textWidth]);

  return (
    <div className="relative overflow-hidden h-6 whitespace-nowrap font-semibold w-full">
      {/* 一時的な span で幅を測定し、測定後に削除される */}
      <span ref={tempSpanRef} className="absolute invisible">
        {program.title}（{program.group}）
      </span>

      {/* アニメーションが必要な場合と不要な場合で表示を切り替える */}
      {canAnimate ? (
        Array.from({ length: 2 }).map((_, index) => (
          <span
            key={index}
            style={{
              transform: `translateX(${position + index * (textWidth + gap)}px)`,
            }}
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
