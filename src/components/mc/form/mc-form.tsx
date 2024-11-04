// app/components/mc/form/mc-form.tsx

'use client';

import { useState } from 'react';

import MCFormScrollArea from '@/components/mc/form/mc-form-scroll-area';
import MCFormVoteButton from '@/components/mc/form/mc-form-vote-button';
import MCFormSearchBar from '@/components/mc/form/mc-form-search-bar';
import MCFormFilter from '@/components/mc/form/mc-form-filter';
import MCHistoryToggleButton from '@/components/mc/history/mc-history-toggle-button';
import MCHistory from '@/components/mc/history/mc-history';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface MCFormProps {
    user_id: string;
    votesHistory: Vote[];
    testDate?: Date;
    departments: string[];
    days: string[];
    allPrograms: Program[];
    filteredPrograms: Program[];
}

export default function MCForm({
    user_id,
    votesHistory,
    testDate,
    departments,
    days,
    allPrograms,
    filteredPrograms: programs,
}: MCFormProps) {
    const [showHistory, setShowHistory] = useState<boolean>(false);
    // const [votes, setVotes] = useState<Vote[]>(votesHistory);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPrograms, setSelectedPrograms] = useState<{ id: string; title: string, department: string, date: string }[]>([]);
    const [filters, setFilters] = useState({
        departments: new Set<string>(),
        places: new Set<string>(),
        genres: new Set<string>(),
    });

    // useEffect(() => {
    //     if (votes) {
    //       const votesChannel = supabase
    //         .channel('public:votes')
    //         .on('postgres_changes', { event: '*', schema: 'public', table: 'votes' }, (payload) => {
    //           setVotes((prevVotes) => {
    //             if (!prevVotes) return [];
    //             if (payload.eventType === 'INSERT') {
    //               if (prevVotes.some(vote => vote.id === payload.new.id)) {
    //                 return prevVotes;
    //               }
    //               return [...prevVotes, payload.new as Vote];
    //             } else if (payload.eventType === 'UPDATE') {
    //               return prevVotes.map((vote) => (vote.id === (payload.new as Vote).id ? (payload.new as Vote) : vote));
    //             } else if (payload.eventType === 'DELETE') {
    //               return prevVotes.filter((vote) => vote.id !== (payload.old as Vote).id);
    //             }
    //             return prevVotes;
    //           });
    //         })
    //         .subscribe();
    
    //       return () => {
    //         votesChannel.unsubscribe();
    //       };
    //     }
    
    
    //   }, [votes]);

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
        const searchInProgram = Object.entries(program)
            .map(([key, value]) => {
                if (typeof value === 'string') {
                    return value.toLowerCase();
                } else if (Array.isArray(value)) {
                    return value.map((item) => (typeof item === 'string' ? item.toLowerCase() : '')).join(' ');
                }
                return '';
            })
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
    

    // const filteredPrograms = programs.filter((program) => {
    //     const searchInProgram = Object.values(program)
    //         .map((value) => (typeof value === 'string' ? value.toLowerCase() : ''))
    //         .join(' ');

    //     const matchesSearchTerm =
    //         searchTerm === '' || searchInProgram.includes(searchTerm.toLowerCase());

    //     const matchesDepartment =
    //         filters.departments.size === 0 || filters.departments.has(program.department);

    //     const matchesPlace =
    //         filters.places.size === 0 || filters.places.has(program.place);

    //     const matchesGenre =
    //         filters.genres.size === 0 || filters.genres.has(program.genre);

    //     return matchesSearchTerm && matchesDepartment && matchesPlace && matchesGenre;
    // });

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
                <Card className="-mb-24 sm:mb-0 sm:max-w-xl mx-auto border-none rounded-none sm:rounded-3xl shadow-none sm:shadow-lg h-[calc(100svh-50px)] sm:h-[calc(100svh-(50px+2rem))] bg-mc-form">
                    <CardContent className="px-8 py-4 sm:py-10 flex flex-col min-h-full max-h-full">
                        <div className="flex gap-2 mb-2 items-center">
                            <MCFormFilter
                                departments={departments}
                                filters={filters}
                                updateFilter={updateFilter}
                                resetFilter={resetFilter}
                            />
                            <MCFormSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <Image
                                src="/votes/logo.svg"
                                alt="ロゴ"
                                width={50}
                                height={50}
                                className="lg:hidden pointer-events-none"
                            />
                        </div>
                        {filteredPrograms.length > 0 ? (
                            <MCFormScrollArea
                                selectedPrograms={selectedPrograms}
                                setSelectedPrograms={setSelectedPrograms}
                                filteredPrograms={filteredPrograms}
                            />
                        ) : (
                            <ScrollArea className="flex-grow rounded-md border p-2 sm:pb-2 h-[calc(618px-(36px*3+8px*2))] sm:h-[618px] relative bg-white">
                                <Image src="/votes/logo.svg" alt="ロゴ" width={92} height={92} className="lg:hidden absolute bottom-4 right-4 pointer-events-none opacity-60" />
                                <p className="text-gray-500 mt-4 text-center">一致するプログラムがありません。</p>
                            </ScrollArea>
                        )}
                        <MCFormVoteButton
                            user_id={user_id}
                            testDate={testDate}
                            selectedPrograms={selectedPrograms}
                            setSelectedPrograms={setSelectedPrograms}
                        />
                    </CardContent>
                </Card>
            ) : (
                <MCHistory
                    user_id={user_id}
                    days={days}
                    departments={departments}
                    programs={allPrograms}
                    votesHistory={votesHistory}
                    testDate={testDate}
                />
            )}
            {/* <MCHistoryToggleButton
                showHistory={showHistory}
                setShowHistory={setShowHistory}
            /> */}
        </form>
    );
}