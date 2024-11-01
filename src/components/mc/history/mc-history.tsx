'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteVote } from "@/actions/deleteVote";
import { toast } from "sonner";
import MCLabel from "@/components/mc/other/mc-label";
import MCHistoryDeleteConfirmModal from "@/components/mc/history/mc-history-delete-confirm-modal";
import getRemainingVotingTimes from "@/lib/getRemainingVotingTime";

interface MCHistoryProps {
  user_id: string;
  days: string[];
  departments: string[];
  programs: Program[];
  votesHistory: Vote[];
  testDate?: Date;
}

const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export default function MCHistory({ testDate, user_id, days, departments, programs, votesHistory }: MCHistoryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null);
  const [votingHoursStatus, setVotingHoursStatus] = useState<{ [key: string]: boolean }>({});

  const openModal = (voteId: string) => {
    setSelectedVoteId(voteId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoteId(null);
  };

  useEffect(() => {
    const setVotingStatus = () => {
      const initialStatus: { [key: string]: boolean } = {};
      days.forEach((day) => {
        const { startDelay, endDelay } = getRemainingVotingTimes(day, testDate);
  
        // 初回チェック: start から end の間のみ true
        initialStatus[day] = startDelay === 0 && endDelay !== null && endDelay > 0;
  
        // 投票開始時刻に達したらボタンを表示
        if (startDelay !== null && startDelay > 0) {
          setTimeout(() => {
            setVotingHoursStatus((prev) => ({ ...prev, [day]: true }));
          }, startDelay);
        }
  
        // 投票終了時刻に達したらボタンを非表示
        if (endDelay !== null && endDelay > 0) {
          setTimeout(() => {
            setVotingHoursStatus((prev) => ({ ...prev, [day]: false }));
          }, endDelay);
        }
      });
      setVotingHoursStatus(initialStatus);
    };
  
    setVotingStatus(); // 初回チェック
  }, [days, testDate]);

  const handleDelete = async () => {
    if (!selectedVoteId || !user_id) return;

    try {
      const result = await deleteVote({ voteId: selectedVoteId, user_id });
      toast.success(result, {
        style: {
          background: 'white',
          color: '#4CAF50',
          border: 'transparent',
        },
      });
      closeModal();
    } catch (error) {
      console.error('投票の削除中にエラーが発生しました:', error);
      toast.error('エラーが発生しました。', {
        style: {
          background: '#f44336',
          color: '#ffffff',
          border: 'transparent',
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 border-none z-mc-history-modal overflow-auto rounded-none bg-mc-background bg-white">
      <div className="font-bold text-white h-[50px] pl-6 sm:pl-0 text-xl flex items-center sm:justify-center bg-[#E07494] sticky left-0 top-0 z-mc-history-title">
        投票履歴
      </div>
      <div className="p-0 sm:px-6 sm:pt-7 sm:pb-10 sm:min-h-[calc(100svh-50px)] flex flex-col sm:flex-row flex-wrap gap-x-10 gap-y-5">
        {days.map((day) => (
          <Card key={day} className="flex-grow min-w-fit min-h-full rounded-none sm:rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {departments.map((department) => {
                const filteredVotes = votesHistory.filter(
                  (vote) =>
                    formatCreatedAt(vote.created_at) === day &&
                    programs.some((p) => p.id === vote.program_id && p.department === department)
                );

                const isWithinVotingHours = votingHoursStatus[day];

                return (
                  <div key={`${day}-${department}`} className="ml-2 mb-6">
                    <MCLabel>{department}</MCLabel>
                    {filteredVotes.length === 0 ? (
                      <p className="ml-4 mt-2 text-muted-foreground">投票されていません。</p>
                    ) : (
                      <ScrollArea className="list-disc list-inside rounded-md ml-2 p-2 z-mc-history-area h-fit">
                        {filteredVotes.map((vote) => {
                          const program = programs.find(
                            (p) => p.id === vote.program_id && p.department === department
                          );

                          return program ? (
                            <li
                              key={vote.program_id}
                              className={`flex items-center justify-between mb-2 border-b ${!isWithinVotingHours && 'pb-2'}`}
                            >
                              <span>{program.title}</span>
                              {isWithinVotingHours && (
                                <Button
                                  type="button"
                                  onClick={() => openModal(vote.id)}
                                  variant="ghost"
                                  className="p-2 ml-4 w-8 h-8 hover:bg-red-500 cursor-pointer group"
                                >
                                  <Trash2 className="h-5 w-5 flex-shrink-0 text-red-500 group-hover:text-white" />
                                </Button>
                              )}
                            </li>
                          ) : null;
                        })}
                      </ScrollArea>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <MCHistoryDeleteConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="投票の削除確認"
        message="この投票を削除しますか？この操作は元に戻せません。"
      />
    </div>
  );
}
