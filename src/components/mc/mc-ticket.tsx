// app/components/mc-ticket.tsx

'use client';

import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import Image from 'next/image';
import { CSSProperties, useState, useEffect } from 'react';
import UseTicketButton from "./mc-use-ticket-button";
import { X } from "lucide-react";

type TicketProps = {
  position: { x: number; y: number };
  userId: string;
  ticketUsed: boolean;
};

export default function Ticket({ position, userId, ticketUsed }: TicketProps) {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isTicketUsed, setIsTicketUsed] = useState(ticketUsed);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: 'draggable-ticket',
  });

  const style: CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isDragging ? 'none' : 'transform 0.2s ease',
    touchAction: 'none',
  };

  useEffect(() => {
    if (isTicketModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTicketModalOpen]);

  return (
    <>
      {isTicketUsed ? (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="object-contain fixed z-mc-ticket left-8 bottom-16 flex justify-center items-center cursor-not-allowed"
        >
          <Image src="/votes/ticket.svg" alt="抽選券" width={200} height={200} className="not-move-ticket w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 brightness-50" />
          <span className="absolute select-none text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">使用済み</span>
        </div>
      ) : (
        <Button
          type="button"
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={() => setIsTicketModalOpen(true)}
          className="object-contain p-0 fixed z-mc-ticket left-4 bottom-14 sm:bottom-16 md:bottom-20 lg:bottom-[90px] xl:bottom-[110px]"
        >
          <Image src="/votes/ticket.svg" alt="抽選券" width={200} height={200} className="not-move-ticket w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96" />
        </Button>
      )}

      {isTicketModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/95 z-mc-ticket-modal">
          <div className="relative w-svw h-svh flex flex-col justify-center items-center gap-7">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4">
                <Image src="/votes/reception.svg" alt="第一校舎学部掲示板前" width={300} height={300} />
              </div>
              <p className="text-white w-[332px]">
                「
                <a href="https://www.meidaisai.jp/lottery" className="text-[#63BDEA] underline hover:no-underline">明大祭大抽選会</a>
                」への参加をご希望される方は、
                総務局企画受付場所の和泉図書館前総合インフォメーションへお越しください。
                詳しくは公式パンフレットp.14をご参照ください。
              </p>
            </div>
            {/* <Image src="/votes/ticket.svg" alt="抽選券" width={500} height={500} /> */}
            <div>
              <UseTicketButton userId={userId} isTicketUsed={isTicketUsed} setIsTicketUsed={setIsTicketUsed} />
              <p className="text-red-500 text-base text-center mt-4 font-black">ご自分では使用しないでください。</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsTicketModalOpen(false)}
              className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12 2xl:bottom-14 left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12 2xl:left-14 rounded-full w-12 h-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-28 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 z-mc-toggle-button"
            >
              <X className="min-w-5 sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
