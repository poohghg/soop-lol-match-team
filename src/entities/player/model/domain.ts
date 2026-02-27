import { Player, PointCalcType, Position, PositionIdx } from '@/src/entities/player/model/type';

const positionNames: Record<PositionIdx, Position> = {
  0: '전체',
  1: '탑',
  2: '정글',
  3: '미드',
  4: '원딜',
  5: '서폿',
};

interface PlayerProps {
  autoCalcFlag: 'Y' | 'N';
  bjmatchPoint: number;
  bjmatchPointOrigin: number;
  broading: 'Y' | 'N';
  gameNick: string;
  grade: number;
  highTier: string;
  likeCnt: number;
  matchCnt: number;
  matchCntCalc: number;
  matchCntCalcType: 'none' | 'penalty' | 'advantage';
  memberIdx: number;
  memo: string;
  minMaxCalc: number;
  positionIdx: number;
  progamerYear: number | null;
  recruitFlag: 'Y' | 'N';
  regDate: string;
  teamNameList: Record<string, string> | null;
  tierCalc: number;
  tierCalcType: 'none' | 'penalty' | 'advantage';
  totalCalc: number;
  totalGameNickList: string[];
  userId: string;
  userNick: string;
}

export class DerivedPlayer implements Player {
  constructor(private readonly props: PlayerProps) {}
  get autoCalcFlag() {
    return this.props.autoCalcFlag;
  }

  get bjmatchPoint() {
    return this.props.bjmatchPoint;
  }

  get bjmatchPointOrigin() {
    return this.props.bjmatchPointOrigin;
  }

  get broading() {
    return this.props.broading;
  }

  get gameNick() {
    return this.props.gameNick;
  }

  get totalGameNickList() {
    return this.props.totalGameNickList;
  }

  get grade() {
    return this.props.grade;
  }

  get highTier() {
    return this.props.highTier;
  }

  get likeCnt() {
    return this.props.likeCnt;
  }

  get matchCnt() {
    return this.props.matchCnt;
  }

  get matchCntCalc() {
    return this.signedCalcPoint(this.props.matchCntCalc, this.props.matchCntCalcType);
  }

  get matchCntCalcType() {
    return this.props.matchCntCalcType;
  }

  get memberIdx() {
    return this.props.memberIdx;
  }

  get memo() {
    return this.props.memo;
  }

  get minMaxCalc() {
    return this.props.minMaxCalc;
  }

  get positionIdx() {
    return this.props.positionIdx as PositionIdx;
  }

  get position() {
    return positionNames[this.positionIdx];
  }

  get progamerYear() {
    return this.props.progamerYear;
  }

  get recruitFlag() {
    return this.props.recruitFlag;
  }

  get regDate() {
    return this.props.regDate;
  }

  get teamNameList() {
    return this.props.teamNameList;
  }

  get tierCalc() {
    return this.signedCalcPoint(this.props.tierCalc, this.props.tierCalcType);
  }

  get tierCalcType() {
    return this.props.tierCalcType;
  }

  get totalCalc() {
    return this.props.totalCalc;
  }

  get userId() {
    return this.props.userId;
  }

  get userNick() {
    return this.props.userNick;
  }

  get soopPageUrl() {
    return `https://www.sooplive.co.kr/station/${this.userId}`;
  }

  toJson(): Player {
    return {
      autoCalcFlag: this.autoCalcFlag,
      bjmatchPoint: this.bjmatchPoint,
      bjmatchPointOrigin: this.bjmatchPointOrigin,
      broading: this.broading,
      gameNick: this.gameNick,
      grade: this.grade,
      highTier: this.highTier,
      likeCnt: this.likeCnt,
      matchCnt: this.matchCnt,
      matchCntCalc: this.matchCntCalc,
      matchCntCalcType: this.matchCntCalcType,
      memberIdx: this.memberIdx,
      memo: this.memo,
      minMaxCalc: this.minMaxCalc,
      positionIdx: this.positionIdx,
      position: this.position,
      progamerYear: this.progamerYear,
      recruitFlag: this.recruitFlag,
      regDate: this.regDate,
      teamNameList: this.teamNameList,
      tierCalc: this.tierCalc,
      tierCalcType: this.tierCalcType,
      totalCalc: this.totalCalc,
      totalGameNickList: this.totalGameNickList,
      userId: this.userId,
      userNick: this.userNick,
      soopPageUrl: this.soopPageUrl,
    };
  }

  private signedCalcPoint(point: number, calcType: PointCalcType) {
    if (calcType === 'penalty') {
      return Math.abs(point);
    }

    if (calcType === 'advantage') {
      return -Math.abs(point);
    }

    return 0;
  }
}
