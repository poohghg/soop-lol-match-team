'use client';

import { cn, Dimmed, Portal } from '@/src/shared/uiKit';

interface DialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  unMount: () => void;
  onClose?: () => void;
  className?: string;
}

export const Dialog = ({ children, isOpen, unMount, onClose, className }: DialogProps) => {
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
