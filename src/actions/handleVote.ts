// // @/app/api/votes/handleVote.ts
// 'use server';

// import { insertVote } from '@/actions/insertVote';
// import { updateVote } from '@/actions/updateVote';
// import { getVotesHistory } from '@/data/getVotesHistory';
// import getJSTDate from '@/lib/getJSTDate';
// import { supabase } from '@/lib/supabaseClient';
// import { auth } from '@clerk/nextjs/server';

// interface HandleVoteParams {
//   selectedProjects: { id: string; name: string }[];
//   testDate?: Date;
// }

// export async function handleVote({ selectedProjects, testDate }: HandleVoteParams) {
//   const { userId } = auth();
//   if (!userId) {
//     throw new Error('ユーザーIDが取得できませんでした');
//   }

//   if (!selectedProjects.length) {
//     throw new Error('プロジェクトが選択されていません');
//   }

//   // ユーザーが存在するか確認
//   const { data: userExists, error: userCheckError } = await supabase
//     .from('users')
//     .select('id')
//     .eq('id', userId)
//     .single();

//   if (userCheckError) {
//     console.error('ユーザー確認エラー:', userCheckError.message);
//     throw new Error('ユーザーの確認中にエラーが発生しました');
//   }

//   // ユーザーが存在しない場合、新しいユーザーを追加
//   if (!userExists) {
//     const { error: insertUserError } = await supabase.from('users').insert({
//       user_id: userId,
//     });

//     if (insertUserError) {
//       console.error('ユーザー追加エラー:', insertUserError.message);
//       throw new Error('新しいユーザーの追加中にエラーが発生しました');
//     }

//     console.log('新しいユーザーが追加されました:', userId);
//   }

//   const existingVotes = await getVotesHistory(userId);
//   const todayJST = testDate ? getJSTDate(testDate) : getJSTDate(new Date());

//   const todayVotes = existingVotes.filter(vote => {
//     const createdAtJST = getJSTDate(new Date(vote.created_at));
//     return createdAtJST === todayJST;
//   });

//   if (todayVotes.length > 0) {
//     // 既存の投票がある場合は更新
//     return await updateVote({
//       voteId: todayVotes[0].id, // 最初の投票IDを使用
//       projects: selectedProjects,
//       testDate,
//     });
//   } else {
//     // 新しい投票を挿入
//     return await insertVote({
//       user_id: userId,
//       projects: selectedProjects,
//       testDate,
//     });
//   }
// }
