'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogDescriptionHidden,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogRoot,
  AlertDialogTitle,
} from '@/src/shared/uiKit/ui/AlertDialog/ui';
import { overlay } from 'overlay-kit';
import React from 'react';

interface OpenConfirmOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
}

export const openConfirm = async ({ title, description, cancelText, confirmText }: OpenConfirmOptions) => {
  return await overlay.openAsync<boolean>(({ isOpen, close, unmount }) => (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={() => close(false)}
      onConfirm={() => close(true)}
      unMount={unmount}
      title={title}
      description={description}
      cancelText={cancelText}
      confirmText={confirmText}
    />
  ));
};

interface ConfirmDialogProps {
  isOpen: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  unMount?: () => void;
  cancelText?: string;
  confirmText?: string;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  description,
  unMount,
  onConfirm,
  cancelText,
  confirmText,
}: ConfirmDialogProps) => {
  return (
    <AlertDialogRoot isOpen={isOpen} onClose={onClose}>
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
          <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
