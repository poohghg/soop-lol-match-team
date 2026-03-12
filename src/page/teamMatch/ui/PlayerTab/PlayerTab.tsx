'use client';

import { Player } from '@/src/entities/player';
import { FavoritesPlayers } from '@/src/features/player';
import { PlayerListContainer } from '@/src/page/teamMatch/ui/PlayerTab/PlayerListContainer';
import { PlayTabsList } from '@/src/page/teamMatch/ui/PlayerTab/PlayTabsList';
import { SectionCard } from '@/src/page/teamMatch/ui/SectionCard';
import { Spacing, Tabs, TabsPanel } from '@/src/shared/uiKit';

interface PlayerTabProps {
  players: Player[];
  positionCountMap: Record<string, number>;
}

export const PlayerTab = ({ players }: PlayerTabProps) => {
  return (
    <SectionCard header={<h2 className="text-foreground text-2xl font-bold">선수 리스트</h2>}>
      <div className="bg-card border-card-border rounded-xl border p-2 shadow-sm backdrop-blur-sm">
        <Tabs defaultKey={'list'}>
          <PlayTabsList />
          <Spacing size={16} />
          <TabsPanel tabKey={'list'}>
            <PlayerListContainer players={players} />
          </TabsPanel>
          <TabsPanel tabKey={'favorites'}>
            <FavoritesPlayers players={players}>
              {favoritesPlayers => <PlayerListContainer players={favoritesPlayers} />}
            </FavoritesPlayers>
          </TabsPanel>
        </Tabs>
      </div>
    </SectionCard>
  );
};
