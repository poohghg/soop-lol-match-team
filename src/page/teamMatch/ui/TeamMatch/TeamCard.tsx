'use client';

import { Team, TeamSlot } from '@/src/features/player';
import { cn, openAlert, openConfirm } from '@/src/shared/uiKit';
import { useDroppable } from '@dnd-kit/core';
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
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${teamIndex}`,
    data: {
      teamIndex,
    },
  });

  const handleDeleteTeam = async () => {
    const isConfirmed = await openConfirm({
      title: '팀 삭제',
      description: <span className="font-bold text-red-500">정말 이 팀을 삭제하시겠습니까?</span>,
      cancelText: '취소',
      confirmText: '삭제',
    });

    if (isConfirmed) {
      await openAlert({
        title: '팀이 삭제되었습니다.',
        description: '팀을 삭제했습니다. 변경 사항이 저장되었습니다.',
      });

      onRemoveTeam(teamIndex);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'bg-card border-card-border relative flex flex-col gap-4 rounded-xl border p-2 shadow-sm backdrop-blur-sm',
        isOver && 'border-primary'
      )}
    >
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
          <button onClick={handleDeleteTeam} className="text-muted-foreground transition-colors hover:text-red-500">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className={`text-foreground text-sm font-medium`}>
        총점 : {team.slots.reduce((total, slot) => total + (slot.player ? slot.player.bjmatchPoint : 0), 0).toFixed(1)}P
      </div>
      <div className="grid grid-cols-5 gap-4 max-[430px]:grid-cols-1">
        {team.slots.map(slot => teamSlot(slot, teamIndex))}
      </div>
    </div>
  );
};

export const SkeletonTeamCard = () => {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-gray-200">
      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
};

export const LazyTeamCard = dynamic(() => Promise.resolve(TeamCard), {
  ssr: false,
  loading: () => <SkeletonTeamCard />,
});
