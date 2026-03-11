'use client';

import { cn, Dimmed } from '@/src/shared/uiKit';

interface DialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  unMount: () => void;
  onClose?: () => void;
  className?: string;
}

export const Dialog = ({ children, isOpen, unMount, onClose, className }: DialogProps) => {
  return (
    <div
      className={cn(
        'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
        isOpen ? 'animate-fade-in' : 'animate-fade-out',
        className
      )}
      onAnimationEnd={() => {
        if (!isOpen) {
          unMount();
        }
      }}
    >
      <Dimmed
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
      />
      {children}
    </div>
  );
};
