'use client';

import { Player } from '@/src/entities/player';
import { usePositionFilter, useSearchPlayer } from '@/src/features/player';
import { PlayerList } from '@/src/page/teamMatch/ui/PlayerTab/PlayerList';
import { PositionFilter } from '@/src/page/teamMatch/ui/PlayerTab/PositionFilter';
import { SearchBar, Spacing } from '@/src/shared/uiKit';

interface PlayerListContainerProps {
  players: Player[];
}

export const PlayerListContainer = ({ players }: PlayerListContainerProps) => {
  const { searchedPlayer, searchQuery, setQuery, positionCount } = useSearchPlayer(players);
  const { filteredPlayers, positionIdx, updatePositionIdx } = usePositionFilter(searchedPlayer);
  const queryKey = `${searchQuery.trim().toLowerCase()}-${positionIdx}`;

  return (
    <>
      <SearchBar
        className="text-muted-foreground focus-within:text-foreground border-border"
        value={searchQuery}
        onChange={query => setQuery(query)}
        placeholder="선수 이름 또는 게임 닉네임 검색..."
      />
      <Spacing size={16} />
      <PositionFilter
        positionCountMap={positionCount}
        positionIdx={positionIdx}
        updatePositionIdx={updatePositionIdx}
      />
      <Spacing size={16} />
      <PlayerList players={filteredPlayers} queryKey={queryKey} />
    </>
  );
};
