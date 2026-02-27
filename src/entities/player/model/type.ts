export interface MatchPlayer {
  players: Player[];
  positionCountMap: Record<string, number>;
  totalCount: number;
}

export type Position = '전체' | '탑' | '정글' | '미드' | '원딜' | '서폿';
export type PositionIdx = 0 | 1 | 2 | 3 | 4 | 5; //0:전체, 1: 탑, 2: 정글, 3: 미드, 4: 원딜, 5: 서폿
export type PointCalcType = 'none' | 'penalty' | 'advantage';

export interface Player {
  autoCalcFlag: 'Y' | 'N';
  bjmatchPoint: number;
  bjmatchPointOrigin: number;
  broading: 'Y' | 'N';
  gameNick: string;
  grade: number; // ??
  highTier: string;
  likeCnt: number;
  matchCnt: number; // 판수
  matchCntCalc: number; // 판수 패널티
  matchCntCalcType: PointCalcType; // 판수 패널티 타입
  memberIdx: number; // ??
  memo: string;
  minMaxCalc: number;
  positionIdx: PositionIdx;
  position: Position;
  progamerYear: number | null;
  recruitFlag: 'Y' | 'N';
  regDate: string;
  teamNameList: Record<string, string> | null; // 팀 이름 리스트
  tierCalc: number; // 티어 패널티
  tierCalcType: PointCalcType; // 티어 패널티 타입
  totalCalc: number; // 종합 패널티
  totalGameNickList: string[];
  userId: string;
  userNick: string;
  soopPageUrl: string;
}
