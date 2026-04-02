import {
  AlertDialogContent,
  AlertDialogDescriptionHidden,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogRoot,
} from '@/src/shared/uiKit/ui/AlertDialog/ui';
import { AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import React from 'react';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  unMount?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const AlertDialog = ({
  isOpen,
  onClose,
  title = '알림',
  description,
  unMount,
  onConfirm,
  onCancel,
}: AlertDialogProps) => {
  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <AlertDialogRoot isOpen={isOpen} onClose={handleClose}>
      <AlertDialogOverlay />
      <AlertDialogContent isOpen={isOpen} unMount={() => unMount && unMount()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : (
            <AlertDialogDescriptionHidden>설명이 없습니다.</AlertDialogDescriptionHidden>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <A
          {/*<AlertDialogCancel onClick={() => setIsOpen(false)}>취소</AlertDialogCancel>*/}
          {/*<AlertDialogAction onClick={() => setIsOpen(false)}>확인</AlertDialogAction>*/}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
