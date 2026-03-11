import { Player } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { Team } from '@/src/features/player/model/type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const createEmptyTeam = (): Team => ({
  title: '',
  slots: [
    { position: '탑', positionIdx: '1', player: null },
    { position: '정글', positionIdx: '2', player: null },
    { position: '미드', positionIdx: '3', player: null },
    { position: '원딜', positionIdx: '4', player: null },
    { position: '서폿', positionIdx: '5', player: null },
  ],
});

export interface TeamStoreState {
  teams: Team[];
  addTeam: () => void;
  removeTeam: (teamIndex: number) => void;
  changeTeamTitle: (teamIndex: number, newTitle: string) => void;
  addPlayerToTeam: (teamIndex: number, positionIdx: PositionIdx, player: Player) => void;
  removePlayerFromTeam: (teamIndex: number, positionIdx: PositionIdx) => void;
}

const TEAM_STORAGE_KEY = 'team-store';

export const useUserStore = create<TeamStoreState>()(
  persist(
    (set, get) => ({
      teams: [createEmptyTeam()],

      addTeam: () => {
        set(state => ({
          teams: [...state.teams, createEmptyTeam()],
        }));
      },

      removeTeam: (teamIndex: number) => {
        set(state => ({
          teams: state.teams.filter((_, index) => index !== teamIndex),
        }));
      },

      changeTeamTitle: (teamIndex: number, newTitle: string) => {
        set(state => {
          const newTeams = [...state.teams];
          newTeams[teamIndex].title = newTitle;
          return { teams: newTeams };
        });
      },

      addPlayerToTeam: (teamIndex: number, positionIdx: PositionIdx, player: Player) => {
        set(state => {
          const newTeams = [...state.teams];
          newTeams[teamIndex].slots = newTeams[teamIndex].slots.map(slot => {
            if (slot.positionIdx === positionIdx) {
              return { ...slot, player };
            }
            return slot;
          });
          return { teams: newTeams };
        });
      },

      removePlayerFromTeam: (teamIndex: number, positionIdx: PositionIdx) => {
        set(state => {
          const newTeams = [...state.teams];
          newTeams[teamIndex].slots = newTeams[teamIndex].slots.map(slot => {
            if (slot.positionIdx === positionIdx) {
              return { ...slot, player: null };
            }
            return slot;
          });
          return { teams: newTeams };
        });
      },
    }),
    {
      name: TEAM_STORAGE_KEY,
    }
  )
);
