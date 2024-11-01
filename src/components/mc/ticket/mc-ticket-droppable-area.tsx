// app/components/mc/ticket/mc-ticket-droppable-area.tsx
import { useDroppable } from '@dnd-kit/core';

export default function MCTicketDroppableArea() {
  const { setNodeRef } = useDroppable({
    id: 'droppable-area',
  });

  return <div ref={setNodeRef} className="fixed left-0 bottom-0 w-svw h-svh pointer-events-none" />;
}