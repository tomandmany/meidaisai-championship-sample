'use client';

import { useState } from 'react';

import McFormFilter from '@/components/mc/mc-form-filter';
import ProgramsScrollArea from '@/components/mc/mc-programs-scroll-area';
import MCToggleHistoryAndResultButton from '@/components/mc/mc-toggle-history-and-result-button';
import VoteButton from '@/components/mc/mc-vote-button';
import SearchBar from '@/components/mc/mc-search-bar';
import History from '@/components/mc/mc-history';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import Image from 'next/image';

interface MCFormProps {
  user_id: string;
  votesHistory: Vote[];
  testDate?: Date;
  departments: string[];
  days: string[];
  // places: string[];
  // genres: string[];
  allPrograms: Program[];
  filteredPrograms: Program[];
}

export default function MCForm({
  user_id,
  votesHistory,
  testDate,
  departments,
  days,
  // places,
  // genres,
  allPrograms,
  filteredPrograms: programs,
}: MCFormProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<{ id: string; title: string, department: string }[]>([]);
  const [filters, setFilters] = useState({
    departments: new Set<string>(),
    places: new Set<string>(),
    genres: new Set<string>(),
  });

  const updateFilter = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };

  const resetFilter = (type: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [type]: new Set<string>() }));
  };

  const filteredPrograms = programs.filter((program) => {
    const searchInProgram = Object.values(program)
      .map((value) => (typeof value === 'string' ? value.toLowerCase() : ''))
      .join(' ');
  
    const matchesSearchTerm =
      searchTerm === '' || searchInProgram.includes(searchTerm.toLowerCase());
  
    const matchesDepartment =
      filters.departments.size === 0 || filters.departments.has(program.department);
  
    const matchesPlace =
      filters.places.size === 0 || filters.places.has(program.place);
  
    const matchesGenre =
      filters.genres.size === 0 || filters.genres.has(program.genre);
  
    return matchesSearchTerm && matchesDepartment && matchesPlace && matchesGenre;
  });  
  
  // const filteredPrograms = programs.filter(
  //   program =>
  //     (searchTerm === '' || program.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     (filters.departments.size === 0 || filters.departments.has(program.department)) &&
  //     (filters.places.size === 0 || filters.places.has(program.place)) &&
  //     (filters.genres.size === 0 || filters.genres.has(program.genre))
  // );

  return (
    <form className="container mx-auto h-full max-w-4xl relative sm:p-4">
      {!showHistory ? (
        <Card className="-mb-24 sm:mb-0 sm:max-w-xl mx-auto border-none rounded-none sm:rounded-3xl shadow-none sm:shadow-lg h-[calc(100svh-50px)] sm:h-[calc(100svh-(50px+2rem))]">
          <CardContent className="px-8 py-4 sm:py-10 flex flex-col min-h-full max-h-full">
            <div className="flex gap-2 mb-2">
              <McFormFilter
                departments={departments}
                filters={filters}
                updateFilter={updateFilter}
                resetFilter={resetFilter}
              />
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            {filteredPrograms.length > 0 ? (
              <ProgramsScrollArea
                selectedPrograms={selectedPrograms}
                setSelectedPrograms={setSelectedPrograms}
                filteredPrograms={filteredPrograms}
              />
            ) : (
              <ScrollArea className="flex-grow rounded-md border p-2 sm:pb-2 h-[calc(618px-(36px*3+8px*2))] sm:h-[618px] relative">
                <Image src="/votes/logo.svg" alt="ロゴ" width={92} height={92} className="lg:hidden absolute bottom-4 right-4 pointer-events-none opacity-60" />
                <p className="text-gray-500 mt-4 text-center">一致するプログラムがありません。</p>
              </ScrollArea>
            )}
            <VoteButton
              user_id={user_id}
              testDate={testDate}
              selectedPrograms={selectedPrograms}
              setSelectedPrograms={setSelectedPrograms}
            />
          </CardContent>
        </Card>
      ) : (
        <History
          user_id={user_id}
          days={days}
          departments={departments}
          programs={allPrograms}
          votesHistory={votesHistory}
          testDate={testDate}
        />
      )}
      <MCToggleHistoryAndResultButton showHistory={showHistory} setShowHistory={setShowHistory} />
    </form>
  );

}