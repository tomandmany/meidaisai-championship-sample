// // app/page.tsx
// import { getTopVotesByCategory } from "@/data/getTopVotesByCategory";
// import countVotes from "@/lib/countVotes";
// import CategorySection from "@/components/Singular/CategorySection";

// export default async function Page() {
//   const votes = await getTopVotesByCategory();

//   // 各部門の上位3位を取得
//   const topBoothVotes = countVotes(votes, 'booth');
//   const topOutstageVotes = countVotes(votes, 'outstage');
//   const topRoomVotes = countVotes(votes, 'room');

//   return (
//     <main className="px-20 pt-32 flex flex-col items-center min-h-screen gap-10">
//       <h1 className="text-3xl font-bold text-center">
//         Meidaisai Championship
//         <br />
//         上位3位までの得票数
//       </h1>
//       <div className="flex flex-wrap gap-8 justify-center">
//         <CategorySection title="模擬店" votes={topBoothVotes} />
//         <CategorySection title="屋外ステージ" votes={topOutstageVotes} />
//         <CategorySection title="教室" votes={topRoomVotes} />
//       </div>
//     </main>
//   );
// }