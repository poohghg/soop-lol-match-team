import { Player, PlayerCard } from '@/src/entities/player';
import { SeeMoreList } from '@/src/shared/uiKit';
import { memo } from 'react';

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SeeMoreList key={queryKey} data={players} pageSize={30} isInfiniteScroll>
        {currentPlayers => currentPlayers.map(player => <PlayerCard key={player.memberIdx} player={player} />)}
      </SeeMoreList>
    </div>
  );
});
