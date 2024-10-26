// 'use client'

// import Image from "next/image";

// interface VoteHistoryButtonProps {
//   isOpen: boolean;
//   handleOpen: () => void;
// }

// export default function VoteHistoryButton({ isOpen, handleOpen }: VoteHistoryButtonProps) {
//   return (
//     <button
//       type="button"
//       className="fixed right-4 bottom-4 z-mc-history-button"
//       onClick={handleOpen}
//     >
//       <Image
//         src={isOpen ? '/votes/history-close.svg' : '/votes/history-open.svg'}
//         alt={isOpen ? "投票履歴を閉じる" : "投票履歴を見る"}
//         width={100}
//         height={100}
//         priority={true}  // これで画像が優先してロードされるようにする
//       />
//     </button>
//   );
// }
