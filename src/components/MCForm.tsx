'use client';

import { useState, useEffect } from 'react';
import { getVotes } from '@/data/getVotes';
import ProgramSelect from './ProgramSelect';
import { handleVote } from '@/actions/handleVote';
import { toast } from 'sonner'; // Sonnerのtoast関数をインポート

type MCFormProps = {
  userId: string;
};

const boothPrograms = ['模擬店1', '模擬店2', '模擬店3'];
const outstagePrograms = ['屋外ステージ1', '屋外ステージ2', '屋外ステージ3'];
const roomPrograms = ['教室1', '教室2', '教室3'];

export default function MCForm({ userId }: MCFormProps) {
  const [existingVote, setExistingVote] = useState<Vote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const vote = await getVotes(userId);
      if (vote) {
        setExistingVote(vote);
        setIsUpdating(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const result = await handleVote(formData);

      // Sonnerのトーストで成功メッセージを表示
      toast.success(result, {
        style: {
          // background: '#4CAF50', // 成功メッセージの背景色
          // color: '#ffffff', // テキスト色
          color: '#4CAF50',
        },
      });

      // 新しい投票データをフェッチして状態を更新
      const updatedVote = await getVotes(userId);
      if (updatedVote) {
        setExistingVote(updatedVote);
        setIsUpdating(true);
      }
    } catch (error) {
      // Sonnerのトーストでエラーメッセージを表示
      toast.error('エラーが発生しました。', {
        style: {
          background: '#f44336', // エラーメッセージの背景色
          color: '#ffffff', // テキスト色
        },
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-8 border rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <ProgramSelect
          categoryName="booth"
          categoryLabel="模擬店"
          options={boothPrograms}
          selectedValue={existingVote ? existingVote.booth : ''}
        />
        <ProgramSelect
          categoryName="outstage"
          categoryLabel="屋外ステージ"
          options={outstagePrograms}
          selectedValue={existingVote ? existingVote.outstage : ''}
        />
        <ProgramSelect
          categoryName="room"
          categoryLabel="教室"
          options={roomPrograms}
          selectedValue={existingVote ? existingVote.room : ''}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {isUpdating ? '更新する' : '投票する'}
        </button>
      </form>
    </div>
  );
}
