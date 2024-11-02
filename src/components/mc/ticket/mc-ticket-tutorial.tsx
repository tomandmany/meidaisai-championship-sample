// app/components/mc/ticket/mc-ticket-tutorial.tsx

'use client'
import { ArrowDown, X } from "lucide-react";
import Ticket from "@/components/mc/ticket/mc-ticket";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface MCTicketTutorialProps {
    user_id: string;
    ticketUsed: boolean;
    isTicketModalOpen: boolean;
    setIsTicketModalOpen: Dispatch<SetStateAction<boolean>>;
    finishTutorial: () => void;
}

export default function MCTicketTutorial({ user_id, ticketUsed, isTicketModalOpen, setIsTicketModalOpen, finishTutorial }: MCTicketTutorialProps) {
    return (
        <div
            className="fixed inset-0 bg-black/95 z-mc-ticket-tutorial-modal"
        >
            <div
                className="fixed inset-0"
                onClick={finishTutorial}
            />
            <Button
                type="button"
                variant="outline"
                onClick={finishTutorial}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 xl:bottom-12 xl:right-12 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28"
            >
                <X className="min-w-5 min-h-5 sm:min-w-6 sm:min-h-6 lg:min-w-8 lg:min-h-8" />
            </Button>
            <div className="fixed left-4 bottom-16 flex items-start flex-col">
                <p className="text-lg text-white">
                    こちらをタップすると、
                    <br />
                    抽選券の使用画面に移ります。
                </p>
                <ArrowDown className="w-fit text-white mb-4" />
                {/* <Ticket userId={user_id} ticketUsed={ticketUsed} /> */}
                <Ticket userId={user_id} ticketUsed={ticketUsed} isTicketModalOpen={isTicketModalOpen} setIsTicketModalOpen={setIsTicketModalOpen} finishTutorial={finishTutorial} />
                {/* <Button
                    type="button"
                    onClick={() => setIsTicketModalOpen(prev => !prev)}
                    className="w-fit h-fit object-contain p-0 sm:bottom-16 md:bottom-20 lg:bottom-[90px] xl:bottom-[110px]"
                >
                    <Image src="/votes/ticket.svg" alt="抽選券" width={200} height={200} className="w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96" />
                </Button> */}
            </div>
        </div>
    )
}