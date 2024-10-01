import React from 'react';

// 投票履歴を表示するための型
type Vote = {
  id: string;
  booth: string;
  outstage: string;
  room: string;
  created_at: string;
  updated_at: string;
};

type VoteHistoryProps = {
  votesHistory: Vote[];
};

export default function VoteHistory({ votesHistory }: VoteHistoryProps) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">過去3日間の投票履歴</h2>
      {votesHistory.length === 0 ? (
        <p>投票履歴がありません。</p>
      ) : (
        <ul className="space-y-4">
          {votesHistory.map((vote) => (
            <li key={vote.id} className="p-4 bg-white rounded-lg shadow-sm">
              <p>模擬店: {vote.booth}</p>
              <p>屋外ステージ: {vote.outstage}</p>
              <p>教室: {vote.room}</p>
              <p>投票日時: {new Date(vote.created_at).toLocaleString()}</p>
              <p>更新日時: {new Date(vote.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}