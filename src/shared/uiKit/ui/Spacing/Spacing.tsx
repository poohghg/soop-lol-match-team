import { cn } from '@/src/shared/uiKit';

interface SpacingProps {
  size: number;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

const Spacing = ({ size, className, direction = 'horizontal' }: SpacingProps) => {
  const isHorizontal = direction === 'horizontal';
  return (
    <div
      className={cn('flex flex-shrink-0', className)}
      style={{
        width: isHorizontal ? undefined : size,
        height: isHorizontal ? size : undefined,
      }}
    />
  );
};

export default Spacing;
