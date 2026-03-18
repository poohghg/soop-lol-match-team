import { Player, PlayerCard } from '@/src/entities/player';
import { cn, SeeMoreList } from '@/src/shared/uiKit';
import { useDraggable } from '@dnd-kit/core';
import { memo } from 'react';

export const DraggablePlayerCard = ({ player, isOverlay }: { player: Player; isOverlay?: boolean }) => {
  const { listeners, setNodeRef, isDragging } = useDraggable({
    id: player.userNick,
    data: player,
  });

  return (
    <div className={cn(isDragging && 'opacity-50', isOverlay && `scale-75 opacity-75`)} ref={setNodeRef} {...listeners}>
      <PlayerCard player={player} />
    </div>
  );
};

interface PlayerListProps {
  players: Player[];
  queryKey?: string;
}

export const PlayerList = memo(({ players, queryKey }: PlayerListProps) => {
  if (players.length === 0) {
    return (
      <div className="text-muted-foreground col-span-full py-12 text-center">
        <p className="text-lg font-medium">등록된 플레이어가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 @[400px]:grid-cols-2">
      <SeeMoreList key={queryKey} data={players} pageSize={30} isInfiniteScroll>
        {currentPlayers => currentPlayers.map(player => <DraggablePlayerCard key={player.userId} player={player} />)}
      </SeeMoreList>
    </div>
  );
});
