// /app/components/mc/mc-vote-button.tsx
'use client'
import { insertVote } from "@/actions/insertVote";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

interface MCVoteButtonProps {
    selectedPrograms: { id: string; title: string }[];
    user_id: string;
    testDate?: Date;
    setSelectedPrograms: (programs: { id: string; title: string }[]) => void;
}

export default function MCVoteButton({ selectedPrograms, user_id, testDate, setSelectedPrograms }: MCVoteButtonProps) {
    const [loading, setLoading] = useState(false); // ローディング状態を管理

    const handleInsertVote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading || selectedPrograms.length === 0) return; // 二重送信の防止

        setLoading(true); // ローディング開始

        try {
            const result = await insertVote({ user_id, programs: selectedPrograms, testDate });

            setSelectedPrograms([]); // 投票後に選択プロジェクトをクリア

            toast.success(result, {
                style: {
                    background: 'white',
                    color: '#4CAF50',
                    border: 'transparent',
                },
            });
        } catch (error) {
            toast.error('エラーが発生しました。', {
                style: {
                    background: '#f44336',
                    color: '#ffffff',
                    border: 'transparent',
                },
            });
        } finally {
            setLoading(false); // ローディング終了
        }
    };

    return (
        <div className='flex gap-2 items-center'>
            <Button
                type='button'
                onClick={handleInsertVote}
                className={`w-full mt-3 sm:mt-2 bg-[#E07594] hover:bg-[#c56681] ${
                    loading || selectedPrograms.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading || selectedPrograms.length === 0} // ローディング中は無効化
            >
                {loading ? (
                    <LoaderCircle className="animate-spin" /> // 回転アニメーション
                ) : (
                    `投票する (${selectedPrograms.length})`
                )}
            </Button>
            <div className='invisible min-w-12 min-h-[36px] mt-2 sm:hidden' />
        </div>
    );
}
