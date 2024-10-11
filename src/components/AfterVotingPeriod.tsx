import SignOutButton from "./SignOutButton";
import VoteHistory from "./VoteHistory";
import MCCard from "./MCCard";
import DescriptionMain from "./DescriptionMain";
import SignInButton from "./SignInButton";
import DescriptionItem from "./DescriptionItem";

type AfterVotingPeriodProps = {
    votesHistory: Vote[];
    testDate?: Date;
    userId: string | null;
}

export default function AfterVotingPeriod({ votesHistory, testDate, userId }: AfterVotingPeriodProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
            {userId ? (
                <>
                    <MCCard>
                        <DescriptionMain>
                            投票期間は終了しました。
                        </DescriptionMain>
                        <DescriptionItem title="投票日時">
                            11月2日(土)11：00～11月4日(月・祝)17：00
                        </DescriptionItem>
                    </MCCard>
                    <VoteHistory votesHistory={votesHistory} testDate={testDate} />
                    <SignOutButton />
                </>
            ) : (
                <>
                    <MCCard>
                        <DescriptionMain>
                            投票期間は終了しました。
                        </DescriptionMain>
                        <p>ログインすると投票履歴を見ることができます。</p>
                    </MCCard>
                    <SignInButton>ログインする</SignInButton>
                </>
            )}
        </main>
    );
}