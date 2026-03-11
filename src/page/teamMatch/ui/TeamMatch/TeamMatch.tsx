'use client';

import { Player } from '@/src/entities/player';
import { useUserStore } from '@/src/features/player';
import { AddPlayerModal } from '@/src/page/teamMatch/ui/TeamMatch/AddPlayerModal';
import { TeamCard } from '@/src/page/teamMatch/ui/TeamMatch/TeamCard';
import { TeamSlotCard } from '@/src/page/teamMatch/ui/TeamMatch/TeamSlotCard';
import { Plus } from 'lucide-react';
import { overlay } from 'overlay-kit';

interface TeamMatchSectionProps {
  players: Player[];
}

export function TeamMatch({ players }: TeamMatchSectionProps) {
  const { teams, addTeam, removeTeam, changeTeamTitle, addPlayerToTeam, removePlayerFromTeam } = useUserStore();

  return (
    <section className="mb-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">팀 매칭</h2>
        <button
          onClick={addTeam}
          className="from-primary flex transform items-center gap-2 rounded-lg bg-gradient-to-r to-purple-600 px-4 py-2 text-white transition-all hover:scale-105 hover:opacity-90"
        >
          <Plus className="h-4 w-4" />새 팀 추가
        </button>
      </div>
      <div className="space-y-6">
        {teams.map((team, teamIndex) => (
          <TeamCard
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
                onOpenModal={() =>
                  overlay.open(({ isOpen, close, unmount }) => (
                    <AddPlayerModal
                      isOpen={isOpen}
                      unMount={unmount}
                      players={players}
                      positionIdx={slot.positionIdx}
                      onSelectPlayer={player => {
                        addPlayerToTeam(teamIndex, slot.positionIdx, player);
                        close();
                      }}
                      onClose={() => close()}
                      query={slot.player?.userNick || ''}
                    />
                  ))
                }
                onRemovePlayer={() => removePlayerFromTeam(teamIndex, slot.positionIdx)}
              />
            )}
          />
        ))}
      </div>
    </section>
  );
}
