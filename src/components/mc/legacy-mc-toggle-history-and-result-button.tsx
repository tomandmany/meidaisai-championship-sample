// @/app/components/mc/mc-toggle-history-and-result-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Crown, History, X } from 'lucide-react';

interface MCToggleHistoryAndResultButtonProps {
    showHistory?: boolean;
    showResult?: boolean;
    setShowHistory?: (value: boolean) => void;
    setShowResult?: (value: boolean) => void;
    isAfterVotingPeriod?: boolean;
}

export default function MCToggleHistoryAndResultButton({
    showHistory,
    setShowHistory,
    showResult,
    setShowResult,
    isAfterVotingPeriod,
}: MCToggleHistoryAndResultButtonProps) {
    const toggleHistory = () => {
        setShowHistory!(!showHistory);
        setShowResult!(false); // 他のモーダルを閉じる
    };

    const toggleResult = () => {
        setShowResult!(!showResult);
        setShowHistory!(false); // 他のモーダルを閉じる
    };

    return (
        <>
            {isAfterVotingPeriod ? (
                <div className='fixed flex gap-2 bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 2xl:right-10 z-mc-toggle-button-container'>
                    {!showResult && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="flex rounded-full mr-auto w-12 h-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-28 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 z-mc-toggle-button"
                            onClick={toggleHistory}
                        >
                            {showHistory ? (
                                <X className="min-w-5 sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12" />
                            ) : (
                                <History className="min-w-5 sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12" />
                            )}
                        </Button>
                    )}
                    {!showHistory && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="flex rounded-full w-12 h-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-28 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 z-mc-toggle-button"
                            onClick={toggleResult}
                        >
                            {showResult ? (
                                <X className="min-w-5 sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12" />
                            ) : (
                                <Crown className="min-w-5 sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12" />
                            )}
                        </Button>
                    )}
                    {showHistory && (
                        <div className="flex rounded-full mr-auto w-12 h-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-28 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 z-mc-toggle-button" />
                    )}
                </div>
            ) : (
                <>
                    {/* スマホ向けのボタン */}
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="fixed sm:hidden rounded-full min-h-12 min-w-12 z-mc-toggle-button bottom-2 right-8"
                        onClick={() => setShowHistory!(!showHistory)}
                    >
                        {showHistory ? (
                            <X className="min-w-5 min-h-5" />
                        ) : (
                            <History className="min-w-5 min-h-5" />
                        )}
                    </Button>

                    {/* デスクトップ向けのボタン */}
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="hidden fixed sm:flex sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 sm:right-3 md:right-4 lg:right-6 xl:right-8 2xl:right-10 rounded-full sm:w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-28 sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28 z-mc-toggle-button"
                        onClick={() => setShowHistory!(!showHistory)}
                    >
                        {showHistory ? (
                            <X className="sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12" />
                        ) : (
                            <History className="sm:min-w-6 lg:min-w-8 xl:min-w-10 2xl:min-w-12 min-h-6 lg:min-h-8 xl:min-h-10 2xl:min-h-12" />
                        )}
                    </Button>
                </>
            )}
        </>
    );
}