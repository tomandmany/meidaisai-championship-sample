// app/components/mc/ticket/mc-ticket-tutorial.tsx

'use client'
import { ArrowDown, X } from "lucide-react";
import Ticket from "@/components/mc/ticket/mc-ticket";
import { Button } from "@/components/ui/button";
import setTutorial from "@/actions/tutorial/setTutorial";

interface MCTicketTutorialProps {
    user_id: string;
    ticketUsed: boolean;
}

export default function MCTicketTutorial({ user_id, ticketUsed }: MCTicketTutorialProps) {
    function finishTutorial() {
        setTutorial({
            user_id: user_id,
            tutorial_name: 'ticket'
        })
    }

    return (
        <div
            className="fixed inset-0 bg-black/95 z-mc-ticket-tutorial-modal"
        >
            <div
                className="fixed inset-0"
                onClick={finishTutorial}
            />
            <div className="fixed left-4 bottom-16 flex items-start flex-col">
                <p className="text-lg text-white">
                    こちらをタップすると、
                    <br />
                    抽選券の使用画面に移ります。
                </p>
                <div className="space-y-4">
                    <ArrowDown className="w-fit mx-aut text-white" />
                    <Ticket userId={user_id} ticketUsed={ticketUsed} />
                </div>
            </div>
            <Button
                type="button"
                variant="outline"
                onClick={finishTutorial}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 xl:bottom-12 xl:right-12 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28"
            >
                <X className="min-w-5 min-h-5 sm:min-w-6 sm:min-h-6 lg:min-w-8 lg:min-h-8" />
            </Button>
        </div>
    )
}