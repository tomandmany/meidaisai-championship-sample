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
          className="object-contain fixed z-mc-ticket left-4 bottom-4 flex justify-center items-center cursor-not-allowed"
        >
          <Image src="/votes/ticket.svg" alt="抽選券" width={150} height={150} className="sm:w-40 md:w-52 lg:w-60 xl:w-64 brightness-50" />
          <span className="absolute text-white md:text-xl lg:text-2xl">使用済み</span>
        </div>
      ) : (
        <Button
          type="button"
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={() => setIsTicketModalOpen(true)}
          className="object-contain p-0 fixed z-mc-ticket left-4 bottom-10 sm:bottom-10 md:bottom-14 lg:bottom-16 xl:bottom-[70px]"
        >
          <Image src="/votes/ticket.svg" alt="抽選券" width={150} height={150} className="sm:w-40 md:w-52 lg:w-60 xl:w-64" />
        </Button>
      )}

      {isTicketModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/95 z-mc-ticket-modal">
          <div className="relative w-svw h-svh flex flex-col justify-center items-center gap-10">
            <Image src="/votes/ticket.svg" alt="抽選券" width={500} height={500} />
            <UseTicketButton userId={userId} isTicketUsed={isTicketUsed} setIsTicketUsed={setIsTicketUsed} />
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsTicketModalOpen(false)}
              className="absolute bottom-4 left-4 w-12 h-12 rounded-full shadow-lg hover:bg-gray-200"
            >
              <X />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
