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

interface OpenAlertDialogOptions {
  title: string;
  description?: string;
}

export const openAlertDialog = async ({ title, description }: OpenAlertDialogOptions) => {
  return await overlay.openAsync<boolean>(({ isOpen, close, unmount }) => (
    <AlertDialog
      isOpen={isOpen}
      onClose={() => close(false)}
      onConfirm={() => close(true)}
      unMount={unmount}
      title={title}
      description={description}
    />
  ));
};

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  unMount?: () => void;
}

export const AlertDialog = ({ isOpen, onClose, title = '알림', description, unMount, onConfirm }: AlertDialogProps) => {
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
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
