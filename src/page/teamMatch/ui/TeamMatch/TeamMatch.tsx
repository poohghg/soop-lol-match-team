'use client';

import { Player } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { useTeamStore } from '@/src/features/player';
import { SectionCard } from '@/src/page/teamMatch/ui/SectionCard';
import { AddPlayerModal } from '@/src/page/teamMatch/ui/TeamMatch/AddPlayerModal';
import { LazyTeamCard } from '@/src/page/teamMatch/ui/TeamMatch/TeamCard';
import { TeamSlotCard } from '@/src/page/teamMatch/ui/TeamMatch/TeamSlotCard';
import { Plus } from 'lucide-react';
import { overlay } from 'overlay-kit';

interface TeamMatchSectionProps {
  players: Player[];
}

export const TeamMatch = ({ players }: TeamMatchSectionProps) => {
  const { teams, addTeam, removeTeam, changeTeamTitle, addPlayerToTeam, removePlayerFromTeam } = useTeamStore();

  const handleOpenAddPlayerModal = (teamIndex: number, positionIdx: PositionIdx) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <AddPlayerModal
        isOpen={isOpen}
        unMount={unmount}
        players={players}
        positionIdx={positionIdx}
        onSelectPlayer={player => {
          addPlayerToTeam(teamIndex, positionIdx, player);
          close();
        }}
        onClose={() => close()}
        query=""
      />
    ));
  };

  return (
    <SectionCard
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-bold">팀 매칭</h2>
          <button
            onClick={addTeam}
            className="from-primary flex transform items-center gap-2 rounded-lg bg-gradient-to-r to-purple-600 px-4 py-2 text-white transition-all hover:scale-105 hover:opacity-90"
          >
            <Plus className="h-4 w-4" />새 팀 추가
          </button>
        </div>
      }
    >
      <div className={`flex flex-col gap-6 pb-4`}>
        {teams.map((team, teamIndex) => (
          <LazyTeamCard
            key={teamIndex}
            teamIndex={teamIndex}
            team={team}
            isRemovable={teams.length > 1}
            onTeamTitleChange={changeTeamTitle}
            onRemoveTeam={removeTeam}
            teamSlot={slot => (
              <TeamSlotCard
                key={slot.positionIdx}
                slot={slot}
                teamIndex={teamIndex}
                onOpenModal={() => handleOpenAddPlayerModal(teamIndex, slot.positionIdx)}
                onRemovePlayer={() => removePlayerFromTeam(teamIndex, slot.positionIdx)}
              />
            )}
          />
        ))}
      </div>
    </SectionCard>
  );
};
