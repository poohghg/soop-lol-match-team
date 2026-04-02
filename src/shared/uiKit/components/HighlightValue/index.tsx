'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { ElementType, ReactNode, useEffect, useRef } from 'react';

interface HighlightProps<T, C extends ElementType = 'div'> {
  value: T;
  children: ReactNode;
  animationClassName: string;
  as?: ElementType;
}

export const HighlightValue = <T, C extends ElementType = 'div'>({
  value,
  children,
  className,
  animationClassName,
  as,
  ...restProps
}: MergeElementProps<C, HighlightProps<T, C>>) => {
  const ref = useRef<HTMLDivElement>(null);
  const prevRef = useRef(value);
  const Component = as || 'div';

  useEffect(() => {
    if (Object.is(prevRef.current, value)) {
      return;
    }

    prevRef.current = value;
    const node = ref.current;
    if (!node || !animationClassName) {
      return;
    }

    const classes = animationClassName.split(' ').filter(Boolean);

    const handleAnimationEnd = () => {
      node.classList.remove(...classes);
    };

    node.classList.remove(...classes);
    node.classList.add(...classes);
    node.addEventListener('animationend', handleAnimationEnd, { once: true });

    return () => {
      node.removeEventListener('animationend', handleAnimationEnd);
      node.classList.remove(...classes);
    };
  }, [value, animationClassName]);

  return (
    <Component ref={ref} className={`${className ?? ''}`} {...restProps}>
      {children}
    </Component>
  );
};
