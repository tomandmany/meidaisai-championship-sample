// app/components/mc/mc-history.tsx

'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { deleteVote } from "@/actions/deleteVote";
import { toast } from "sonner";
import MCLabel from "./mc-label";
import { getVotingStatus } from "@/lib/getVotingStatus";
import MCDeleteVoteConfirmModal from "./mc-delete-vote-confirm-modal";

interface MCHistoryProps {
  user_id: string;
  days: string[];
  departments: string[];
  programs: Program[];
  votesHistory: Vote[];
  testDate?: Date;
}

// JSTに基づいてYYYY-MM-DD形式の日付を取得する関数
const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export default function MCHistory({ testDate, user_id, days, departments, programs, votesHistory }: MCHistoryProps) {
  const today = testDate || new Date();
  const votingStatus = getVotingStatus(today);

  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態
  const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null); // 選択された投票ID

  const openModal = (voteId: string) => {
    setSelectedVoteId(voteId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoteId(null);
  };

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
      closeModal(); // モーダルを閉じる
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
    <div className="fixed inset-0 border-none z-mc-history-and-result-modal overflow-auto rounded-none bg-mc-background">
    {/* <div className="fixed inset-0 border-none z-mc-history-and-result-modal overflow-auto rounded-none bg-votes-champ bg-white"> */}
      {/* <div className="fixed inset-0 border-none z-mc-history-and-result-modal overflow-auto rounded-none bg-[#F3F4F6]"> */}
      {/* <div className="font-bold text-2xl text-white p-6 sm:text-center bg-[#E07494] sticky left-0 top-0 z-mc-history-and-result-title">
        投票履歴
      </div> */}
      <div className="font-bold text-white h-[50px] pl-6 sm:pl-0 text-xl flex items-center sm:justify-center bg-[#E07494] sticky left-0 top-0 z-mc-history-and-result-title">
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

                return (
                  <div key={`${day}-${department}`} className="ml-2 mb-6">
                    <MCLabel>{department}</MCLabel>
                    {filteredVotes.length === 0 ? (
                      <p className="ml-6 mt-2 text-muted-foreground">投票されていません。</p>
                    ) : (
                      <ScrollArea className="list-disc list-inside rounded-md ml-4 p-2 z-mc-history-and-result-area h-fit">
                        {filteredVotes.map((vote) => {
                          const program = programs.find(
                            (p) => p.id === vote.program_id && p.department === department
                          );

                          return program ? (
                            <li
                              key={vote.program_id}
                              className={`flex items-center justify-between mb-2 border-b ${!votingStatus.isDuring && 'pb-2'}`}
                            >
                              <span>{program.title}</span>
                              {votingStatus.isDuring && (
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

      {/* 削除確認モーダル */}
      <MCDeleteVoteConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="投票の削除確認"
        message="この投票を削除しますか？この操作は元に戻せません。"
      />
    </div>
  );
}
