import { Player } from '@/src/entities/player';
import { Position, PositionIdx } from '@/src/entities/player/model/type';
import { useState } from 'react';

export interface TeamSlot {
  position: Position;
  positionIdx: PositionIdx;
  player: Player | null;
}

const initSlots: TeamSlot[] = [
  { position: '탑', positionIdx: '1', player: null },
  { position: '정글', positionIdx: '2', player: null },
  { position: '미드', positionIdx: '3', player: null },
  { position: '원딜', positionIdx: '4', player: null },
  { position: '서폿', positionIdx: '5', player: null },
];

interface Team {
  title: string;
  slots: TeamSlot[];
}

const initialTeam: Team = {
  title: '',
  slots: [...initSlots],
};

export const useTeam = () => {
  const [teams, setTeams] = useState<Team[]>([{ ...initialTeam }]);

  const addTeam = () => {
    setTeams([...teams, { ...initialTeam }]);
  };

  const removeTeam = (teamIndex: number) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, index) => index !== teamIndex));
    }
  };

  const changeTeamTitle = (teamIndex: number, newTitle: string) => {
    const newTeams = [...teams];
    newTeams[teamIndex].title = newTitle;
    setTeams(newTeams);
  };

  return {
    teams,
    setTeams,
    addTeam,
    removeTeam,
    changeTeamTitle,
  };
};
