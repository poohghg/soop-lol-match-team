import { Player } from '@/src/entities/player';
import { useMemo } from 'react';

export const usePositionCount = (players: Player[], initPositionCountMap: Record<string, number>) => {
  const positionCountMap = useMemo(() => {
    const map: { [positionIdx: string]: number } = {};
    players.forEach(player => {
      if (map[player.positionIdx]) {
        map[player.positionIdx] += 1;
      }
    });
    return map;
  }, [players]);
};
