import { Player } from '@/src/entities/player';
import { useMemo, useState } from 'react';

export const useSearchPlayer = (
  players: Player[],
  positionCountMap: Record<string, number>,
  initialQuery: string = ''
) => {
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

  const positionCount = useMemo(() => {
    if (normalizedQuery === '') {
      return positionCountMap;
    }

    const map: Record<string, number> = {
      '0': searchedPlayer.length,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
    };

    searchedPlayer.forEach(player => {
      map[player.positionIdx] += 1;
    });
    return map;
  }, [searchedPlayer, normalizedQuery, positionCountMap]);

  return {
    searchedPlayer,
    searchQuery,
    normalizedQuery,
    setQuery,
    positionCount,
  };
};
