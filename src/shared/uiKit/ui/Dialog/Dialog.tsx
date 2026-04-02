'use client';

import { cn } from '@/src/shared/uiKit';
import * as DialogPrimitives from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { VisuallyHidden } from 'radix-ui';
import React from 'react';

interface DialogRootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void; // unMount 대신 onClose를 주력으로 사용 (Radix 내부 상태와 동기화)
  className?: string;
}

export const DialogRoot = ({ children, isOpen, onClose }: DialogRootProps) => {
  return (
    <DialogPrimitives.Root
      open={isOpen}
      onOpenChange={open => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogPrimitives.Portal>{children}</DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};

export const DialogOverlay = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitives.Overlay>) => {
  return (
    <DialogPrimitives.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        className
      )}
      {...props}
    />
  );
};

export const DialogClose = ({
  children,
  className,
  iconClassName,
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Close> & {
  iconClassName?: string;
}) => {
  return (
    <DialogPrimitives.Close className={cn(className)} asChild {...props}>
      {children || (
        <X
          className={cn('h-5 w-5', 'text-muted-foreground hover:text-foreground', 'transition-colors', iconClassName)}
        />
      )}
    </DialogPrimitives.Close>
  );
};

const positionClasses = {
  center: 'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
  top: 'fixed top-4 left-1/2 z-50 -translate-x-1/2',
  bottom: 'fixed bottom-4 left-1/2 z-50 -translate-x-1/2',
  left: 'fixed top-1/2 left-4 z-50 -translate-y-1/2',
  right: 'fixed top-1/2 right-4 z-50 -translate-y-1/2',
};

export const DialogContent = ({
  children,
  className,
  position,
  isOpen,
  unMount,
  ...props
}: {
  isOpen: boolean;
  unMount: () => void;
  position?: keyof typeof positionClasses;
} & React.ComponentProps<typeof DialogPrimitives.Content>) => {
  return (
    <DialogPrimitives.Content
      className={cn(
        position ? positionClasses[position] : undefined,
        'data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in',
        className
      )}
      {...props}
      onAnimationEnd={() => {
        if (!isOpen) {
          unMount();
        }
      }}
    >
      {children}
    </DialogPrimitives.Content>
  );
};

export const DialogTitle = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitives.Title>) => {
  return (
    <DialogPrimitives.Title className={cn('text-lg leading-none font-semibold tracking-tight', className)} {...props} />
  );
};

export const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitives.Description>) => {
  return <DialogPrimitives.Description className={cn('text-muted-foreground text-sm', className)} {...props} />;
};

export const DialogHeaderHidden = ({ title, description }: { title: string; description?: string }) => {
  return (
    <VisuallyHidden.Root>
      <DialogPrimitives.Title>{title}</DialogPrimitives.Title>
      {description && <DialogPrimitives.Description>{description}</DialogPrimitives.Description>}
    </VisuallyHidden.Root>
  );
};
