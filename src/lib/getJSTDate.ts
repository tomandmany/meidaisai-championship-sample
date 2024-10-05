// 日本時間を取得する関数
export default function getJSTDate(): string {
  const now = new Date();
  return now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}