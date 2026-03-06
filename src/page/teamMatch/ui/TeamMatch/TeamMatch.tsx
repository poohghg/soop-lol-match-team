'use client';

import { Player, PlayerView } from '@/src/entities/player';
import { Position, PositionIdx } from '@/src/entities/player/model/type';
import { AddPlayerModal } from '@/src/page/teamMatch/ui/TeamMatch/AddPlayerModal';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface TeamSlot {
  position: Position;
  positionIdx: PositionIdx;
  player: Player | null;
}

interface Team {
  title: string;
  slots: TeamSlot[];
}

const initSlots: TeamSlot[] = [
  { position: '탑', positionIdx: '1', player: null },
  { position: '정글', positionIdx: '2', player: null },
  { position: '미드', positionIdx: '3', player: null },
  { position: '원딜', positionIdx: '4', player: null },
  { position: '서폿', positionIdx: '5', player: null },
];

const initialTeam: Team = {
  title: '',
  slots: [...initSlots],
};

interface TeamMatchSectionProps {
  players: Player[];
}

export function TeamMatch({ players }: TeamMatchSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([{ ...initialTeam }]);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PositionIdx | null>(null);

  const handleAddTeam = () => {
    setTeams([...teams, { ...initialTeam }]);
  };

  const handleRemoveTeam = (teamIndex: number) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, index) => index !== teamIndex));
    }
  };

  const handleTeamTitleChange = (teamIndex: number, newTitle: string) => {
    const newTeams = [...teams];
    newTeams[teamIndex].title = newTitle;
    setTeams(newTeams);
  };

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
              {team.slots.map(slot => {
                const colors = PlayerView.getPositionClasses(slot.positionIdx);
                return (
                  <div
                    key={slot.positionIdx}
                    className={`relative flex flex-col gap-1 border-2 ${colors.border} bg-card hover:bg-muted rounded-lg p-2 transition-all`}
                  >
                    <div className="text-foreground text-[14px] font-semibold">{slot.position}</div>
                    {slot.player ? (
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="text-foreground truncate text-sm font-semibold">{slot.player.userNick}</p>
                            <p className="text-muted-foreground truncate text-xs">{slot.player.gameNick}</p>
                          </div>
                          <button
                            onClick={() => handleRemovePlayer(teamIndex, slot.positionIdx)}
                            className="text-muted-foreground ml-2 transition-colors hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`${colors.text} font-semibold`}>{slot.player.highTier}</span>
                          <span className="text-position-adc font-semibold">{slot.player.bjmatchPoint}P</span>
                        </div>
                        {slot.player.broading === 'Y' && (
                          <span className="inline-block rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-500">
                            방송중
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenModal(teamIndex, slot.positionIdx)}
                        className="border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground w-full rounded-lg border-2 border-dashed py-2 text-sm text-xs transition-all"
                      >
                        + 선수 추가
                      </button>
                    )}
                  </div>
                );
              })}
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
