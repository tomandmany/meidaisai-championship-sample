const countVotes = (votes: { [key: string]: string }[], category: string) => {
  // 投票が存在しない場合のエラーハンドリング
  if (votes.length === 0) {
    handleWarning('投票が存在しません。', votes);
    return [];
  }

  // すべての投票データに指定されたカテゴリーが存在するかチェック
  const isValidCategory = votes.every(vote => vote.hasOwnProperty(category));

  if (!isValidCategory) {
    handleWarning('存在しないカテゴリーが指定されています。', category);
    return [];
  }

  // 投票集計処理
  const voteCounts = votes.reduce((acc: Record<string, number>, vote) => {
    const categoryValue = vote[category];

    // 存在しない企画が投票された場合の警告
    if (!categoryValue) {
      handleWarning('存在しない企画が投票されています。', vote);
      return acc; // 集計は続行
    }

    acc[categoryValue] = (acc[categoryValue] || 0) + 1;
    return acc;
  }, {});

  // 投票数の多い順にソート
  const sortedVotes = Object.entries(voteCounts).sort(([, a], [, b]) => b - a);

  return sortedVotes;
};

// 警告ログを環境に応じて出力するヘルパー関数
const handleWarning = (message: string, data: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(message, data);
  } else {
    // 本番環境ではログだけに留めるなど、対応をカスタマイズできる
    console.log(`[WARN]: ${message}`, data);
  }
};

export default countVotes;
