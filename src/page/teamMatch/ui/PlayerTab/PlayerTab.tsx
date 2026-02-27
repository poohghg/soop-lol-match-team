'use client';

import { Player } from '@/src/entities/player';
import { PlayerList } from '@/src/page/teamMatch/ui/PlayerTab/PlayerList';
import { FilterBar, SearchBar, Spacing, Tabs, TabsList, TabsListActive, TabsTrigger } from '@/src/shared/uiKit';
import { useState } from 'react';

interface PlayerListSectionProps {
  players: Player[];
}

export function PlayerTab({ players }: PlayerListSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section>
      <h2 className="text-foreground mb-6 text-2xl font-bold">선수 리스트</h2>
      <div className="bg-card border-card-border rounded-xl border p-6 shadow-sm backdrop-blur-sm">
        <Tabs defaultKey={'list'}>
          <TabsList className="border-border border-b">
            <TabsListActive className="from-primary bg-gradient-to-r to-purple-500" type="underline" />
            <TabsTrigger tabKey={'list'} className={`px-4 pb-3 font-semibold`}>
              전체 리스트
            </TabsTrigger>
            <TabsTrigger tabKey={'favorites'} className={`flex items-center gap-1 px-4 pb-3 font-semibold`}>
              즐겨찾기
            </TabsTrigger>
          </TabsList>
          <Spacing size={16} />
          <SearchBar
            className="text-muted-foreground focus-within:text-foreground border-border"
            value={searchQuery}
            onChange={query => setSearchQuery(query)}
            placeholder="선수 이름 또는 게임 닉네임 검색..."
          />
          <Spacing size={16} />
          <FilterBar defaultValue={'0'}>
            <FilterBar.Active />
            <FilterBar.Button value={'0'}>전체</FilterBar.Button>
            <FilterBar.Button value={'1'}>탑</FilterBar.Button>
            <FilterBar.Button value={'2'}>정글</FilterBar.Button>
            <FilterBar.Button value={'3'}>미드</FilterBar.Button>
            <FilterBar.Button value={'4'}>원딜</FilterBar.Button>
            <FilterBar.Button value={'5'}>서폿</FilterBar.Button>
          </FilterBar>
          <Spacing size={16} />
          <PlayerList players={players} />
        </Tabs>
      </div>
    </section>
  );
}
