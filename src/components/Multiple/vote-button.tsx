import { Button } from "@/components/ui/button";

interface VoteButtonProps {
    selectedProjects: string[];
    handleVote: () => void;
}

export default function VoteButton({ selectedProjects, handleVote }: VoteButtonProps) {
    return (
        <div className='flex gap-2 items-center'>
            <Button
                type='button'
                className="w-full mt-3 sm:mt-2 bg-[#E07594] hover:bg-[#c56681]"
                onClick={handleVote}
                disabled={selectedProjects.length === 0}
            >
                投票する ({selectedProjects.length})
            </Button>
            <div
                className='invisible min-w-12 min-h-[36px] mt-2 sm:hidden'
            />
        </div>
    )
}