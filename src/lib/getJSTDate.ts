// // @/lib/getJSTDate.ts
// export default function getJSTDate(testDate?: Date): string {
//   const now = new Date(); // 現在の時刻を取得

//   if (testDate) {
//     // testDateの年月日を保持し、現在時刻を取得する
//     testDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    
//     // 日本時間 (JST: UTC+9) に変換
//     const jstDate = new Date(testDate.getTime() + 9 * 60 * 60 * 1000);
//     return jstDate.toISOString().replace('Z', '+09:00'); // JST表記に変換
//   }

//   // testDateがない場合、現在の日本時間を返す
//   const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
//   return jstNow.toISOString().replace('Z', '+09:00');
// }

// @/lib/getJSTDate.ts
export default function getJSTDate(testDate?: string | Date): string {
  const now = new Date(); // 現在の時刻を取得

  let jstDate: Date;

  if (typeof testDate === "string") {
    // "MM-DD" 形式で日付が渡された場合、現在の年を用いて Date オブジェクトを生成
    const [month, day] = testDate.split("-").map(Number);
    jstDate = new Date(now.getFullYear(), month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  } else if (testDate instanceof Date) {
    // Date 型が渡された場合、日付を尊重しつつ現在時刻を設定
    jstDate = new Date(testDate);
    jstDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  } else {
    // 引数がない場合、現在の日本時間を使用
    jstDate = now;
  }

  // JST (UTC+9) に変換
  jstDate.setTime(jstDate.getTime() + 9 * 60 * 60 * 1000);

  // 日本時間としての文字列に変換し返す
  const year = jstDate.getUTCFullYear();
  const month = String(jstDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jstDate.getUTCDate()).padStart(2, "0");
  const hours = String(jstDate.getUTCHours()).padStart(2, "0");
  const minutes = String(jstDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(jstDate.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+09:00`;
}