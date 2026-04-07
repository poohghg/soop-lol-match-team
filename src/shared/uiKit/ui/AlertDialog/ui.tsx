'use client';

import { cn } from '@/src/shared/uiKit';
import { AlertDialog as AlertDialogPrimitives, VisuallyHidden } from 'radix-ui';
import React, { isValidElement } from 'react';

interface AlertDialogRootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const AlertDialogRoot = ({ children, isOpen, onClose }: AlertDialogRootProps) => {
  return (
    <AlertDialogPrimitives.Root
      open={isOpen}
      onOpenChange={open => {
        if (!open) {
          onClose();
        }
      }}
    >
      <AlertDialogPrimitives.Portal>{children}</AlertDialogPrimitives.Portal>
    </AlertDialogPrimitives.Root>
  );
};

export const AlertDialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Overlay>) => {
  return (
    <AlertDialogPrimitives.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        '[--fade-in-duration:5000ms] [--fade-out-duration:5000ms]',
        className
      )}
      {...props}
    />
  );
};

const positionClasses = {
  center: 'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
  top: 'fixed top-4 left-1/2 z-50 -translate-x-1/2',
  bottom: 'fixed bottom-4 left-1/2 z-50 -translate-x-1/2',
};

export const AlertDialogContent = ({
  children,
  className,
  position = 'center',
  isOpen,
  unMount,
  ...props
}: {
  isOpen: boolean;
  unMount: () => void;
  position?: keyof typeof positionClasses;
} & React.ComponentProps<typeof AlertDialogPrimitives.Content>) => {
  return (
    <AlertDialogPrimitives.Content
      className={cn(
        positionClasses[position] ? positionClasses[position] : undefined,
        'card w-[80vw] max-w-[360px] p-0',
        'flex flex-col items-center justify-between',
        'data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out',
        className
      )}
      onAnimationEnd={() => {
        if (!isOpen) {
          unMount();
        }
      }}
      onOpenAutoFocus={e => {
        e.preventDefault();
      }}
      {...props}
    >
      {children}
    </AlertDialogPrimitives.Content>
  );
};

export const AlertDialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn(`flex min-h-20 w-full flex-col items-center justify-center gap-1 p-3`, className)} {...props} />
);

export const AlertDialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('border-card-border flex w-full items-center justify-between border-t', className)} {...props} />
);

export const AlertDialogTitle = ({
  className,
  asChild,

  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Title>) => (
  <AlertDialogPrimitives.Title
    className={cn('text-lg font-semibold', className)}
    asChild={isValidElement(props.children)}
    {...props}
  />
);

export const AlertDialogDescription = ({
  className,
  asChild,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Description>) => (
  <AlertDialogPrimitives.Description
    className={cn('text-muted-foreground text-center text-sm', className)}
    asChild={isValidElement(props.children)}
    {...props}
  />
);

export const AlertDialogTitleHidden = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitives.Title>) => {
  return (
    <VisuallyHidden.Root>
      <AlertDialogPrimitives.Title {...props} />
    </VisuallyHidden.Root>
  );
};

export const AlertDialogDescriptionHidden = ({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Description>) => {
  return (
    <VisuallyHidden.Root>
      <AlertDialogDescription {...props} />
    </VisuallyHidden.Root>
  );
};

export const AlertDialogCancel = ({
  className,
  children = '취소',
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Cancel>) => (
  <AlertDialogPrimitives.Cancel
    className={cn(
      'inline-flex flex-1 items-center justify-center py-3 text-sm font-medium',
      'border-card-border hover:bg-primary/10 border-r',
      className
    )}
    {...props}
  >
    {children}
  </AlertDialogPrimitives.Cancel>
);

export const AlertDialogAction = ({
  className,
  children = '확인',
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitives.Action>) => (
  <AlertDialogPrimitives.Action
    className={cn(
      'inline-flex flex-1 items-center justify-center py-3 text-sm font-medium',
      `text-primary hover:bg-primary/10`,
      className
    )}
    {...props}
  >
    {children}
  </AlertDialogPrimitives.Action>
);
