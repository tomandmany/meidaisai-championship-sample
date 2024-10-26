import { insertVote } from "@/actions/insertVote";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VoteButtonProps {
    selectedProjects: { id: string; name: string }[];
    user_id: string;
    testDate?: Date;
}

export default function VoteButton({ selectedProjects, user_id, testDate }: VoteButtonProps) {
    const handleInsertVote = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await insertVote({ user_id, projects: selectedProjects, testDate });

            toast.success(result, {
                style: {
                    background: 'white',
                    color: '#4CAF50',
                    border: 'transparent',
                },
            });
        } catch (error) {
            toast.error('エラーが発生しました。', {
                style: {
                    background: '#f44336',
                    color: '#ffffff',
                    border: 'transparent',
                },
            });
        }
    };

    return (
        <div className='flex gap-2 items-center'>
            <Button
                type='button'
                onClick={handleInsertVote}
                className="w-full mt-3 sm:mt-2 bg-[#E07594] hover:bg-[#c56681]"
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