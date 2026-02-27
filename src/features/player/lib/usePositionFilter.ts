import { Player } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { useMemo, useState } from 'react';

export const usePositionFilter = (players: Player[], initialPositionIdx: PositionIdx = '0') => {
  const [positionIdx, setPositionIdx] = useState<PositionIdx>(initialPositionIdx);

  const updatePositionIdx = (idx: PositionIdx) => {
    setPositionIdx(idx);
  };

  const filteredPlayers = useMemo(() => {
    if (positionIdx === '0') {
      return players;
    }
    return players.filter(player => player.positionIdx === positionIdx);
  }, [players, positionIdx]);

  return {
    filteredPlayers,
    positionIdx,
    updatePositionIdx,
  };
};
