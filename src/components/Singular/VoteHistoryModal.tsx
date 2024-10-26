// 'use client';

// import { useState, useEffect } from "react";
// import VoteHistoryButton from "./VoteHistoryButton";
// import Image from "next/image";
// import MCCard from "./MCCard";
// import DescriptionItem from "./DescriptionItem";

// interface VoteHistoryModalProps {
//   votesHistory: Vote[];
//   testDate?: Date;
// };

// function VoteHistoryCard({ votesHistory, currentDate, votingStart, votingEnd }: { votesHistory: Vote[], currentDate: Date, votingStart: Date, votingEnd: Date }) {
//   return (
//     <div className="flex gap-12 justify-center flex-wrap">
//       {votesHistory.map((vote) => {
//         const voteDate = new Date(vote.created_at);
//         voteDate.setHours(0, 0, 0, 0); // 日付だけを比較するためにリセット

//         let dayLabel: string | undefined;
//         let isToday = voteDate.getTime() === currentDate.getTime(); // 今日の投票かどうか判定
//         if (isToday) {
//           dayLabel = 'Today'; // 今日の日付と一致する場合
//         } else if (voteDate >= votingStart && voteDate <= votingEnd) {
//           // 投票期間内の日付に応じた表示
//           switch (voteDate.getDate()) {
//             case 2:
//               dayLabel = 'Day1';
//               break;
//             case 3:
//               dayLabel = 'Day2';
//               break;
//             case 4:
//               dayLabel = 'Day3';
//               break;
//             default:
//               dayLabel = undefined;
//           }
//         }

//         if (!dayLabel) {
//           return <p key={vote.id}>期間内に投票がありません。</p>;
//         }

//         return (
//           <MCCard key={vote.id} className={`px-10 py-8 shadow-md w-96 space-y-4 ${isToday ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-white'}`}>
//             <h3 className={`text-2xl text-left font-bold mb-6 ${isToday ? 'text-yellow-600' : 'text-[#E07494]'}`}>{dayLabel}</h3>
//             <DescriptionItem title="屋外ステージ部門">
//               {vote.outstage}
//             </DescriptionItem>
//             <DescriptionItem title="模擬店部門">
//               {vote.booth}
//             </DescriptionItem>
//             <DescriptionItem title="教室部門">
//               {vote.room}
//             </DescriptionItem>
//           </MCCard>
//         );
//       })}
//     </div>
//   )
// }

// export default function VoteHistoryModal({ votesHistory, testDate }: VoteHistoryModalProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const votingStart = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_START!);
//   const votingEnd = new Date(process.env.NEXT_PUBLIC_VOTING_PERIOD_END!);

//   // testDateが指定されていなければ今日の日付を使う
//   const currentDate = testDate ? new Date(testDate) : new Date();
//   currentDate.setHours(0, 0, 0, 0); // 時刻部分をリセットして日付のみ比較

//   // 投票履歴が開かれたらスクロール禁止、閉じたらスクロールを再許可
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     // クリーンアップ関数
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isOpen]);

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed left-0 top-0 w-screen h-screen p-20 space-y-20 bg-gray-100 overflow-auto z-mc-history-modal">
//           <h2 className="font-bold flex flex-col items-end mx-auto w-fit">
//             <span className="text-[#E07494] text-5xl">VotingRecord</span>
//             <span className="text-[#64BDEB] text-2xl">投票履歴</span>
//           </h2>
//           {votesHistory.length === 0 ? (
//             <p>投票履歴がありません。</p>
//           ) : (
//             <VoteHistoryCard votesHistory={votesHistory} currentDate={currentDate} votingStart={votingStart} votingEnd={votingEnd} />
//           )}
//           <Image
//             src={'/votes/bottom.svg'}
//             alt="下の飾り"
//             width={1920}
//             height={1080}
//             className="fixed left-0 bottom-0 z-mc-bg"
//           />
//         </div>
//       )}
//       <VoteHistoryButton isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
//     </>
//   );
// }
