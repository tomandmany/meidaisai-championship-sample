// app/components/History.tsx

'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface HistoryProps {
    days: string[];
    departments: string[];
    projects: Project[];
    votes: Record<string, Vote[]>;
}

export default function History({ days, departments, projects, votes }: HistoryProps) {
    return (
        <div className="fixed inset-0 border-none z-mc-history-modal overflow-auto rounded-none bg-[#F3F4F6]">
            <div className="font-bold text-2xl text-white p-6 bg-[#E07494] sticky left-0 top-0 z-mc-history-title">
                投票履歴
            </div>
            <div className="px-6 pt-7 pb-10 sm:py-0 sm:h-[calc(100svh-80px)] flex flex-col sm:flex-row flex-wrap sm:items-center gap-5">
                {days.map((day) => (
                    <Card key={day} className='flex-grow'>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{day}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {departments.map((dept) => {
                                const filteredVotes = votes[day]?.filter(
                                    (vote) => projects.find(
                                        (p) => p.id === vote.projectId && p.department === dept
                                    )
                                ) || [];

                                const isScrollable = filteredVotes.length >= 3; // 5個以上の投票があるか判定

                                return (
                                    <div key={`${day}-${dept}`} className="ml-4 mb-6">
                                        <h4 className="font-medium text-lg">{dept}:</h4>
                                        {filteredVotes.length === 0 ? (
                                            <p className="text-muted-foreground ml-6 mt-2">投票なし</p>
                                        ) : (
                                            <ScrollArea
                                                className={`list-disc list-inside rounded-md mt-2 ml-6 px-4 py-2 z-mc-history-scroll-area ${isScrollable ? 'h-[130px] border' : ''
                                                    }`}
                                            >
                                                {filteredVotes.map((vote) => {
                                                    const project = projects.find(
                                                        (p) => p.id === vote.projectId && p.department === dept
                                                    );

                                                    return project ? (
                                                        <li
                                                            key={vote.projectId}
                                                            className='flex items-center justify-between mb-2 border-b'
                                                        >
                                                            <span>{project.name}</span>
                                                            <Button
                                                                type="button"
                                                                variant='ghost'
                                                                className="p-2 ml-4 w-8 h-8 hover:bg-primary/10 cursor-pointer"
                                                            >
                                                                <X className="h-5 w-5 text-primary flex-shrink-0" />
                                                            </Button>
                                                        </li>
                                                    ) : null;
                                                })}
                                            </ScrollArea>
                                        )}
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
