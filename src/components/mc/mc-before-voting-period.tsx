import { Card, CardContent } from "../ui/card";
import MCLabel from "./mc-label";

export default function MCBeforeVotingPeriod() {
    return (
        <Card className="flex justify-center items-center w-full h-full sm:max-w-md sm:h-fit sm:py-16 rounded-none sm:rounded-xl border-none sm:border">
            <CardContent className="space-y-4 p-4">
                <h2 className="font-bold text-2xl leading-10 text-center">
                    投票期間前です。
                    <br />
                    もうしばらくお待ちください。
                </h2>
                <div className="space-y-2">
                    <MCLabel>投票日時</MCLabel>
                    <p>11月2日(土)11：00～11月4日(月・祝)17：00</p>
                </div>
            </CardContent>
        </Card>
    );
}