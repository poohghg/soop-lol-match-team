'use client';

import { Player } from '@/src/entities/player';
import { useTeamStore } from '@/src/features/player';
import { DraggablePlayerCard } from '@/src/page/teamMatch/ui/PlayerTab/PlayerList';
import { PlayerTab } from '@/src/page/teamMatch/ui/PlayerTab/PlayerTab';
import { TeamMatch } from '@/src/page/teamMatch/ui/TeamMatch/TeamMatch';
import { useWindowSizes } from '@/src/shared/libs/hooks';
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';

export const PageContent = ({ players }: { players: Player[] }) => {
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const { addPlayerToTeam } = useTeamStore();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const { width } = useWindowSizes();

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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className={`relative flex flex-col gap-[16px] min-[1081px]:flex-row`}>
        <div className="scroll-m-0 overflow-y-auto min-[1081px]:sticky min-[1081px]:top-5 min-[1081px]:max-h-screen min-[1081px]:min-h-screen min-[1081px]:w-[550px] min-[1081px]:pb-30">
          <TeamMatch players={players} />
        </div>
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
