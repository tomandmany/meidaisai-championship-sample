// @/lib/getJSTDate.ts
export default function getJSTDate(testDate?: Date): string {
  const now = new Date(); // 現在の時刻を取得

  if (testDate) {
    // testDateの年月日を保持し、現在時刻を取得する
    testDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    
    // 日本時間 (JST: UTC+9) に変換
    const jstDate = new Date(testDate.getTime() + 9 * 60 * 60 * 1000);
    return jstDate.toISOString().replace('Z', '+09:00'); // JST表記に変換
  }

  // testDateがない場合、現在の日本時間を返す
  const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jstNow.toISOString().replace('Z', '+09:00');
}
