// app/components/mc/form/mc-form-vote-button.tsx

'use client'

import insertVote from "@/actions/insertVote";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import getRemainingVotingTimes from "@/lib/getRemainingVotingTime";
import Header from "@/components/mc/other/header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import getJSTDate from "@/lib/getJSTDate";

interface MCFormVoteButtonProps {
    selectedPrograms: { id: string; title: string, department: string, date: string }[];
    user_id: string;
    testDate?: Date;
    setSelectedPrograms: (programs: { id: string; title: string, department: string, date: string }[]) => void;
}

export default function MCFormVoteButton({ selectedPrograms, user_id, testDate, setSelectedPrograms }: MCFormVoteButtonProps) {
    const [loading, setLoading] = useState(false);
    const [isVotingTime, setIsVotingTime] = useState<boolean | null>(null); // 初期状態を null に設定

    useEffect(() => {
        const checkVotingStatus = () => {
            const today = testDate ? testDate.toISOString().slice(0, 10) : getJSTDate().slice(0, 10);
            // const today = testDate ? testDate.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
            const { startDelay, endDelay } = getRemainingVotingTimes(today, testDate);

            if (startDelay === 0 && endDelay !== null && endDelay > 0) {
                setIsVotingTime(true); // 即時に投票可能状態を設定
                setTimeout(() => setIsVotingTime(false), endDelay); // 終了時間に合わせて false に設定
            } else {
                setIsVotingTime(false); // 投票時間外を初期設定
                if (startDelay !== null && startDelay > 0) {
                    setTimeout(() => setIsVotingTime(true), startDelay); // 開始時間に合わせて true に設定
                }
            }
        };

        checkVotingStatus();
    }, [testDate]);

    const handleInsertVote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading || selectedPrograms.length === 0) return;

        setLoading(true);

        try {
            const result = await insertVote({ user_id, programs: selectedPrograms, testDate });
            setSelectedPrograms([]);
            toast.success(result, {
                style: {
                    background: 'white',
                    color: '#4CAF50',
                    border: 'transparent',
                },
            });
        } catch (error: any) {
            toast.error(error.message, {
                style: {
                    background: '#f44336',
                    color: '#ffffff',
                    border: 'transparent',
                },
            });
        } finally {
            setLoading(false);
        }
    };

    // isVotingTime が null の間は何も表示しないことでちらつきを防ぐ
    if (isVotingTime === null) {
        return (
            <Button
                type='button'
                className={`w-full h-[39px] mt-3 sm:mt-2 bg-[#E07594] hover:bg-[#c56681] ${loading || selectedPrograms.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading || selectedPrograms.length === 0}
            >
                <LoaderCircle className="animate-spin" />
            </Button>
        );
    }

    return (
        <div className='flex gap-2 items-center'>
            {isVotingTime ? (
                <Button
                    type='button'
                    onClick={handleInsertVote}
                    className={`w-full mt-3 sm:mt-2 bg-[#E07594] hover:bg-[#c56681] ${loading || selectedPrograms.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading || selectedPrograms.length === 0}
                >
                    {loading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        `投票する (${selectedPrograms.length})`
                    )}
                </Button>
            ) : (
                <div className="fixed inset-0 bg-white bg-mc-background z-mc-period-extra-modal">
                    <Header />
                    <div className="flex flex-col justify-center items-center h-full gap-10">
                        <Image
                            src={'/votes/logo.svg'}
                            alt="ロゴ"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                        <Card className="flex w-fit justify-center items-center px-2 whitespace-nowrap sm:max-w-md sm:h-fit py-10 sm:p-10 rounded-2xl sm:rounded-xl border-none sm:border">
                            <CardContent className="space-y-4 p-4">
                                <h2 className="font-bold text-[22px] leading-10 text-center">
                                    投票時間外です。
                                    <br />
                                    下記の時間帯に投票可能です。
                                </h2>
                                <div className="space-y-2">
                                    <h6 className="font-bold">投票日時</h6>
                                    <div className="flex flex-col">
                                        <span>11月2日(土)11:00～18:00</span>
                                        <span>11月3日(日)11:00～18:00</span>
                                        <span>11月4日(月・祝)11:00～16:30</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
            {/* <div className='invisible min-w-12 min-h-[36px] mt-2 sm:hidden' /> */}
        </div>
    );
}
