'use client';

import { Player } from '@/src/entities/player';
import { useTeamStore } from '@/src/features/player';
import { DraggablePlayerCard } from '@/src/page/teamMatch/ui/PlayerTab/PlayerList';
import { PlayerTab } from '@/src/page/teamMatch/ui/PlayerTab/PlayerTab';
import { TeamMatch } from '@/src/page/teamMatch/ui/TeamMatch/TeamMatch';
import { Spacing } from '@/src/shared/uiKit';
import { defaultDropAnimationSideEffects, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';

export const PageContent = ({ players }: { players: Player[] }) => {
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const { addPlayerToTeam } = useTeamStore();

  const handleDragStart = (event: DragStartEvent) => {
    setActivePlayer(event.active.data.current as Player);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActivePlayer(null);

    if (!over) {
      return;
    }

    const draggedPlayer = active.data.current as Player;
    const teamIndex = over.data.current?.teamIndex as number;
    addPlayerToTeam(teamIndex, draggedPlayer.positionIdx, draggedPlayer);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={`relative flex max-[800px]:flex-col`}>
        <div className={`sticky top-0 max-h-screen min-h-screen overflow-y-auto min-[800px]:w-[550px]`}>
          <TeamMatch players={players} />
        </div>
        <Spacing size={16} width={16} />
        <div className={`flex-1`}>
          <PlayerTab players={players} />
        </div>
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: '0.5' } },
            }),
          }}
        >
          {activePlayer ? <DraggablePlayerCard player={activePlayer} isOverlay={true} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};
