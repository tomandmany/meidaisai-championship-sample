// app/components/mc/history/mc-history-delete-confirm-modal.tsx

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MCHistoryDeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function MCHistoryDeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: MCHistoryDeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        <p className="my-4 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-4 mt-6">
          <Button onClick={onClose} variant="outline">
            キャンセル
          </Button>
          <Button onClick={onConfirm} variant="destructive">
            削除
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
