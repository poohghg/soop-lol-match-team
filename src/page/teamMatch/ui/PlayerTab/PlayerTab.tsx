'use client';

import { Player } from '@/src/entities/player';
import { usePositionFilter, useSearchPlayer } from '@/src/features/player';
import { PlayerList } from '@/src/page/teamMatch/ui/PlayerTab/PlayerList';
import { PlayTabsList } from '@/src/page/teamMatch/ui/PlayerTab/PlayTabsList';
import { PositionFilter } from '@/src/page/teamMatch/ui/PlayerTab/PositionFilter';
import { SearchBar, Spacing, Tabs } from '@/src/shared/uiKit';

interface PlayerListSectionProps {
  players: Player[];
  positionCountMap: Record<string, number>;
}

export function PlayerTab({ players, positionCountMap }: PlayerListSectionProps) {
  const { filteredPlayers, positionIdx, updatePositionIdx } = usePositionFilter(players);
  const { searchedPlayer, setQuery, searchQuery } = useSearchPlayer(filteredPlayers);
  const queryKey = `${searchQuery.trim().toLowerCase()}-${positionIdx}`;

  return (
    <section>
      <h2 className="text-foreground mb-6 text-2xl font-bold">선수 리스트</h2>
      <div className="bg-card border-card-border rounded-xl border p-2 shadow-sm backdrop-blur-sm">
        <Tabs defaultKey={'list'}>
          <PlayTabsList />
          <Spacing size={16} />
          <SearchBar
            className="text-muted-foreground focus-within:text-foreground border-border"
            value={searchQuery}
            onChange={query => setQuery(query)}
            placeholder="선수 이름 또는 게임 닉네임 검색..."
          />
          <Spacing size={16} />
          <PositionFilter
            // totalCount={totalCount}
            // positionCountMap={positionCountMap}
            positionIdx={positionIdx}
            updatePositionIdx={updatePositionIdx}
          />
          <Spacing size={16} />
          <PlayerList players={searchedPlayer} queryKey={queryKey} />
        </Tabs>
      </div>
    </section>
  );
}
