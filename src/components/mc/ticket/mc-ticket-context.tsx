// @/components/mc/ticket/mc-ticket-context.tsx

'use client'

import TicketDroppableArea from '@/components/mc/ticket/mc-ticket-droppable-area'
import Ticket from '@/components/mc/ticket/mc-ticket'
import { DndContext, DragEndEvent, DragMoveEvent, TouchSensor } from '@dnd-kit/core';
import { useRef, useState } from 'react';
import { MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import MCTicketTutorial from './mc-ticket-tutorial';
import setTutorial from '@/actions/tutorial/setTutorial';

interface MCTicketContextProps {
    userId: string;
    ticketUsed: boolean;
    isFinishedTicketTutorial: boolean;
    votesHistory: Vote[];
}

export default function MCTicketContext({ userId, ticketUsed, isFinishedTicketTutorial, votesHistory }: MCTicketContextProps) {
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketPosition, setTicketPosition] = useState<{ x: number; y: number }>({ x: 0, y: -0 });

    async function finishTutorial() {
        await setTutorial({
            user_id: userId,
            tutorial_name: 'ticket'
        })
    }

    const cumulativePosition = useRef({ x: 0, y: 0 });

    const handleDragMove = (event: DragMoveEvent) => {
        const { delta } = event;

        // deltaを累積位置に加算して位置を更新
        const newX = cumulativePosition.current.x + delta.x;
        const newY = cumulativePosition.current.y + delta.y;

        setTicketPosition({ x: newX, y: newY });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        // ドラッグ終了時に現在の位置を累積位置として保存
        cumulativePosition.current = { ...ticketPosition };
    };

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 1,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 80, tolerance: 0 }, // 80ms の遅延後にアクティブ化
    });

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    );

    return (
        <>
            <DndContext
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <TicketDroppableArea />
                <Ticket position={ticketPosition} userId={userId} ticketUsed={ticketUsed} isTicketModalOpen={isTicketModalOpen} setIsTicketModalOpen={setIsTicketModalOpen} finishTutorial={finishTutorial} />
            </DndContext>
            {votesHistory.length > 0 && !isFinishedTicketTutorial && (
                <MCTicketTutorial user_id={userId} ticketUsed={ticketUsed} isTicketModalOpen={isTicketModalOpen} setIsTicketModalOpen={setIsTicketModalOpen} finishTutorial={finishTutorial} />
            )}
        </>
    )
}