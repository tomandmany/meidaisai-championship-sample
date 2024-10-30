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
  const speed = 1; // 流れる速度

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

    if (shouldAnimate) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setPosition(0); // アニメーションが停止した場合、初期位置に戻す
    }

    return () => cancelAnimationFrame(animationFrameId); // クリーンアップ
  }, [shouldAnimate, program.title, program.group]);

  return (
    <div className="font-semibold whitespace-nowrap relative h-6 overflow-hidden">
      <span
        ref={spanRef}
        style={{ transform: `translateX(${position}px)` }}
        className="absolute"
      >
        {/* {program.title} | {program.group} */}
        {program.title}（{program.group}）
      </span>
    </div>
  );
}
