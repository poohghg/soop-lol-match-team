import { PlayerView } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { TeamSlot } from '@/src/features/player';
import { X } from 'lucide-react';

interface TeamSlotProps {
  slot: TeamSlot;
  teamIndex: number;
  onOpenModal: (teamIndex: number, positionIdx: PositionIdx) => void;
  onRemovePlayer: () => void;
}

export const TeamSlotCard = ({ slot, teamIndex, onOpenModal, onRemovePlayer }: TeamSlotProps) => {
  const colors = PlayerView.getPositionClasses(slot.positionIdx);

  return (
    <div
      key={slot.positionIdx}
      className={`relative flex flex-col gap-1 border-2 ${colors.border} bg-card hover:bg-muted justify-between rounded-lg p-1.5 transition-all hover:scale-105`}
      onClick={() => onOpenModal(teamIndex, slot.positionIdx)}
      role={'button'}
    >
      <div className={`flex items-start justify-between border-b pb-1 ${colors.border}`}>
        <div className="text-foreground text-[14px] font-semibold">{slot.position}</div>
        {slot.player && (
          <button
            onClick={e => {
              e.stopPropagation();
              onRemovePlayer();
            }}
            className="text-muted-foreground ml-2 transition-colors hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {slot.player ? (
        <div className={`bg-muted flex flex-col gap-1`}>
          <p className="text-foreground truncate text-[11px] font-semibold">{slot.player.userNick}</p>
          <p className="text-muted-foreground truncate text-[11px]">{slot.player.highTier}</p>
          <p className="text-muted-foreground truncate text-[11px]">{slot.player.bjmatchPoint}P</p>
        </div>
      ) : (
        <div className={`flex flex-1 items-center justify-center`}>
          <div className="border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground w-full rounded-lg border-2 border-dashed py-2 text-center text-xs transition-all">
            선수 추가
          </div>
        </div>
      )}
    </div>
  );
};
