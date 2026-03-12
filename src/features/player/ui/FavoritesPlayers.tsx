'use client';

import { Player } from '@/src/entities/player';
import { useFavoritesPlayer } from '@/src/features/player/lib/useFavoritesCoins';
import React from 'react';

interface FavoritesPlayerProps {
  players: Player[];
  children: (coins: Player[]) => React.ReactNode;
}

export const FavoritesPlayers = ({ children, players }: FavoritesPlayerProps) => {
  const favoritePlayers = useFavoritesPlayer(players);
  return <>{children(favoritePlayers)}</>;
};
