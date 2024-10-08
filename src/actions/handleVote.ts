'use server';

import { insertVote } from '@/actions/insertVote';
import { updateVote } from '@/actions/updateVote';
import { getVotesHistory } from '@/data/getVotesHistory';
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

  // 既存の投票データを取得
  const existingVote = await getVotesHistory(userId);

  console.log('Existing vote:', existingVote);

  if (existingVote.length > 0) {
    // 既存のデータと新しいデータが異なるか確認
    const isChanged =
      existingVote[0].booth !== booth ||
      existingVote[0].outstage !== outstage ||
      existingVote[0].room !== room;

    if (isChanged) {
      console.log('Updating existing vote...', existingVote);
      return await updateVote({
        voteId: existingVote[0].id,
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
      line_id: userId,
      booth,
      outstage,
      room,
      testDate,
    });
  }
}
