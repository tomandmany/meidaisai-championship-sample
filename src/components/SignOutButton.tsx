'use client';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { isVotingPeriod } from '@/lib/votingPeriod';

export default function SignOutButton() {
  const { signOut } = useAuth();
  const [redirectUrl, setRedirectUrl] = useState('/'); // デフォルトは期間外のリダイレクト先

  useEffect(() => {
    const { isDuring } = isVotingPeriod();

    // 投票期間中かどうかを判定し、リダイレクト先を設定
    if (isDuring) {
      setRedirectUrl('/sign-in');
    } else {
      setRedirectUrl('/votes/champ');
    }
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirectUrl });  // ログアウト処理を実行

    // トーストでログアウト完了の通知を表示
    toast.success('ログアウトしました', {
      style: {
        background: '#ff4747', // 背景色（赤）
        color: '#fff', // テキスト色（白）
      },
    });

    // ページリダイレクト
    window.location.href = redirectUrl;
  };

  return (
    <button
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      onClick={handleSignOut}  // ログアウト後にトーストを表示
    >
      ログアウト
    </button>
  );
}
