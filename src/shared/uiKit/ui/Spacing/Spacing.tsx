import { cn } from '@/src/shared/uiKit';

interface SpacingProps {
  size: number;
  width?: number;
  className?: string;
}

const Spacing = ({ size, width, className }: SpacingProps) => {
  return <div className={cn('flex flex-shrink-0', className)} style={{ height: size, width: width || `1px` }} />;
};

export default Spacing;
