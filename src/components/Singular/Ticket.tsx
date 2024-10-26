// 'use client';

// import { useState } from 'react';
// import { ArrowRight, Check, LoaderCircle } from 'lucide-react';

// type TicketProps = {
//   userId: string;
//   ticketUsed: boolean;
// };

// export default function Ticket({ userId, ticketUsed }: TicketProps) {
//   const [isTicketUsed, setIsTicketUsed] = useState(ticketUsed);
//   const [isMoving, setIsMoving] = useState(false); // 青い四角が動いているかどうかの状態

//   const handleTicketClick = async () => {
//     try {
//       setIsMoving(true); // アニメーション開始
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket`, {
//         method: 'PUT', // PUT メソッドを使用
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         setTimeout(() => {
//           setIsTicketUsed(true); // `true` に固定
//           setIsMoving(false); // アニメーション終了後リセット
//         }, 500); // アニメーションの時間を500msに設定
//       } else {
//         console.error('Failed to update ticket status');
//         setIsMoving(false);
//       }
//     } catch (error) {
//       console.error('Error updating ticket status:', error);
//       setIsMoving(false);
//     }
//   };

//   return (
//     <div className={`p-[2px] border border-gray-400 rounded-lg w-[300px] mx-auto bg-white z-mc-ticket
//       ${!isTicketUsed && 'hover:bg-blue-100'}
//     `}>
//       {/* ボタン */}
//       <button
//         onClick={handleTicketClick}
//         disabled={isTicketUsed || isMoving} // 使用済みまたは移動中ならボタンを無効にする
//         className={`flex items-center w-full h-14 rounded-lg relative overflow-hidden
//           ${isTicketUsed ? 'cursor-not-allowed text-gray-400' : 'text-gray-600 hover:bg-blue-100'}
//           transition duration-200 ease-in-out`}
//       >
//         {/* 左側の青い四角 */}
//         <div
//           className={`flex items-center justify-center w-1/2 h-full bg-blue-400 rounded-lg absolute transition-transform duration-500 ease-in-out text-white
//           ${isTicketUsed ? 'translate-x-full bg-gray-400' : 'translate-x-0 bg-blue-400'}`} // 使用済みの場合は右側に移動
//         >
//           {isTicketUsed
//             ?
//             <Check />
//             :
//             (
//               isMoving
//                 ? <LoaderCircle className="animate-spin" /> /* 回転アニメーションを追加 */
//                 : <ArrowRight />
//             )
//           }
//         </div>

//         {/* 左側のテキスト */}
//         <span className={`w-1/2 text-center font-semibold text-sm ${isTicketUsed ? 'text-gray-400' : 'text-gray-600'}`}>
//           使用済み
//         </span>

//         {/* 右側のテキスト */}
//         <span className={`w-1/2 text-center font-semibold text-sm ${isTicketUsed ? 'text-gray-400' : 'text-gray-600'}`}>
//           チケットを使用する
//         </span>
//       </button>
//     </div>
//   );
// }
