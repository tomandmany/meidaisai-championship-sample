// // app/components/CompleteVote.tsx

// import DescriptionMain from "@/components/Singular/DescriptionMain";
// import MCCard from "@/components/Singular/MCCard";
// import Ticket from "@/components/Singular/Ticket";
// import { getUserData } from "@/data/getUserData";
// import Image from "next/image";

// export default async function CompleteVote() {
//     const { userId, data } = await getUserData();

//     if (!userId) return null;

//     const ticketUsed = data?.[0]?.ticket_used || false;

//     return (
//         <main className="flex min-h-screen flex-col items-center justify-center">
//             <div className="flex flex-col items-center w-40 sm:w-48 md:w-1/2 lg:w-5/12">
//                 <MCCard>
//                     <DescriptionMain>
//                         投票ありがとうございます
//                     </DescriptionMain>
//                     <p className="text-left text-xs sm:text-sm md:text-lg lg:text-xl">
//                         こちらの画面が
//                         <span className="text-[#E07494] underline">「明大祭大抽選会」</span>
//                         にご参加いただける
//                         <span
//                             className="relative"
//                             style={{
//                                 background: 'linear-gradient(to bottom, transparent 50%, #B1DEF5 50%)',
//                                 paddingBottom: '0.1em',
//                             }}
//                         >
//                             抽選券の引き換え画面
//                         </span>
//                         となります。参加をご希望される方は、総務局の企画受付場所である第一校舎学部掲示板前へお越しください。詳しくは公式パンフレットp.〇〇をご参照ください。
//                     </p>
//                     <Image
//                         src={'/votes/reception.svg'}
//                         alt="キャンパスマップ"
//                         width={200}
//                         height={200}
//                         className="mx-auto"
//                     />
//                     <p className="-indent-4 pl-4 mt-8 text-left text-xs sm:text-sm md:text-base lg:text-lg">
//                         ※会場にいる実行委員が押すボタンですので、
//                         <span className="font-bold text-[#E07494]">押さずに</span>
//                         会場までお越しください。
//                     </p>
//                     <Ticket userId={userId} ticketUsed={ticketUsed} />
//                 </MCCard>
//             </div>
//         </main>
//     );
// }
