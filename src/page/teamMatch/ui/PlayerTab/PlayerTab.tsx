'use client';

import { Player } from '@/src/entities/player';
import { FavoritesPlayers, usePositionFilter, useSearchPlayer } from '@/src/features/player';
import { PlayerList } from '@/src/page/teamMatch/ui/PlayerTab/PlayerList';
import { PlayTabsList } from '@/src/page/teamMatch/ui/PlayerTab/PlayTabsList';
import { PositionFilter } from '@/src/page/teamMatch/ui/PlayerTab/PositionFilter';
import { SearchBar, Spacing, Tabs, TabsPanel } from '@/src/shared/uiKit';
import { useMemo } from 'react';

interface PlayerTabProps {
  players: Player[];
  positionCountMap: Record<string, number>;
}

export function PlayerTab({ players, positionCountMap }: PlayerTabProps) {
  const { searchedPlayer, searchQuery, setQuery, normalizedQuery } = useSearchPlayer(players);
  const { filteredPlayers, positionIdx, updatePositionIdx } = usePositionFilter(searchedPlayer);
  const queryKey = `${searchQuery.trim().toLowerCase()}-${positionIdx}`;
  const positionCount = useMemo(() => {
    if (normalizedQuery === '') {
      return positionCountMap;
    }

    const map: Record<string, number> = {
      '0': searchedPlayer.length,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
    };

    searchedPlayer.forEach(player => {
      map[player.positionIdx] += 1;
    });
    return map;
  }, [searchedPlayer, normalizedQuery, positionCountMap]);

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
            positionCountMap={positionCount}
            positionIdx={positionIdx}
            updatePositionIdx={updatePositionIdx}
          />
          <Spacing size={16} />
          <TabsPanel tabKey={'list'}>
            <PlayerList players={filteredPlayers} queryKey={queryKey} />
          </TabsPanel>
          <TabsPanel tabKey={'favorites'}>
            <FavoritesPlayers players={filteredPlayers}>
              {favoritesPlayers => <PlayerList players={favoritesPlayers} queryKey={queryKey} />}
            </FavoritesPlayers>
          </TabsPanel>
        </Tabs>
      </div>
    </section>
  );
}
