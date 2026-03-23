import { cn } from '@/src/shared/uiKit';
import { LoaderCircleIcon } from 'lucide-react';

interface LoadCircleIconProps {
  className?: string;
}

export const LoadCircleIcon = ({ className }: LoadCircleIconProps) => {
  return <LoaderCircleIcon className={cn('animate-spin', className)} />;
};
