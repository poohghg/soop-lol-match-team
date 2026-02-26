'use client';

import { TeamSlot } from '@/src/page/teamMatch/ui/TeamMatchPage';
import { Heart, Plus, Shield, Sparkles, Sword, Target, X } from 'lucide-react';

interface TeamMatchSectionProps {
  teams: TeamSlot[][];
  onAddTeam: () => void;
  onRemoveTeam: (teamIndex: number) => void;
  onOpenModal: (teamIndex: number, positionIdx: number) => void;
  onRemovePlayer: (teamIndex: number, positionIdx: number) => void;
}

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

export function TeamMatch({ teams, onAddTeam, onRemoveTeam, onOpenModal, onRemovePlayer }: TeamMatchSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">팀 매칭</h2>
        <button
          onClick={onAddTeam}
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
                  onClick={() => onRemoveTeam(teamIndex)}
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
                            onClick={() => onRemovePlayer(teamIndex, slot.positionIdx)}
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
                        onClick={() => onOpenModal(teamIndex, slot.positionIdx)}
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
    </section>
  );
}
