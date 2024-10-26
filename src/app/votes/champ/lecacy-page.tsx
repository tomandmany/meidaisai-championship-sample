// import MCForm from '@/components/Singular/MCForm';
// import Ticket from '@/components/Singular/Ticket';
// import SignOutButton from '@/components/Singular/SignOutButton';
// import VoteHistoryModal from '@/components/Singular/VoteHistoryModal';
// import SignInButton from '@/components/Singular/SignInButton';
// import BeforeVotingPeriod from '@/components/Singular/BeforeVotingPeriod';
// import AfterVotingPeriod from '@/components/Singular/AfterVotingPeriod';

// import { getVotingStatus } from '@/lib/getVotingStatus';
// import { supabase } from '@/lib/supabaseClient';

// import { getVotesHistory } from '@/data/getVotesHistory';
// import { getUserData } from '@/data/getUserData';
// import MCCard from '@/components/Singular/MCCard';
// import DescriptionItem from '@/components/Singular/DescriptionItem';
// import Image from 'next/image';
// import Link from 'next/link';

// export default async function Page({ searchParams }: { searchParams: { testDate?: string } }) {
//   const { userId } = await getUserData();

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
//             <VoteHistoryModal votesHistory={votesHistory} testDate={testDate} />
//           </div>
//           {/* {hasExistingDataForToday && <Ticket userId={userId} ticketUsed={ticketUsed} />} */}
//           {hasExistingDataForToday && (
//             <MCCard className='mt-6 p-8 w-[310px] space-y-3'>
//               <p className='text-left text-sm'>
//                 投票ありがとうございます！
//                 <br />
//                 こちらから
//                 <span
//                   className="relative"
//                   style={{
//                     background: 'linear-gradient(to bottom, transparent 50%, #B1DEF5 50%)',
//                     paddingBottom: '0.1em',
//                   }}
//                 >
//                   「明大祭大抽選会」
//                 </span>
//                 抽選券の引き換え画面へとお進みください。
//               </p>
//               <Link
//                 href={'/votes/champ/completion'}
//                 className="inline-block px-6 py-2 bg-[#F2A09D] text-white rounded-lg hover:bg-[#E07494]"
//               >
//                 引き換え画面
//               </Link>
//             </MCCard>
//           )}
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
