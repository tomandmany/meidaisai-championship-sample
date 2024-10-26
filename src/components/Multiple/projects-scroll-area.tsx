// components/ProjectsScrollArea.tsx

import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from 'lucide-react';
import Image from "next/image";
import { Dispatch } from "react";

interface ProjectsScrollAreaProps {
  selectedProjects: { id: string; name: string }[];
  setSelectedProjects: Dispatch<React.SetStateAction<{ id: string; name: string }[]>>;
  filteredProjects: Project[];
}

export default function ProjectsScrollArea({ selectedProjects, setSelectedProjects, filteredProjects }: ProjectsScrollAreaProps) {
  const handleProjectSelect = (project: { id: string; name: string }) => {
    setSelectedProjects(prev =>
      prev.some(p => p.id === project.id)
        ? prev.filter(p => p.id !== project.id)
        : [...prev, project]
    );
  };

  return (
    <ScrollArea className="flex-grow rounded-md border p-2 sm:pb-2 h-[calc(618px-(36px*3+8px*2))] sm:h-[618px] relative">
      <Image src="/votes/logo.svg" alt="ロゴ" width={92} height={92} className="lg:hidden absolute bottom-4 right-4 pointer-events-none" />
      {filteredProjects.map(project => (
        <div
          key={project.id}
          className={`flex items-center justify-between p-2 rounded-md mb-2 cursor-pointer ${selectedProjects.some(p => p.id === project.id) ? 'bg-primary/20' : 'hover:bg-secondary'}`}
          onClick={() => handleProjectSelect({ id: project.id, name: project.name })}
        >
          <div className="flex-grow">
            <div className="font-semibold">{project.name}</div>
            <div className="text-sm text-muted-foreground">{project.description}</div>
            <div className="text-xs text-muted-foreground mt-1">{project.department} | {project.location} | {project.genre}</div>
          </div>
          {selectedProjects.some(p => p.id === project.id) && (
            <Check className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
          )}
        </div>
      ))}
    </ScrollArea>
  );
}
