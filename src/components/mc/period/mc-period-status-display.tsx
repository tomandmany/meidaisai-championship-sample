// app/components/mc/period/MCPeriodStatusDisplay.tsx
'use client';

import { useEffect, useState } from 'react';

interface MCPeriodStatusDisplayProps {
  day: string;
  startTime: Date;
  endTime: Date;
}

export default function MCPeriodStatusDisplay({ day, startTime, endTime }: MCPeriodStatusDisplayProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();

    if (now < startTime) {
      setStatusMessage('開始時間より前です。');
    } else if (now > endTime) {
      setStatusMessage('終了時間より後です。');
    } else {
      setStatusMessage(null); // 開始時間から終了時間の間はメッセージを表示しない
    }

    // 開始・終了時間に基づいてメッセージを動的に更新
    const startTimeout = now < startTime ? setTimeout(() => setStatusMessage(null), startTime.getTime() - now.getTime()) : null;
    const endTimeout = now < endTime ? setTimeout(() => setStatusMessage('終了時間より後です。'), endTime.getTime() - now.getTime()) : null;

    return () => {
      if (startTimeout) clearTimeout(startTimeout);
      if (endTimeout) clearTimeout(endTimeout);
    };
  }, [startTime, endTime]);

  // statusMessageがある場合にメッセージを表示
  if (statusMessage) {
    return <div>{statusMessage}</div>;
  }

  // 開始時間から終了時間の間は何も返さない
  return null;
}
