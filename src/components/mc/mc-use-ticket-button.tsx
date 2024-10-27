// app/components/mc/mc-use-ticket-button.tsx

'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';

type TicketProps = {
  userId: string;
  isTicketUsed: boolean;
  setIsTicketUsed: Dispatch<SetStateAction<boolean>>;
};

export default function UseTicketButton({ userId, isTicketUsed, setIsTicketUsed }: TicketProps) {
  const [isMoving, setIsMoving] = useState(false);

  const handleTicketClick = async () => {
    try {
      setIsMoving(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setTimeout(() => {
          setIsTicketUsed(true);
          setIsMoving(false);
        }, 500);
      } else {
        console.error('Failed to update ticket status');
        setIsMoving(false);
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
      setIsMoving(false);
    }
  };

  return (
    <div className={`p-[2px] border border-gray-400 rounded-lg w-[330px] bg-white z-mc-ticket ${!isTicketUsed && 'hover:bg-blue-100'}`}>
      <button
        type='button'
        onClick={handleTicketClick}
        disabled={isTicketUsed || isMoving}
        className={`flex items-center w-full h-14 rounded-lg relative overflow-hidden 
          ${isTicketUsed ? 'cursor-not-allowed text-gray-400' : 'text-gray-600 hover:bg-blue-100'} transition duration-200 ease-in-out`}
      >
        <div className={`flex items-center justify-center w-1/2 h-full bg-blue-400 rounded-lg absolute transition-transform duration-500 ease-in-out text-white 
          ${isTicketUsed ? 'translate-x-full bg-gray-400' : 'translate-x-0 bg-blue-400'}`}
        >
          {isTicketUsed ? <Check /> : (isMoving ? <LoaderCircle className="animate-spin" /> : <ArrowRight />)}
        </div>

        <span className={`w-1/2 text-center font-semibold text-sm ${isTicketUsed ? 'text-gray-400' : 'text-gray-600'}`}>使用済み</span>
        <span className={`w-1/2 text-center font-semibold text-sm ${isTicketUsed ? 'text-gray-400' : 'text-gray-600'}`}>チケットを使用する</span>
      </button>
    </div>
  );
}
