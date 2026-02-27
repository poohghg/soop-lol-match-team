import { Player } from '@/src/entities/player';
import { useMemo, useState } from 'react';

export const useSearchPlayer = (players: Player[], initialQuery: string = '') => {
  const [searchQuery, setQuery] = useState(initialQuery);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchedPlayer = useMemo(() => {
    if (normalizedQuery === '') {
      return players;
    }

    return players.filter(
      player =>
        player.userNick.toLowerCase().includes(normalizedQuery) ||
        player.totalGameNickList.some(nick => nick.toLowerCase().includes(normalizedQuery))
    );
  }, [players, normalizedQuery]);

  return {
    searchedPlayer,
    searchQuery,
    setQuery,
  };
};
