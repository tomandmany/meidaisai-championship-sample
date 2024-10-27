'use client';

import { useState } from 'react';

import MultipleMcFormFilter from '@/components/mc/mc-form-filter';
import ProgramsScrollArea from '@/components/mc/mc-programs-scroll-area';
import OpenHistoryButton from '@/components/mc/mc-toggle-history-button';
import VoteButton from '@/components/mc/mc-vote-button';
import SearchBar from '@/components/mc/mc-search-bar';
import History from '@/components/mc/mc-history';

import { Card, CardContent } from '@/components/ui/card';

interface MultipleMCFormProps {
  user_id: string;
  votesHistory: Vote[];
  testDate?: Date;
  types: string[];
  days: string[];
  // places: string[];
  // genres: string[];
  allPrograms: Program[];
  filteredPrograms: Program[];
}

export default function MultipleMCForm({
  user_id,
  votesHistory,
  testDate,
  types,
  days,
  // places,
  // genres,
  allPrograms,
  filteredPrograms: programs,
}: MultipleMCFormProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    types: new Set<string>(),
    places: new Set<string>(),
    genres: new Set<string>(),
  });
  const [selectedPrograms, setSelectedPrograms] = useState<{ id: string; title: string }[]>([]);

  const filteredPrograms = programs.filter(
    program =>
      (searchTerm === '' || program.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.types.size === 0 || filters.types.has(program.type)) &&
      (filters.places.size === 0 || filters.places.has(program.place)) &&
      (filters.genres.size === 0 || filters.genres.has(program.genre))
  );

  const updateFilter = (type: 'types' | 'places' | 'genres', value: string) => {
    setFilters(prev => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };

  const resetFilter = (type: 'types' | 'places' | 'genres') => {
    setFilters(prev => ({ ...prev, [type]: new Set<string>() }));
  };

  return (
    <form className="container mx-auto h-full max-w-4xl relative sm:p-4">
      {!showHistory ? (
        <Card className="-mb-24 sm:mb-0 sm:max-w-xl mx-auto border-none rounded-none sm:rounded-3xl shadow-none sm:shadow-lg h-[calc(100svh-50px)] sm:h-[calc(100svh-(50px+2rem))]">
          <CardContent className="px-8 py-4 sm:py-10 flex flex-col min-h-full max-h-full">
            <div className="flex gap-2 mb-2">
              <MultipleMcFormFilter
                types={types}
                // places={places}
                // genres={genres}
                filters={filters}
                updateFilter={updateFilter}
                resetFilter={resetFilter}
              />
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ProgramsScrollArea
              selectedPrograms={selectedPrograms}
              setSelectedPrograms={setSelectedPrograms}
              filteredPrograms={filteredPrograms}
            />
            <VoteButton
              user_id={user_id}
              testDate={testDate}
              selectedPrograms={selectedPrograms}
              setSelectedPrograms={setSelectedPrograms} // 選択プロジェクトをクリアするための関数を渡す
            />
          </CardContent>
        </Card>
      ) : (
        <History
          user_id={user_id}
          days={days}
          types={types}
          programs={allPrograms}
          votesHistory={votesHistory}
        />
      )}
      <OpenHistoryButton showHistory={showHistory} setShowHistory={setShowHistory} />
    </form>
  );
}