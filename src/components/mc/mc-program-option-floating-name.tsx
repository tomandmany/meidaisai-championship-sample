// @/components/mc/mc-program-option-floating-name.tsx

'use client'

import { useEffect, useRef, useState } from "react";

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
  const spanRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [canAnimate, setCanAnimate] = useState<boolean>(false);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const speed = 1;
  const gap = 20;

  // ResizeObserverで要素のサイズを監視
  useEffect(() => {
    const spanElement = spanRef.current;
    const parentElement = spanElement?.parentElement;

    if (!spanElement || !parentElement) {
      console.log("要素が見つかりません");
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      const spanWidth = spanElement.offsetWidth;
      const parentElemWidth = parentElement.offsetWidth;

      console.log(`spanWidth: ${spanWidth}, parentWidth: ${parentElemWidth}`);

      setTextWidth(spanWidth);
      setParentWidth(parentElemWidth);
      setCanAnimate(spanWidth + gap > parentElemWidth); // アニメーションの必要性を判定
    });

    resizeObserver.observe(spanElement);
    resizeObserver.observe(parentElement);

    return () => resizeObserver.disconnect();
  }, [program.title, program.group, gap]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!canAnimate) return;

      setPosition((prev) => {
        const newPosition = prev - speed;
        return newPosition <= -(textWidth + gap) ? 0 : newPosition; // 左端を超えたら位置をリセット
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (shouldAnimate && canAnimate) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setPosition(0); // アニメーションが不要なら初期位置に戻す
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldAnimate, canAnimate, textWidth, parentWidth, gap]);

  return (
    <div className="relative overflow-hidden h-6 whitespace-nowrap font-semibold max-w-full">
      {canAnimate ? (
        // 複数要素を生成して流れるアニメーションを実装
        Array.from({ length: 2 }).map((_, index) => (
          <span
            key={index}
            ref={index === 0 ? spanRef : null} // 最初の要素にrefを設定
            style={{
              transform: `translateX(${position + index * (textWidth + gap)}px)`,
            }}
            className="absolute"
          >
            {program.title}（{program.group}）
          </span>
        ))
      ) : (
        // 単一要素だけを表示
        <span ref={spanRef}>
          {program.title}（{program.group}）
        </span>
      )}
    </div>
  );
}
