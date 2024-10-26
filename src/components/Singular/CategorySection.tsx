// // カテゴリーごとに表示するコンポーネント
// type CategorySectionProps = {
//   title: string;
//   votes: [string, number][];
// };

// export default function CategorySection({ title, votes }: CategorySectionProps) {
//   const getCrownIcon = (rank: number) => {
//     if (rank === 1) return '👑'; // 1位の王冠
//     if (rank === 2) return '🥈'; // 2位のアイコン
//     if (rank === 3) return '🥉'; // 3位のアイコン
//     return null; // それ以外の順位にはアイコンを表示しない
//   };

//   let currentRank = 1;
//   let currentVoteCount = votes.length > 0 ? votes[0][1] : 0;

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
//       <h2 className="text-2xl font-semibold mb-4">{title}部門</h2>
//       <ul className="space-y-2">
//         {votes.length > 0 ? (
//           votes.map(([name, count], index) => {
//             // 票数が異なる場合は順位を更新
//             if (count < currentVoteCount) {
//               currentRank += 1;
//               currentVoteCount = count;
//             }

//             return (
//               <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md gap-4">
//                 <div className="flex items-center space-x-3">
//                   <span className="text-2xl">{getCrownIcon(currentRank)}</span> {/* 王冠アイコン */}
//                   <span>{name}</span>
//                 </div>
//                 <span className="text-blue-600 font-bold">{count} 票</span>
//               </li>
//             );
//           })
//         ) : (
//           <p className="text-gray-500">投票されていません。</p>
//         )}
//       </ul>
//     </div>
//   );
// }