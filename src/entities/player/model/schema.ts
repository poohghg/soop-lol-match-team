import { z } from 'zod';

export const PlayerSchema = z.object({
  autoCalcFlag: z.enum(['Y', 'N']),
  bjmatchPoint: z.number(),
  bjmatchPointOrigin: z.number(),
  broading: z.enum(['Y', 'N']),
  exposeCalcHistoryIdx: z.number().optional(),
  gameNick: z.string(),
  grade: z.number(),
  highTier: z.string(),
  likeCnt: z.number(),
  likeYn: z.enum(['Y', 'N']),
  matchCnt: z.number(),
  matchCntCalc: z.number(),
  matchCntCalcType: z.enum(['none', 'penalty', 'advantage']),
  memberIdx: z.number(),
  memo: z.string(),
  minMaxCalc: z.number(),
  positionIdx: z.number(),
  progamerYear: z.number().nullable(),
  recruitFlag: z.enum(['Y', 'N']),
  regDate: z.string(),
  teamNameList: z.record(z.string(), z.string()).nullable(),
  tierCalc: z.number(),
  tierCalcType: z.enum(['none', 'penalty', 'advantage']),
  totalCalc: z.number(),
  totalGameNickList: z.array(z.string()),
  userId: z.string(),
  userNick: z.string(),
  includedTeamCnt: z.number(),
  manualCalcType: z.enum(['none', 'penalty', 'advantage']),
});

export const MatchPlayerSchema = z.object({
  faList: z.array(PlayerSchema),
  positionCountMap: z.record(z.string(), z.number()),
  totalCount: z.number(),
});

export type PlayerDto = z.infer<typeof PlayerSchema>;
export type MatchPlayerDto = z.infer<typeof MatchPlayerSchema>;
