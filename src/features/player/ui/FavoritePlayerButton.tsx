'use client';

import { useFavoritePlayerStore } from '@/src/features/player/model/favoritePlayerStore';
import { cn, toasts } from '@/src/shared/uiKit';
import { Star } from 'lucide-react';
import dynamic from 'next/dynamic';

interface FavoriteCoinButtonProps {
  playerId: string;
  starClassName?: string;
}

export const FavoritePlayerButton = ({ playerId, starClassName }: FavoriteCoinButtonProps) => {
  const toggleFavorite = useFavoritePlayerStore(state => state.toggleFavorite);
  const isFavorite = useFavoritePlayerStore(state => state.isFavorite);
  const _ = useFavoritePlayerStore(state => state.favoritePlayerIds);
  const favorite = isFavorite(playerId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const isToggled = toggleFavorite(playerId);
    const message = isToggled ? `${playerId}를 즐겨찾기에 추가했습니다!` : `${playerId}를 즐겨찾기에서 제거했습니다!`;
    toasts.success(message);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={cn(
        `${favorite ? 'text-yellow-400' : 'text-muted-foreground group-hover:text-foreground'}`,
        starClassName
      )}
    >
      <Star className="h-5 w-5" fill={favorite ? 'currentColor' : 'none'} />
    </button>
  );
};

export const LazyFavoritePlayerButton = dynamic(() => Promise.resolve(FavoritePlayerButton), {
  ssr: false,
  loading: () => (
    <button>
      <Star className={`h-5 w-5`} fill={'none'} />
    </button>
  ),
});
