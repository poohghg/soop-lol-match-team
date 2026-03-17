'use client';

import { useVisible } from '@/src/shared/lib/hooks';
import { cn } from '@/src/shared/uiKit';
import { ReactNode } from 'react';

const baseToolTipClass =
  'absolute w-max rounded pointer-events-none opacity-0 transition-opacity group-hover:block group-hover:opacity-100 group-focus:block group-focus:opacity-100';
const topPositionClass = 'bottom-full mb-1 left-1/2 -translate-x-1/2';
const bottomPositionClass = 'top-full mt-1 left-1/2 -translate-x-1/2';
const leftPositionClass = 'right-full mr-1 top-1/2 -translate-y-1/2';
const rightPositionClass = 'left-full ml-1 top-1/2 -translate-y-1/2';

const toolTopPositionClass: Record<'top' | 'bottom' | 'left' | 'right', string> = {
  top: topPositionClass,
  bottom: bottomPositionClass,
  left: leftPositionClass,
  right: rightPositionClass,
};

interface ToolTipProps {
  children: ReactNode;
  text: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  toolTopClassName?: string;
}

export const ToolTip = ({ text, children, position = 'top', className, toolTopClassName }: ToolTipProps) => {
  const { eventHandlers, visible } = useVisible();

  return (
    <div className={cn('group relative', className)} {...eventHandlers}>
      {children}
      <div
        className={cn(
          baseToolTipClass,
          toolTopPositionClass[position],
          toolTopClassName,
          visible ? 'block opacity-100' : 'hidden opacity-0'
        )}
      >
        {text}
      </div>
    </div>
  );
};
