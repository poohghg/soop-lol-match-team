import { PlayerView } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { TeamSlot } from '@/src/page/teamMatch/ui/TeamMatch/TeamMatch';
import { X } from 'lucide-react';

interface TeamSlotProps {
  slot: TeamSlot;
  teamIndex: number;
  handleOpenModal: (teamIndex: number, positionIdx: PositionIdx) => void;
  handleRemovePlayer: (teamIndex: number, positionIdx: PositionIdx) => void;
}

export const TeamSlotCard = ({ slot, teamIndex, handleOpenModal, handleRemovePlayer }: TeamSlotProps) => {
  const colors = PlayerView.getPositionClasses(slot.positionIdx);
  return (
    <button
      key={slot.positionIdx}
      className={`relative flex flex-col gap-1 border-2 ${colors.border} bg-card hover:bg-muted rounded-lg p-2 transition-all`}
      onClick={() => handleOpenModal(teamIndex, slot.positionIdx)}
    >
      <div className={`flex items-start justify-between border-b pb-1 ${colors.border}`}>
        <div className="text-foreground text-[14px] font-semibold">{slot.position}</div>
        <button
          onClick={() => handleRemovePlayer(teamIndex, slot.positionIdx)}
          className="text-muted-foreground ml-2 transition-colors hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {slot.player ? (
        <div className={`bg-muted flex flex-col gap-1`}>
          <p className="text-foreground truncate text-sm font-semibold">{slot.player.userNick}</p>
          <p className="text-muted-foreground truncate text-xs">{slot.player.gameNick}</p>
          <div className="flex items-center justify-between text-xs">
            <span className={`${colors.text} font-semibold`}>{slot.player.highTier}</span>
            <span className="text-position-adc font-semibold">{slot.player.bjmatchPoint}P</span>
          </div>
        </div>
      ) : (
        <div className={`flex flex-1 items-center justify-center`}>
          <div className="border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground w-full rounded-lg border-2 border-dashed py-2 text-sm text-xs transition-all">
            + 선수 추가
          </div>
        </div>
      )}
    </button>
  );
};
