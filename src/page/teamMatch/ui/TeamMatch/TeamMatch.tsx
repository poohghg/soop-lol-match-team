'use client';

import { Player } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { useTeam } from '@/src/page/teamMatch/lib/useTeam';
import { AddPlayerModal } from '@/src/page/teamMatch/ui/TeamMatch/AddPlayerModal';
import { TeamSlotCard } from '@/src/page/teamMatch/ui/TeamMatch/TeanSlot';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface TeamMatchSectionProps {
  players: Player[];
}

export function TeamMatch({ players }: TeamMatchSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    teams,
    setTeams,
    addTeam: handleAddTeam,
    removeTeam: handleRemoveTeam,
    changeTeamTitle: handleTeamTitleChange,
  } = useTeam();
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PositionIdx | null>(null);

  const handleOpenModal = (teamIndex: number, positionIdx: PositionIdx) => {
    setSelectedTeamIndex(teamIndex);
    setSelectedPosition(positionIdx);
    setIsModalOpen(true);
  };

  const handleSelectPlayer = (player: Player) => {
    if (selectedTeamIndex === null || selectedPosition === null) {
      return;
    }

    setTeams(prevTeams => {
      const newTeams = [...prevTeams];
      newTeams[selectedTeamIndex].slots = newTeams[selectedTeamIndex].slots.map(slot => {
        if (slot.positionIdx === selectedPosition) {
          return { ...slot, player };
        }
        return slot;
      });
      return newTeams;
    });

    setIsModalOpen(false);
    setSelectedTeamIndex(null);
    setSelectedPosition(null);
  };

  const handleRemovePlayer = (teamIndex: number, positionIdx: string) => {
    setTeams(prevTeams => {
      const newTeams = [...prevTeams];
      newTeams[teamIndex].slots = newTeams[teamIndex].slots.map(slot => {
        if (slot.positionIdx === positionIdx) {
          return { ...slot, player: null };
        }
        return slot;
      });
      return newTeams;
    });
  };

  return (
    <section className="mb-12">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">팀 매칭</h2>
        <button
          onClick={handleAddTeam}
          className="from-primary flex transform items-center gap-2 rounded-lg bg-gradient-to-r to-purple-600 px-4 py-2 text-white transition-all hover:scale-105 hover:opacity-90"
        >
          <Plus className="h-4 w-4" />새 팀 추가
        </button>
      </div>
      <div className="space-y-6">
        {teams.map((team, teamIndex) => (
          <div
            key={teamIndex}
            className="bg-card border-card-border relative flex flex-col gap-4 rounded-xl border p-2 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <input
                className="text-foreground w-full bg-transparent text-lg font-semibold focus:outline-none"
                type="text"
                maxLength={30}
                value={team.title}
                onChange={e => handleTeamTitleChange(teamIndex, e.target.value)}
                placeholder={`팀 #${teamIndex + 1}`}
              />
              {teams.length > 1 && (
                <button
                  onClick={() => handleRemoveTeam(teamIndex)}
                  className="text-muted-foreground transition-colors hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {team.slots.map(slot => (
                <TeamSlotCard
                  key={slot.positionIdx}
                  slot={slot}
                  teamIndex={teamIndex}
                  handleOpenModal={handleOpenModal}
                  handleRemovePlayer={handleRemovePlayer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddPlayerModal
          players={players}
          positionIdx={selectedPosition as PositionIdx}
          onSelectPlayer={handleSelectPlayer}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTeamIndex(null);
            setSelectedPosition(null);
          }}
        />
      )}
    </section>
  );
}
