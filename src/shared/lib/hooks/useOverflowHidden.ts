import { useEffect, useRef } from 'react';

export const useOverflowHidden = (isOverflowHidden: boolean) => {
  const originalOverflow = useRef('');

  useEffect(() => {
    originalOverflow.current = document.body.style.overflow;
  }, []);

  useEffect(() => {
    const originalOverflowValue = originalOverflow.current;

    if (isOverflowHidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflowValue;
    }

    return () => {
      document.body.style.overflow = originalOverflowValue;
    };
  }, [isOverflowHidden]);
};
