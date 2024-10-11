// @/app/api/votes/handleVote.ts
'use server';

import { insertVote } from '@/actions/insertVote';
import { updateVote } from '@/actions/updateVote';
import { getVotesHistory } from '@/data/getVotesHistory';
import getJSTDate from '@/lib/getJSTDate';
import { auth } from '@clerk/nextjs/server';

interface HandleVoteParams {
  formData: FormData;
  testDate?: Date;
}

export async function handleVote({ formData, testDate }: HandleVoteParams) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('ユーザーIDが取得できませんでした');
  }

  const booth = formData.get('booth') as string;
  const outstage = formData.get('outstage') as string;
  const room = formData.get('room') as string;

  if (!booth || !outstage || !room) {
    throw new Error('全てのフィールドを選択してください');
  }

  // 既存の全投票データを取得
  const existingVotes = await getVotesHistory(userId);

  // testDateをUTCに変換
  const todayUTCStr = testDate ? testDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  console.log('Today UTC string:', todayUTCStr);

  // 当日の投票データがあるか確認 (UTCの日付部分を比較)
  const todayVote = existingVotes.find(vote => {
    const createdAtStr = new Date(vote.created_at).toISOString().split('T')[0]; // UTCに変換されたcreated_at
    console.log('Comparing dates (UTC):', createdAtStr, todayUTCStr); // 日付の比較部分をログ出力
    return createdAtStr === todayUTCStr;
  });

  console.log('Existing vote for today:', todayVote);

  if (todayVote) {
    // 既存のデータと新しいデータを比較
    console.log('Comparing vote fields:', {
      existingBooth: todayVote.booth,
      newBooth: booth,
      existingOutstage: todayVote.outstage,
      newOutstage: outstage,
      existingRoom: todayVote.room,
      newRoom: room,
    });

    const isChanged =
      todayVote.booth !== booth ||
      todayVote.outstage !== outstage ||
      todayVote.room !== room;

    if (isChanged) {
      console.log('Updating existing vote:', todayVote);
      return await updateVote({
        voteId: todayVote.id,
        booth,
        outstage,
        room,
        testDate,
      });
    } else {
      console.log('No changes detected in the vote. Skipping update.');
      return '変更が検出されませんでした';
    }
  } else {
    console.log('Inserting new vote...');
    return await insertVote({
      user_id: userId,
      booth,
      outstage,
      room,
      testDate,
    });
  }
}
