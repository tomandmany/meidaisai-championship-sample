'use client';

import { Button } from '@/components/ui/button';
import { Crown, History, X } from 'lucide-react';
import React from 'react';

interface MCToggleHistoryAndResultButtonProps {
  showView: 'history' | 'result' | null;
  toggleView: (view: 'history' | 'result') => void;
  showHistory?: boolean;
  showResult?: boolean;
}

// 共通のアイコンサイズクラス
const ICON_SIZE = 'min-w-5 sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12';

export default function MCToggleHistoryAndResultButton({
  showView,
  toggleView,
  showHistory = true,
  showResult = true,
}: MCToggleHistoryAndResultButtonProps) {
  const renderButton = (
    view: 'history' | 'result',
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  ) => (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={`flex rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 ${showView === view && showView !== null && 'border-black'} ${showView !== view && showView !== null && 'invisible'}`}
      onClick={() => toggleView(view)}
    >
      {showView === view ? <X className={ICON_SIZE} /> : <Icon className={ICON_SIZE} />}
    </Button>
  );

  return (
    <div className={`fixed flex gap-2 bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 2xl:right-10 z-mc-toggle-button-container ${showHistory && !showResult && 'bottom-[10px] right-8'}`}>
      {showHistory && renderButton('history', History)}
      {showResult && renderButton('result', Crown)}
    </div>
  );
}
