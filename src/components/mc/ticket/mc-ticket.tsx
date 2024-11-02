// app/components/mc/ticket/mc-ticket.tsx

'use client';

import React, { CSSProperties, useState, useEffect, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { X } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import UseTicketButton from "@/components/mc/ticket/mc-ticket-use-button";

interface MCTicketProps {
  position?: { x: number; y: number };
  userId: string;
  ticketUsed: boolean;
  isTicketModalOpen: boolean;
  setIsTicketModalOpen: Dispatch<SetStateAction<boolean>>;
  finishTutorial: () => void;
};

export default function MCTicket({ position, userId, ticketUsed, isTicketModalOpen, setIsTicketModalOpen, finishTutorial }: MCTicketProps) {
  const [isTicketUsed, setIsTicketUsed] = useState(ticketUsed);

  const handleModalToggle = () => {
    setIsTicketModalOpen(prev => !prev);
    if (isTicketModalOpen) {
      finishTutorial();
    }
  }

  useEffect(() => {
    document.body.style.overflow = isTicketModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isTicketModalOpen]);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: 'draggable-ticket',
  });

  const style: CSSProperties = {
    transform: `translate3d(${position?.x || 0}px, ${position?.y || 0}px, 0)`,
    transition: isDragging ? 'none' : 'transform 0.2s ease',
    touchAction: 'none',
  };

  const TicketModalContent = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-mc-background bg-white z-mc-ticket-modal">
    {/* <div className="fixed inset-0 flex items-center justify-center bg-black/95 z-mc-ticket-modal"> */}
      <div className="relative w-svw min-h-svh flex flex-col justify-center items-center gap-7 bg-mc-form">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4">
            <Image src="/votes/reception.svg" alt="第一校舎学部掲示板前" width={300} height={300} />
          </div>
          <p className="w-[332px]">
          {/* <p className="text-white w-[332px]"> */}
            「
            <a href="https://www.meidaisai.jp/lottery" className="text-[#63BDEA] underline hover:no-underline">明大祭大抽選会</a>
            」への参加をご希望される方は、総務局企画受付場所の和泉図書館前総合インフォメーションへお越しください。
            詳しくは公式パンフレットp.14をご参照ください。
          </p>
        </div>
        <UseTicketButton userId={userId} isTicketUsed={isTicketUsed} setIsTicketUsed={setIsTicketUsed} />
        <p className="text-red-500 text-base text-center mt-4 font-black">ご自分では使用しないでください。</p>
        <Button
          type="button"
          variant="outline"
          onClick={handleModalToggle}
          className="border-black absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10 xl:bottom-12 xl:left-12 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28"
        >
          <X className="min-w-5 min-h-5 sm:min-w-6 sm:min-h-6 lg:min-w-8 lg:min-h-8" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {!position ? (
        <Button
          type="button"
          onClick={handleModalToggle}
          className="w-fit h-fit object-contain p-0 sm:bottom-16 md:bottom-20 lg:bottom-[90px] xl:bottom-[110px]"
        >
          <Image src="/votes/ticket.svg" alt="抽選券" width={200} height={200} className="w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96" />
        </Button>
      ) : (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={`object-contain fixed z-mc-ticket left-4 bottom-16 flex justify-center items-center ${isTicketUsed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={!isTicketUsed ? handleModalToggle : undefined}
        >
          <Image src="/votes/ticket.svg" alt="抽選券" width={200} height={200} className={`w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 ${isTicketUsed && ' brightness-50'}`} />
          {isTicketUsed && <span className="absolute select-none text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">使用済み</span>}
        </div>
      )}
      
      {isTicketModalOpen && <TicketModalContent />}
    </>
  );
}
