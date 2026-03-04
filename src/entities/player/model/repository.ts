import { PlayerApiImpl } from '@/src/entities/player/api/playerApi';
import { MatchPlayer } from '@/src/entities/player/model/type';
import { PlayerMapper } from './mapper';

export interface PlayerRepository {
  getPlayers(): Promise<MatchPlayer>;
}

export class PlayerRepositoryImpl implements PlayerRepository {
  private api: PlayerApiImpl;

  constructor() {
    this.api = new PlayerApiImpl();
  }

  async getPlayers() {
    const res = await this.api.fetchPlayers();
    await this.api.fetchTeams();
    return {
      players: res.data.faList.map(PlayerMapper.toPlayer),
      totalCount: res.data.totalCount,
      positionCountMap: res.data.positionCountMap,
    };
  }
}

export const playerRepository = new PlayerRepositoryImpl();
