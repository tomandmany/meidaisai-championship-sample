'use client';

import { useState } from 'react';

import MultipleMcFormFilter from '@/components/Multiple/multiple-mc-form-filter';
import ProjectsScrollArea from '@/components/Multiple/projects-scroll-area';
import OpenHistoryButton from '@/components/Multiple/open-history-button';
import VoteButton from '@/components/Multiple/vote-button';
import SearchBar from '@/components/Multiple/search-bar';
import History from '@/components/Multiple/history';

import { Card, CardContent } from '@/components/ui/card';

const departments = ['模擬店部門', '屋外ステージ部門', '教室部門'];
const days = ['2024-11-02', '2024-11-03', '2024-11-04'];
const locations = ['A棟', 'B棟', 'C棟', '中庭', '体育館', '講堂'];
const genres = ['食べ物', 'ゲーム', 'パフォーマンス', '展示', '体験', '音楽'];

const projects: Project[] = [
  { id: '1', name: 'たい焼き屋', description: '美味しいたい焼きを販売します', department: '模擬店部門', day: '11-02', location: 'A棟', genre: '食べ物' },
  { id: '2', name: 'ダンスパフォーマンス', description: '迫力満点のダンスショー', department: '屋外ステージ部門', day: '11-02', location: '中庭', genre: 'パフォーマンス' },
  { id: '3', name: '科学実験教室', description: '楽しく学べる科学実験', department: '教室部門', day: '11-02', location: 'B棟', genre: '展示' },
  { id: '4', name: 'お好み焼きスタンド', description: '関西風お好み焼きを提供', department: '模擬店部門', day: '11-03', location: 'C棟', genre: '食べ物' },
  { id: '5', name: 'アカペラライブ', description: '学生によるアカペラコンサート', department: '屋外ステージ部門', day: '11-03', location: '講堂', genre: '音楽' },
  { id: '6', name: 'VR体験コーナー', description: '最新VR技術を体験できます', department: '教室部門', day: '11-03', location: 'A棟', genre: '体験' },
  { id: '7', name: 'クレープ屋さん', description: 'オリジナルクレープを作ろう', department: '模擬店部門', day: '11-04', location: '中庭', genre: '食べ物' },
  { id: '8', name: 'ロボットショー', description: '自作ロボットのデモンストレーション', department: '屋外ステージ部門', day: '11-04', location: '体育館', genre: 'パフォーマンス' },
  { id: '9', name: '古本市', description: '掘り出し物が見つかるかも', department: '教室部門', day: '11-04', location: 'B棟', genre: '展示' },
  { id: '10', name: 'スマッシュボール', description: 'ストレス発散ゲーム', department: '模擬店部門', day: '11-02', location: 'C棟', genre: 'ゲーム' },
  { id: '11', name: 'ジャズバンド演奏', description: 'スイングジャズの生演奏', department: '屋外ステージ部門', day: '11-02', location: '講堂', genre: '音楽' },
  { id: '12', name: '写真展', description: '学生が撮影した写真の展示', department: '教室部門', day: '11-02', location: 'A棟', genre: '展示' },
  { id: '13', name: 'たこ焼きスタンド', description: '大阪風たこ焼きを提供', department: '模擬店部門', day: '11-03', location: '中庭', genre: '食べ物' },
  { id: '14', name: 'マジックショー', description: '驚きの手品パフォーマンス', department: '屋外ステージ部門', day: '11-03', location: '体育館', genre: 'パフォーマンス' },
  { id: '15', name: '謎解きゲーム', description: '教室を使った謎解き脱出ゲーム', department: '教室部門', day: '11-03', location: 'C棟', genre: 'ゲーム' },
  { id: '16', name: '謎解きゲーム', description: '教室を使った謎解き脱出ゲーム', department: '教室部門', day: '11-04', location: 'C棟', genre: 'ゲーム' },
  { id: '17', name: '謎解きゲーム', description: '教室を使った謎解き脱出ゲーム', department: '教室部門', day: '11-02', location: 'C棟', genre: 'ゲーム' },
]

interface MultipleMCFormProps {
  user_id: string;
  votesHistory: Vote[];
  testDate?: Date;
}

export default function MultipleMCForm({ user_id, votesHistory, testDate }: MultipleMCFormProps) {
  const [votes, setVotes] = useState<Record<string, Vote[]>>({});
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    departments: new Set<string>(),
    locations: new Set<string>(),
    genres: new Set<string>()
  });
  const [selectedProjects, setSelectedProjects] = useState<{ id: string; name: string }[]>([]);

  const filteredProjects = projects.filter(project =>
    (searchTerm === '' || project.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.departments.size === 0 || filters.departments.has(project.department)) &&
    (filters.locations.size === 0 || filters.locations.has(project.location)) &&
    (filters.genres.size === 0 || filters.genres.has(project.genre))
  );

  const updateFilter = (type: 'departments' | 'locations' | 'genres', value: string) => {
    setFilters(prev => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };

  const resetFilter = (type: 'departments' | 'locations' | 'genres') => {
    setFilters(prev => ({ ...prev, [type]: new Set<string>() }));
  };

  return (
    <form className="container mx-auto max-w-4xl relative sm:p-4">
      {!showHistory ? (
        <Card className="-mb-24 sm:mb-0 sm:max-w-xl mx-auto border-none rounded-none sm:rounded-3xl shadow-none sm:shadow-lg h-[calc(100svh-50px)] sm:h-[calc(100svh-(50px+2rem))]">
          <CardContent className="px-8 py-4 sm:py-10 flex flex-col min-h-full max-h-full">
            <div className="flex gap-2 mb-2">
              <MultipleMcFormFilter departments={departments} locations={locations} genres={genres} filters={filters} updateFilter={updateFilter} resetFilter={resetFilter} />
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ProjectsScrollArea selectedProjects={selectedProjects} setSelectedProjects={setSelectedProjects} filteredProjects={filteredProjects} />
            <VoteButton user_id={user_id} testDate={testDate} selectedProjects={selectedProjects} />
          </CardContent>
        </Card>
      ) : (
        <History user_id={user_id} days={days} departments={departments} projects={projects} votesHistory={votesHistory} />
      )}
      <OpenHistoryButton showHistory={showHistory} setShowHistory={setShowHistory} />
    </form>
  );
}
