import { Card, CardContent } from "@/components/ui/card";
import MCSignInButton from "@/components/mc/mc-sign-in-button";

export default function MCAfterVotingPeriodWithOutUserID() {
    return (
        <Card className="flex justify-center items-center w-full h-full sm:max-w-lg sm:h-fit sm:p-10 rounded-none sm:rounded-xl border-none sm:border">
            <CardContent className="p-0">
                <h2 className="font-bold text-2xl leading-10 text-center mb-2">
                    投票期間は終了しました。
                </h2>
                <div className="mb-8">
                    <p>ログインすると投票履歴を見ることができます。</p>
                </div>
                <MCSignInButton />
            </CardContent>
        </Card>
    );
}