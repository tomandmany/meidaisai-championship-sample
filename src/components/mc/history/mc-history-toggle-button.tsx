// app/components/mc/history/mc-history-toggle-button.tsx

'use client';

import { Button } from '@/components/ui/button';
import { History, X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

interface MCHistoryToggleButtonProps {
  showHistory: boolean;
  setShowHistory: Dispatch<SetStateAction<boolean>>;
}

// 共通のアイコンサイズクラス
const ICON_SIZE = 'min-w-5 sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12';

export default function MCHistoryToggleButton({
  showHistory,
  setShowHistory,
}: MCHistoryToggleButtonProps) {

  return (
    // <div className='fixed flex gap-2 bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 2xl:right-10 z-mc-toggle-button'>
    //   <Button
    //       type="button"
    //       variant="outline"
    //       size="icon"
    //       className={`flex rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 ${showHistory && 'border-black'}`}
    //       onClick={() => setShowHistory(!showHistory)}
    //     >
    //       {showHistory ? <X className={ICON_SIZE} /> : <History className={ICON_SIZE} />}
    //     </Button>
    // </div>
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={`fixed rounded-full z-mc-toggle-button bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 right-8 sm:right-3 md:right-4 lg:right-6 xl:right-8 2xl:right-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 ${showHistory && 'border-black'}`}
      onClick={() => setShowHistory(!showHistory)}
    >
      {showHistory ? <X className={ICON_SIZE} /> : <History className={ICON_SIZE} />}
    </Button>
  );
}
