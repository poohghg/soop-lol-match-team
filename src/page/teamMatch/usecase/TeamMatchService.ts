import { Player, PlayerRepository, PlayerRepositoryImpl } from '@/src/entities/player';

interface TeamMatchUseCase {
  getPlayers: () => Promise<{
    players: Player[];
    positionCountMap: {
      [positionIdx: string]: number;
    };
  }>;
}

class TeamMatchService implements TeamMatchUseCase {
  constructor(private playerRepository: PlayerRepository) {}

  getPlayers = async () => {
    const { players, positionCountMap, totalCount } = await this.playerRepository.getPlayers();
    return {
      players,
      positionCountMap: {
        '0': totalCount,
        ...positionCountMap,
      },
    };
  };
}

export const teamMatchService = new TeamMatchService(new PlayerRepositoryImpl());
