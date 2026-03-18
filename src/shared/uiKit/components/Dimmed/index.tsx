'use client';

import { useOverflowHidden } from '@/src/shared/libs/hooks';
import { createReactContext } from '@/src/shared/libs/reactUtils';
import { Portal } from '@/src/shared/uiKit';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const [DimmedProvider, useDimmedContext] = createReactContext<{
  updateCount: (delta: number) => void;
  registerDimmedClick: (onClick: () => void) => () => void;
}>({
  name: 'DimmedContext',
});

export const Dimmed = memo(({ onClick }: { onClick?: () => void }) => {
  const context = useDimmedContext();

  useEffect(() => {
    if (onClick) {
      const unregister = context.registerDimmedClick(onClick);
      return () => {
        unregister();
      };
    }
  }, [onClick, context]);

  useEffect(() => {
    context.updateCount(1);
    return () => {
      context.updateCount(-1);
    };
  }, [context]);

  return null;
});

export const RootDimmed = memo(({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const dimmedClicksRef = useRef<Array<() => void>>([]);
  const showDimmed = count > 0;
  useOverflowHidden(showDimmed);

  const updateCount = useCallback((delta: number) => {
    setCount(prev => Math.max(0, prev + delta));
  }, []);

  const registerDimmedClick = useCallback((onClick: () => void) => {
    dimmedClicksRef.current.push(onClick);

    return () => {
      dimmedClicksRef.current = dimmedClicksRef.current.filter(fn => fn !== onClick);
    };
  }, []);

  const contextValue = useMemo(() => ({ updateCount, registerDimmedClick }), []);

  const handleDimmedClick = () => {
    const stack = dimmedClicksRef.current;
    const top = stack[stack.length - 1];
    top?.();
  };

  return (
    <DimmedProvider value={contextValue}>
      {children}
      {showDimmed && (
        <Portal>
          <div className="fixed inset-0 z-10 bg-black/70 p-4 backdrop-blur-sm" onClick={handleDimmedClick} />
        </Portal>
      )}
    </DimmedProvider>
  );
});
