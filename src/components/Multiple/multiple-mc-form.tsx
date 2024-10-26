'use client';

import { useState } from 'react';

import MultipleMcFormFilter from '@/components/Multiple/multiple-mc-form-filter';
import ProjectsScrollArea from '@/components/Multiple/projects-scroll-area';
import OpenHistoryButton from '@/components/Multiple/open-history-button';
import VoteButton from '@/components/Multiple/vote-button';
import SearchBar from '@/components/Multiple/search-bar';
import History from '@/components/Multiple/history';

import { Card, CardContent } from '@/components/ui/card';

interface MultipleMCFormProps {
  user_id: string;
  votesHistory: Vote[];
  testDate?: Date;
  departments: string[];
  days: string[];
  locations: string[];
  genres: string[];
  projects: Project[];
  votedProjectIds: Set<string>;
}

export default function MultipleMCForm({ user_id, votesHistory, testDate, departments, days, locations, genres, projects, votedProjectIds }: MultipleMCFormProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    departments: new Set<string>(),
    locations: new Set<string>(),
    genres: new Set<string>()
  });
  const [selectedProjects, setSelectedProjects] = useState<{ id: string; name: string }[]>([]);

  // 投票済みのプロジェクトを除外してフィルタリング
  const filteredProjects = projects.filter(
    project =>
      !votedProjectIds.has(project.id) && // 投票済みのプロジェクトを除外
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
