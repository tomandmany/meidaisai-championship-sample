'use client';

import { useState, useEffect } from 'react';
import ProgramSelect from './ProgramSelect';
import { handleVote } from '@/actions/handleVote';
import { toast } from 'sonner'; // Sonnerのtoast関数をインポート
import { LoaderCircle } from 'lucide-react';

type MCFormProps = {
  userId: string;
  votesHistory: Vote[];
  testDate?: Date; // testDate の型は Date | undefined
};

const boothPrograms = ['模擬店1', '模擬店2', '模擬店3'];
const outstagePrograms = ['屋外ステージ1', '屋外ステージ2', '屋外ステージ3'];
const roomPrograms = ['教室1', '教室2', '教室3'];

export default function MCForm({ votesHistory, testDate }: MCFormProps) {
  const [existingVote, setExistingVote] = useState<Vote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const matchingVote = votesHistory.find((vote) => {
      const voteDate = new Date(vote.created_at);
      voteDate.setHours(0, 0, 0, 0); // 日付だけ比較

      return testDate && voteDate.getTime() === testDate.setHours(0, 0, 0, 0);
    });

    if (matchingVote) {
      setExistingVote(matchingVote);
      setIsUpdating(true);
    }

    setIsLoading(false);
  }, [votesHistory, testDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const result = await handleVote({
        formData,
        testDate, // testDateはそのままDate型で渡す
      });

      toast.success(result, {
        style: {
          background: 'white',
          color: '#4CAF50',
          border: 'transparent'
        },
      });
    } catch (error) {
      toast.error('エラーが発生しました。', {
        style: {
          background: '#f44336',
          color: '#ffffff',
          border: 'transparent'
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className='w-[212px] h-[382px] flex justify-center items-center'>
        <LoaderCircle className="animate-spin w-32 h-32 text-[#F2A09D]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        className="px-6 py-2 bg-[#F2A09D] text-white rounded-lg hover:bg-[#E07494]"
      >
        {isUpdating ? '更新する' : '投票する'}
      </button>
    </form>
  );
}
