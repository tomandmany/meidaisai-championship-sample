// // @/app/api/votes/handleVote.ts
// 'use server';

// import { insertVote } from '@/actions/insertVote';
// import { updateVote } from '@/actions/updateVote';
// import { getVotesHistory } from '@/data/getVotesHistory';
// import getJSTDate from '@/lib/getJSTDate'; // JSTを取得する関数
// import { auth } from '@clerk/nextjs/server';

// interface HandleVoteParams {
//   formData: FormData;
//   testDate?: Date;
// }

// export async function handleVote({ formData, testDate }: HandleVoteParams) {
//   const { userId } = auth();
//   if (!userId) {
//     throw new Error('ユーザーIDが取得できませんでした');
//   }

//   const booth = formData.get('booth') as string;
//   const outstage = formData.get('outstage') as string;
//   const room = formData.get('room') as string;

//   if (!booth || !outstage || !room) {
//     throw new Error('全てのフィールドを選択してください');
//   }

//   // 既存の全投票データを取得
//   const existingVotes = await getVotesHistory(userId);

//   // testDateをJSTに変換、もしくは現在の日付をJSTで取得
//   const todayJST = testDate ? getJSTDate(testDate) : getJSTDate(new Date());

//   // JSTの日付部分を文字列として取得
//   const todayJSTStr = todayJST.toString().split('T')[0];

//   console.log('Today JST string:', todayJSTStr);

//   // 当日の投票データがあるか確認 (JSTの日付部分を比較)
//   const todayVote = existingVotes.find(vote => {
//     const createdAtJST = getJSTDate(new Date(vote.created_at)); // created_atをJSTに変換
//     const createdAtStr = createdAtJST.toString().split('T')[0]; // JSTの日付部分を取得
//     console.log('Comparing dates (JST):', createdAtStr, todayJSTStr); // 日付の比較部分をログ出力
//     return createdAtStr === todayJSTStr;
//   });

//   console.log('Existing vote for today:', todayVote);

//   if (todayVote) {
//     // 既存のデータと新しいデータを比較
//     console.log('Comparing vote fields:', {
//       existingBooth: todayVote.booth,
//       newBooth: booth,
//       existingOutstage: todayVote.outstage,
//       newOutstage: outstage,
//       existingRoom: todayVote.room,
//       newRoom: room,
//     });

//     const isChanged =
//       todayVote.booth !== booth ||
//       todayVote.outstage !== outstage ||
//       todayVote.room !== room;

//     if (isChanged) {
//       console.log('Updating existing vote:', todayVote);
//       return await updateVote({
//         voteId: todayVote.id,
//         booth,
//         outstage,
//         room,
//         testDate,
//       });
//     } else {
//       console.log('No changes detected in the vote. Skipping update.');
//       return '変更が検出されませんでした';
//     }
//   } else {
//     console.log('Inserting new vote...');
//     return await insertVote({
//       user_id: userId,
//       booth,
//       outstage,
//       room,
//       testDate,
//     });
//   }
// }
