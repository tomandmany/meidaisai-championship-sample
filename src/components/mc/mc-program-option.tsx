import { Check } from "lucide-react";
import MCProgramOptionFloatingName from "@/components/mc/mc-program-option-floating-name";
import { useState } from "react";

interface MCProgramOptionProps {
  program: Program;
  handleProgramSelect: (program: Program) => void;
  selectedPrograms: { id: string; title: string; department: string }[];
}

export default function MCProgramOption({
  program,
  handleProgramSelect,
  selectedPrograms,
}: MCProgramOptionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedPrograms.some((p) => p.id === program.id);

  return (
    <div
      className={`flex items-center justify-between p-2 rounded-md mb-2 cursor-pointer ${
        isSelected ? "bg-primary/20" : "hover:bg-secondary"
      }`}
      onClick={() => handleProgramSelect(program)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-full">
        <MCProgramOptionFloatingName
          program={program}
          shouldAnimate={isHovered || isSelected}
        />
        <div className="text-sm text-muted-foreground line-clamp-2">
          {program.detail}
        </div>
        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {program.department} | {program.place} | {program.genre}
        </div>
      </div>
      {isSelected && (
        <Check className="h-8 w-8 text-[#c56681] flex-shrink-0 ml-2" />
      )}
    </div>
  );
}
