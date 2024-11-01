// app/components/mc/program/mc-form-scroll-area.tsx

import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch } from "react";
import MCFormOption from "@/components/mc/form/mc-form-option";

interface MCFormScrollAreaProps {
  selectedPrograms: { id: string; title: string; department: string, date: string }[];
  setSelectedPrograms: Dispatch<
    React.SetStateAction<{ id: string; title: string; department: string, date: string }[]>
  >;
  filteredPrograms: Program[];
}

export default function MCFormScrollArea({
  selectedPrograms,
  setSelectedPrograms,
  filteredPrograms,
}: MCFormScrollAreaProps) {
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
    <ScrollArea className="flex-grow rounded-md border p-2 sm:pb-2 h-[calc(618px-(36px*3+8px*2))] sm:h-[618px] relative bg-white">
      {filteredPrograms.map((program) => (
        <MCFormOption
          key={program.id}
          program={program}
          handleProgramSelect={handleProgramSelect}
          selectedPrograms={selectedPrograms}
        />
      ))}
    </ScrollArea>
  );
}
