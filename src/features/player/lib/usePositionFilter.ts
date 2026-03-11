'use client';

import { Player } from '@/src/entities/player';
import { PositionIdxWithAll } from '@/src/entities/player/model/type';
import { useMemo, useState } from 'react';

export const usePositionFilter = (players: Player[], initialPositionIdx: PositionIdxWithAll = '0') => {
  const [positionIdx, setPositionIdx] = useState<PositionIdxWithAll>(initialPositionIdx);

  const updatePositionIdx = (idx: PositionIdxWithAll) => {
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
