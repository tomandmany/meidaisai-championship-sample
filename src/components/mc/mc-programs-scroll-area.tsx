// components/ProgramsScrollArea.tsx

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Dispatch } from "react";
import MCProgramOption from "./mc-program-option";

interface ProgramsScrollAreaProps {
  selectedPrograms: { id: string; title: string; department: string, date: string }[];
  setSelectedPrograms: Dispatch<
    React.SetStateAction<{ id: string; title: string; department: string, date: string }[]>
  >;
  filteredPrograms: Program[];
}

export default function ProgramsScrollArea({
  selectedPrograms,
  setSelectedPrograms,
  filteredPrograms,
}: ProgramsScrollAreaProps) {
  const handleProgramSelect = (program: {
    id: string;
    title: string;
    department: string;
    date: string;
  }) => {
    setSelectedPrograms((prev) =>
      prev.some((p) => p.id === program.id)
        ? prev.filter((p) => p.id !== program.id)
        : [...prev, program]
    );
  };

  return (
    <ScrollArea className="flex-grow rounded-md border p-2 sm:pb-2 h-[calc(618px-(36px*3+8px*2))] sm:h-[618px] relative">
      <Image
        src="/votes/logo.svg"
        alt="ロゴ"
        width={70}
        height={70}
        className="lg:hidden absolute bottom-2 right-1 pointer-events-none opacity-40"
      />
      {filteredPrograms.map((program) => (
        <MCProgramOption
          key={program.id}
          program={program}
          handleProgramSelect={handleProgramSelect}
          selectedPrograms={selectedPrograms}
        />
      ))}
    </ScrollArea>
  );
}
