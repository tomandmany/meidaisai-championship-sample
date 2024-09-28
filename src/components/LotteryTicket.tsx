type LotteryTicketProps = {
    hasExistingDataForToday: boolean;
  };
  
  export default function LotteryTicket({ hasExistingDataForToday }: LotteryTicketProps) {
    if (!hasExistingDataForToday) return null;
  
    return (
      <div className="mt-4 text-center text-xl font-semibold text-green-600">
        抽選券
      </div>
    );
  }
  