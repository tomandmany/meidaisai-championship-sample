'use client'

import Ticket from '@/components/mc/mc-ticket'
import { DndContext, DragEndEvent, DragMoveEvent, TouchSensor } from '@dnd-kit/core';
import TicketDroppableArea from './mc-ticket-droppable-area'
import { useRef, useState } from 'react';
import { MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

interface TicketContextProps {
    userId: string;
    ticketUsed: boolean;
}

export default function TicketContext({ userId, ticketUsed }: TicketContextProps) {
    const [ticketPosition, setTicketPosition] = useState<{ x: number; y: number }>({ x: 0, y: -0 });

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
        <DndContext
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <TicketDroppableArea />
            <Ticket position={ticketPosition} userId={userId} ticketUsed={ticketUsed} />
        </DndContext>
    )
}