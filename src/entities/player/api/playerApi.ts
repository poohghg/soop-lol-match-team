import { FetchBuilder, ISuccessResponse } from '@/src/shared/libs/api';
import { MatchPlayerDto, MatchPlayerSchema } from '../model/schema';

export interface PlayerApi {
  fetchPlayers(): Promise<ISuccessResponse<MatchPlayerDto>>;
  fetchTeams(): Promise<ISuccessResponse<any>>;
}

export class PlayerApiImpl implements PlayerApi {
  async fetchPlayers() {
    const url = '/api/players';
    const res = await new FetchBuilder(url).build().request<MatchPlayerDto>();

    console.log('[PlayerApi] fetchPlayers response:', res);

    return {
      ...res,
      data: MatchPlayerSchema.parse(res.data),
    };
  }

  async fetchTeams() {
    const url = '/api/teams';
    const res = await new FetchBuilder(url).build().request<any>();
    return res;
  }
}
