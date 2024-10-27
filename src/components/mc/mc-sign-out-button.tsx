'use client';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { getVotingStatus } from '@/lib/getVotingStatus';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  const { signOut } = useAuth();
  const [redirectUrl, setRedirectUrl] = useState('/'); // デフォルトは期間外のリダイレクト先

  useEffect(() => {
    const { isDuring } = getVotingStatus();

    // 投票期間中かどうかを判定し、リダイレクト先を設定
    if (isDuring) {
      setRedirectUrl('/sign-in');
    } else {
      setRedirectUrl(`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL}`);
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
      className="p-6 text-white rounded-full bg-red-200 hover:bg-red-400 fixed top-6 right-6 flex flex-col justify-center items-center gap-2"
      // className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 fixed top-4 right-4"
      onClick={handleSignOut}  // ログアウト後にトーストを表示
    >
      {/* ログアウトする */}
      <LogOut size={36} />
      <span className='text-sm'>ログアウト</span>
    </button>
  );
}
