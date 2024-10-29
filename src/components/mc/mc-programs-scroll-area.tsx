// components/ProgramsScrollArea.tsx

import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from 'lucide-react';
import Image from "next/image";
import { Dispatch } from "react";

interface ProgramsScrollAreaProps {
  selectedPrograms: { id: string; title: string, department: string }[];
  setSelectedPrograms: Dispatch<React.SetStateAction<{ id: string; title: string, department: string }[]>>;
  filteredPrograms: Program[];
}

export default function ProgramsScrollArea({ selectedPrograms, setSelectedPrograms, filteredPrograms }: ProgramsScrollAreaProps) {
  const handleProgramSelect = (program: { id: string; title: string, department: string }) => {
    setSelectedPrograms(prev =>
      prev.some(p => p.id === program.id)
        ? prev.filter(p => p.id !== program.id)
        : [...prev, program]
    );
  };

  return (
    <ScrollArea className="flex-grow rounded-md border p-2 sm:pb-2 h-[calc(618px-(36px*3+8px*2))] sm:h-[618px] relative">
      <Image src="/votes/logo.svg" alt="ロゴ" width={70} height={70} className="lg:hidden absolute bottom-4 right-4 pointer-events-none opacity-40" />
      {/* <div className="bg-white absolute bottom-0 right-0 p-2 lg:hidden">
        <Image src="/votes/logo.svg" alt="ロゴ" width={108} height={108} className="opacity-60" />
      </div> */}
      {filteredPrograms.map(program => (
        <div
          key={program.id}
          className={`flex items-center justify-between p-2 rounded-md mb-2 cursor-pointer ${selectedPrograms.some(p => p.id === program.id) ? 'bg-primary/20' : 'hover:bg-secondary'}`}
          onClick={() => handleProgramSelect({ id: program.id, title: program.title, department: program.department })}
        >
          <div className="flex-grow">
            <div className="font-semibold">{program.title}</div>
            <div className="text-sm text-muted-foreground">{program.detail}</div>
            <div className="text-xs text-muted-foreground mt-1">{program.department} | {program.place} | {program.genre}</div>
          </div>
          {selectedPrograms.some(p => p.id === program.id) && (
            <Check className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
          )}
        </div>
      ))}
    </ScrollArea>
  );
}
