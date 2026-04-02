'use client';

import { Dialog } from '@/src/shared/uiKit';
import { DialogContent } from '@/src/shared/uiKit/ui/Dialog/Dialog';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/shared/uiKit/ui/Dialog/ui/Alert';

interface AlertDialogProps {
  isOpen: boolean;
  unMount: () => void;
  onClose?: () => void;
  title?: string;
  description?: string;
  onAction?: () => void;
}

export const AlertDialog = ({ isOpen, unMount, onClose, title, description, onAction }: AlertDialogProps) => {
  return (
    <Dialog isOpen={isOpen} unMount={unMount} onClose={onClose}>
      <DialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>확인</AlertDialogCancel>
        </AlertDialogFooter>
        gg
      </DialogContent>
    </Dialog>
  );
};
