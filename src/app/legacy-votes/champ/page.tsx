// import MCForm from '@/components/MCForm';
// import LotteryTicket from '@/components/LotteryTicket';
// import SignOutButton from '@/components/SignOutButton';
// import VoteHistory from '@/components/VoteHistory';
// import SignInButton from '@/components/SignInButton';
// import BeforeVotingPeriod from '@/components/BeforeVotingPeriod';
// import AfterVotingPeriod from '@/components/AfterVotingPeriod';

// import { getVotingStatus } from '@/lib/getVotingStatus';
// import { supabase } from '@/lib/supabaseClient';

// import { getVotesHistory } from '@/data/getVotesHistory';
// import { getUserData } from '@/data/getUserData';
// import MCCard from '@/components/MCCard';
// import DescriptionItem from '@/components/DescriptionItem';
// import Image from 'next/image';

// export default async function Page({ searchParams }: { searchParams: { testDate?: string } }) {
//   const { data, userId } = await getUserData();

//   if (userId) {
//     // SupabaseにuserIdを保存
//     const { error } = await supabase
//       .from('users')
//       .upsert([{ user_id: userId }], { onConflict: 'user_id' });

//     if (error) {
//       console.error('Error inserting/updating user data:', error.message);
//     }
//   }

//   const testDate = searchParams.testDate ? new Date(`2024-${searchParams.testDate}`) : undefined;

//   // サーバーサイドで投票期間を判定
//   const votingStatus = getVotingStatus(testDate);

//   // 3日間の投票履歴を取得
//   const votesHistory = await getVotesHistory(userId!);

//   // 当日または testDate に対して投票があるか確認
//   const today = testDate || new Date();
//   const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換

//   // 当日の投票があるかどうかを確認
//   const hasExistingDataForToday = votesHistory.some(vote => {
//     const voteDateStr = new Date(vote.created_at).toISOString().split('T')[0];
//     return voteDateStr === todayStr;
//   });

//   const ticketUsed = data?.[0]?.ticket_used || false; // ticket_used の値を取得

//   console.log('userId:', userId);
//   console.log('votingStatus:', votingStatus);

//   // 投票期間前
//   if (votingStatus.isBefore) {
//     return <BeforeVotingPeriod />;
//   }

//   // 投票期間後
//   if (votingStatus.isAfter) {
//     return <AfterVotingPeriod votesHistory={votesHistory} testDate={testDate} userId={userId} />;
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center">
//       {votingStatus.isDuring && userId ? (
//         <>
//           <div className="flex flex-wrap gap-10">
//             <MCCard>
//               <MCForm userId={userId!} votesHistory={votesHistory} testDate={testDate} />
//             </MCCard>
//             <VoteHistory votesHistory={votesHistory} testDate={testDate} />
//           </div>
//           {hasExistingDataForToday && <LotteryTicket userId={userId} ticketUsed={ticketUsed} />}
//           <SignOutButton />
//         </>
//       ) : (
//         <>
//           <MCCard>
//             <DescriptionItem title='投票日時'>
//               11月2日(土)11：00～11月4日(月・祝)17：00
//             </DescriptionItem>
//             <DescriptionItem title='注意点'>
//               <span className="flex flex-col items-start pl-4 -indent-4 space-y-2">
//                 <span>・LINEアカウントのログインが必須です。</span>
//                 <span>・実施されていない団体への投票はできません。</span>
//                 <span>・LINEアカウントがない方は総合インフォメーションまで。</span>
//               </span>
//             </DescriptionItem>
//             <Image
//               src={'/votes/information.svg'}
//               alt="キャンパスマップ"
//               width={250}
//               height={250}
//               className="mx-auto"
//             />
//           </MCCard>
//           <SignInButton>投票にすすむ！</SignInButton>
//         </>
//       )}
//     </main>
//   );
// }

export default function Page() {
  return (
    <div></div>
  )
}