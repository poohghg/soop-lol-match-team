import { Team, TeamSlot } from '@/src/features/player';
import { TeamSlotCard } from '@/src/page/teamMatch/ui/TeamMatch/TeamSlotCard';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

interface TeamCardProps {
  teamIndex: number;
  team: Team;
  isRemovable: boolean;
  onTeamTitleChange: (teamIndex: number, newTitle: string) => void;
  onRemoveTeam: (teamIndex: number) => void;
  teamSlot: (slot: TeamSlot, teamIndex: number) => React.ReactNode;
}

export const TeamCard = ({
  teamIndex,
  team,
  isRemovable,
  onTeamTitleChange,
  onRemoveTeam,
  teamSlot,
}: TeamCardProps) => {
  return (
    <div className="bg-card border-card-border relative flex flex-col gap-4 rounded-xl border p-2 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <input
          className="w-full bg-transparent text-lg font-semibold text-gray-500 focus:outline-none"
          type="text"
          maxLength={30}
          value={team.title}
          onChange={e => onTeamTitleChange(teamIndex, e.target.value)}
          placeholder={`팀 #${teamIndex + 1}`}
        />
        {isRemovable && (
          <button
            onClick={() => onRemoveTeam(teamIndex)}
            className="text-muted-foreground transition-colors hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className={`text-foreground text-sm font-medium`}>
        총점 : {team.slots.reduce((total, slot) => total + (slot.player ? slot.player.bjmatchPoint : 0), 0)}P
      </div>
      <div className="grid grid-cols-5 gap-4 max-[430px]:grid-cols-1">
        {team.slots.map(slot => teamSlot(slot, teamIndex))}
      </div>
    </div>
  );
};

export const LazyTeamCard = dynamic(() => Promise.resolve(TeamCard), {
  ssr: false,
  loading: () => (
    <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-gray-200">
      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  ),
});
