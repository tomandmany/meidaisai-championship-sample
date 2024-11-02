// app/lib/getRemainingVotingTime.ts

import getJSTDate from "@/lib/getJSTDate";

export default function getRemainingVotingTimes(day: string, testDate?: Date): { startDelay: number | null; endDelay: number | null } {
    const nowString = testDate ? getJSTDate(testDate) : getJSTDate();
    const now = new Date(nowString);

    const votingPeriods: { [key: string]: { start: string; end: string } } = {
        '2024-11-02': { start: '2024-11-02T11:00:00', end: '2024-11-02T18:00:00' },
        '2024-11-03': { start: '2024-11-03T11:00:00', end: '2024-11-03T18:00:00' },
        '2024-11-04': { start: '2024-11-04T11:00:00', end: '2024-11-04T16:30:00' },
    };

    const period = votingPeriods[day];
    if (!period) {
        console.error(`日付 ${day} に対応する投票期間が見つかりません`);
        return { startDelay: null, endDelay: null };
    }

    const start = new Date(period.start);
    const end = new Date(period.end);

    const startDelay = start.getTime() > now.getTime() ? start.getTime() - now.getTime() : 0;
    const endDelay = end.getTime() > now.getTime() ? end.getTime() - now.getTime() : 0;

    // console.log(`Debug: day=${day}, now=${now}, start=${start}, end=${end}, startDelay=${startDelay}, endDelay=${endDelay}`);

    return {
        startDelay,
        endDelay
    };
}