// app/components/History.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { deleteVote } from "@/actions/deleteVote";
import { toast } from "sonner";

interface HistoryProps {
  user_id: string;
  days: string[];
  departments: string[];
  projects: Project[];
  votesHistory: Vote[];
}

// JSTに基づいてYYYY-MM-DD形式の日付を取得する関数
const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export default function History({ user_id, days, departments, projects, votesHistory }: HistoryProps) {
  const handleDeleteVote = async (voteId: string) => {
    try {
      if (!user_id) throw new Error("ユーザーIDが取得できませんでした。");

      const result = await deleteVote({ voteId, user_id });

      toast.success(result, {
        style: {
          background: 'white',
          color: '#4CAF50',
          border: 'transparent',
        },
      });
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
    <div className="fixed inset-0 border-none z-mc-history-modal overflow-auto rounded-none bg-[#F3F4F6]">
      <div className="font-bold text-2xl text-white p-6 bg-[#E07494] sticky left-0 top-0 z-mc-history-title">
        投票履歴
      </div>
      <div className="px-6 pt-7 pb-10 sm:py-0 sm:h-[calc(100svh-80px)] flex flex-col sm:flex-row flex-wrap sm:items-center gap-5">
        {days.map((day) => (
          <Card key={day} className="flex-grow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {departments.map((dept) => {
                // 各部門ごとに投票をフィルタリング
                const filteredVotes = votesHistory.filter(
                  (vote) =>
                    formatCreatedAt(vote.created_at) === day &&
                    projects.some((p) => p.id === vote.project_id && p.department === dept)
                );

                const isScrollable = filteredVotes.length >= 3;

                return (
                  <div key={`${day}-${dept}`} className="ml-2 mb-6">
                    <h4 className="font-medium text-lg">{dept}:</h4>
                    {filteredVotes.length === 0 ? (
                      <p className="text-muted-foreground ml-6 mt-2">投票なし</p>
                    ) : (
                      <ScrollArea
                        className={`list-disc list-inside rounded-md ml-4 px-2 z-mc-history-scroll-area ${
                          isScrollable ? 'h-[130px] border mt-2 pt-2' : ''
                        }`}
                      >
                        {filteredVotes.map((vote) => {
                          const project = projects.find(
                            (p) => p.id === vote.project_id && p.department === dept
                          );

                          return project ? (
                            <li
                              key={vote.project_id}
                              className="flex items-center justify-between mb-2 border-b"
                            >
                              <span>{project.name}</span>
                              <Button
                                type="button"
                                onClick={() => handleDeleteVote(vote.id)}
                                variant="ghost"
                                className="p-2 ml-4 w-8 h-8 hover:bg-primary/10 cursor-pointer"
                              >
                                <X className="h-5 w-5 text-primary flex-shrink-0" />
                              </Button>
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
    </div>
  );
}
