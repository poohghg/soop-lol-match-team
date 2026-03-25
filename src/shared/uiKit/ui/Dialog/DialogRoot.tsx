'use client';

import { cn, Dimmed, Portal } from '@/src/shared/uiKit';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui/';
import React from 'react';

interface DialogRootProps {
  children: React.ReactNode;
  isOpen: boolean;
  unMount: () => void;
  onClose?: () => void;
  className?: string;
}

export const DialogRoot = ({ children, isOpen, unMount, onClose, className }: DialogRootProps) => {
  return (
    <Portal>
      <Dimmed
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
      />
      <div
        className={cn(
          'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          isOpen ? 'animate-bottom-in' : 'animate-bottom-out',
          className
        )}
        onAnimationEnd={() => {
          if (!isOpen) {
            unMount();
          }
        }}
      >
        {children}
      </div>
    </Portal>
  );
};

export const DialogContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & { children: React.ReactNode; className?: string }) => {
  return (
    <AlertDialogPrimitive.Content className={cn('bg-card w-full rounded-lg p-4 shadow-lg', className)} {...props}>
      {children}
    </AlertDialogPrimitive.Content>
  );
};

export const DialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(`flex flex-col items-center gap-2 text-center`, className)}
      {...props}
    />
  );
};

export const DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={cn('mt-4 flex items-center justify-center gap-2 border-t', className)} {...props} />;
};

export const DialogTitle = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => {
  return <AlertDialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...props} />;
};

export const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => {
  return (
    <AlertDialogPrimitive.Description
      className={cn(
        'text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3',
        className
      )}
      {...props}
    />
  );
};

export const DialogAction = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) => {
  return (
    <button>
      <AlertDialogPrimitive.Action className={cn('bg-primary text-primary-foreground', className)} {...props} />
    </button>
  );
};
