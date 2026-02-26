'use client';

import { Player } from '@/src/entities/player';
import { TeamSlot } from '@/src/page/teamMatch/ui/TeamMatchPage';
import { Heart, Plus, Shield, Sparkles, Sword, Target, X } from 'lucide-react';
import { useState } from 'react';

const positionIcons = {
  1: Shield,
  2: Sword,
  3: Sparkles,
  4: Target,
  5: Heart,
};

const positionClasses = {
  1: {
    bg: 'bg-position-top',
    text: 'text-position-top',
    border: 'border-position-top',
    bgLight: 'bg-position-top/20',
  },
  2: {
    bg: 'bg-position-jungle',
    text: 'text-position-jungle',
    border: 'border-position-jungle',
    bgLight: 'bg-position-jungle/20',
  },
  3: {
    bg: 'bg-position-mid',
    text: 'text-position-mid',
    border: 'border-position-mid',
    bgLight: 'bg-position-mid/20',
  },
  4: {
    bg: 'bg-position-adc',
    text: 'text-position-adc',
    border: 'border-position-adc',
    bgLight: 'bg-position-adc/20',
  },
  5: {
    bg: 'bg-position-support',
    text: 'text-position-support',
    border: 'border-position-support',
    bgLight: 'bg-position-support/20',
  },
};

interface TeamMatchSectionProps {
  players: Player[];
}

export function TeamMatch({ players }: TeamMatchSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState<TeamSlot[][]>([
    [
      { position: '탑', positionIdx: 1, player: null },
      { position: '정글', positionIdx: 2, player: null },
      { position: '미드', positionIdx: 3, player: null },
      { position: '원딜', positionIdx: 4, player: null },
      { position: '서폿', positionIdx: 5, player: null },
    ],
  ]);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const handleAddTeam = () => {
    setTeams([
      ...teams,
      [
        { position: '탑', positionIdx: 1, player: null },
        { position: '정글', positionIdx: 2, player: null },
        { position: '미드', positionIdx: 3, player: null },
        { position: '원딜', positionIdx: 4, player: null },
        { position: '서폿', positionIdx: 5, player: null },
      ],
    ]);
  };

  const handleRemoveTeam = (teamIndex: number) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, index) => index !== teamIndex));
    }
  };

  const handleOpenModal = (teamIndex: number, positionIdx: number) => {
    setSelectedTeamIndex(teamIndex);
    setSelectedPosition(positionIdx);
    setIsModalOpen(true);
  };

  const handleSelectPlayer = (player: Player) => {
    if (selectedTeamIndex !== null && selectedPosition !== null) {
      const newTeams = [...teams];
      const slotIndex = newTeams[selectedTeamIndex].findIndex(slot => slot.positionIdx === selectedPosition);
      newTeams[selectedTeamIndex][slotIndex].player = player;
      setTeams(newTeams);
      setIsModalOpen(false);
      setSelectedTeamIndex(null);
      setSelectedPosition(null);
    }
  };

  const handleRemovePlayer = (teamIndex: number, positionIdx: number) => {
    const newTeams = [...teams];
    const slotIndex = newTeams[teamIndex].findIndex(slot => slot.positionIdx === positionIdx);
    newTeams[teamIndex][slotIndex].player = null;
    setTeams(newTeams);
  };

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
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
            className="bg-card border-card-border relative rounded-xl border p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-foreground text-lg font-semibold">팀 #{teamIndex + 1}</h3>
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
              {team.map(slot => {
                const Icon = positionIcons[slot.positionIdx as keyof typeof positionIcons];
                const colors = positionClasses[slot.positionIdx as keyof typeof positionClasses];

                return (
                  <div
                    key={slot.positionIdx}
                    className={`relative border-2 ${colors.border} bg-card hover:bg-muted rounded-lg p-4 transition-all`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div className={`rounded-lg p-2 ${colors.bg}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-foreground font-semibold">{slot.position}</span>
                    </div>

                    {slot.player ? (
                      <div className="space-y-2">
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
                        className="border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground w-full rounded-lg border-2 border-dashed py-3 text-sm transition-all"
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
      {/*{isModalOpen && (*/}
      {/*  <AddPlayerModal*/}
      {/*    players={players}*/}
      {/*    positionIdx={selectedPosition}*/}
      {/*    onSelectPlayer={handleSelectPlayer}*/}
      {/*    onClose={() => {*/}
      {/*      setIsModalOpen(false);*/}
      {/*      setSelectedTeamIndex(null);*/}
      {/*      setSelectedPosition(null);*/}
      {/*    }}*/}
      {/*    favorites={favorites}*/}
      {/*    onToggleFavorite={handleToggleFavorite}*/}
      {/*  />*/}
      {/*)}*/}
    </section>
  );
}
