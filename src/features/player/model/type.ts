import { Player } from '@/src/entities/player';
import { Position, PositionIdx } from '@/src/entities/player/model/type';

export type SortDirection = 'ASC' | 'DESC';

export interface TeamSlot {
  position: Position;
  positionIdx: PositionIdx;
  player: Player | null;
}

export interface Team {
  title: string;
  slots: TeamSlot[];
}
