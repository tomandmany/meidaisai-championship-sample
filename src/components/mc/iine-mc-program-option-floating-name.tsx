// @/components/mc/mc-program-option-floating-name.tsx

'use client'

import { useEffect, useRef, useState } from "react";

interface MCProgramOptionFloatingNameProps {
  program: {
    title: string;
    group: string;
  };
  shouldAnimate: boolean; // アニメーションの制御フラグ
}

export default function MCProgramOptionFloatingName({
  program,
  shouldAnimate,
}: MCProgramOptionFloatingNameProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<number>(0); // 初期位置
  const [canAnimate, setCanAnimate] = useState<boolean>(false); // アニメーションするかどうか
  const speed = 1; // 流れる速度

  useEffect(() => {
    if (spanRef.current) {
      const { offsetWidth, parentElement } = spanRef.current;
      const parentWidth = parentElement?.offsetWidth ?? 0;

      // テキストが親要素より長い場合にのみアニメーションを許可
      setCanAnimate(offsetWidth > parentWidth);
    }
  }, [program.title, program.group]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (spanRef.current) {
        const { offsetWidth, parentElement } = spanRef.current;
        const parentWidth = parentElement?.offsetWidth ?? 0;

        setPosition((prev) =>
          prev <= -offsetWidth ? parentWidth : prev - speed
        );

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (shouldAnimate && canAnimate) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setPosition(0); // アニメーションが停止した場合、初期位置に戻す
    }

    return () => cancelAnimationFrame(animationFrameId); // クリーンアップ
  }, [shouldAnimate, canAnimate, program.title, program.group]);

  return (
    <div className="font-semibold whitespace-nowrap relative h-6 overflow-hidden">
      <span
        ref={spanRef}
        style={{ transform: `translateX(${position}px)` }}
        className={`absolute ${canAnimate ? '' : 'static'}`} // アニメーションがない場合は静的に配置
      >
        {program.title}（{program.group}）
      </span>
    </div>
  );
}
