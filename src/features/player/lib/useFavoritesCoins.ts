'use client';
import { Player } from '@/src/entities/player';
import { useFavoritePlayerStore } from '@/src/features/player/model/favoritePlayerStore';

export const useFavoritesPlayer = (players: Player[]) => {
  const favoritePlayerIds = useFavoritePlayerStore(state => state.favoritePlayerIds);
  return players.filter(player => favoritePlayerIds.has(player.userId));
};
