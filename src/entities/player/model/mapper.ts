import { DerivedPlayer } from '@/src/entities/player/model/domain';
import { PlayerDto } from '@/src/entities/player/model/schema';
import { Player } from '@/src/entities/player/model/type';

export class PlayerMapper {
  static toPlayer(dto: PlayerDto): Player {
    return new DerivedPlayer({
      autoCalcFlag: dto.autoCalcFlag,
      bjmatchPoint: dto.bjmatchPoint,
      bjmatchPointOrigin: dto.bjmatchPointOrigin,
      broading: dto.broading,
      gameNick: dto.gameNick,
      grade: dto.grade,
      highTier: dto.highTier,
      likeCnt: dto.likeCnt,
      matchCnt: dto.matchCnt,
      matchCntCalc: dto.matchCntCalc,
      matchCntCalcType: dto.matchCntCalcType,
      memberIdx: dto.memberIdx,
      memo: dto.memo,
      minMaxCalc: dto.minMaxCalc,
      positionIdx: dto.positionIdx,
      progamerYear: dto.progamerYear,
      recruitFlag: dto.recruitFlag,
      regDate: dto.regDate,
      teamNameList: dto.teamNameList,
      tierCalc: dto.tierCalc,
      tierCalcType: dto.tierCalcType,
      totalCalc: dto.totalCalc,
      totalGameNickList: dto.totalGameNickList,
      userId: dto.userId,
      userNick: dto.userNick,
    }).toJson();
  }
}
