'use client';

import { Player, PlayerView } from '@/src/entities/player';
import { LazyFavoritePlayerButton } from '@/src/features/player';
import { copyToClipboard } from '@/src/shared/libs/utils/jsUtils';
import { cn, toasts, ToolTip } from '@/src/shared/uiKit';
import { CircleHelp, Radio } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';

export const PlayerCard = memo(({ player }: { player: Player }) => {
  const PositionIcon = useMemo(() => PlayerView.getPositionIcon(player.positionIdx), [player.positionIdx]);
  const colors = PlayerView.getPositionClasses(player.positionIdx);
  const calcColor = PlayerView.getCalcPointClass(player.totalCalc);

  const handleCopyClick = async () => {
    const isSuccess = await copyToClipboard(player.userNick);
    if (isSuccess) {
      toasts.success(`${player.userNick} 닉네임이 클립보드에 복사되었습니다.`);
    }
  };

  return (
    <div
      className={cn(`bg-muted border-border hover:border-primary/50 rounded-lg border p-2 transition-all`)}
      // style={style}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <ToolTip
            className={`rounded-lg p-2 ${colors.bgLight} ${colors.text}`}
            text={
              <div
                className={`flex items-center gap-1 border text-xs ${colors.bg} text-background z-1 rounded px-2 py-1`}
              >
                {player.position}
              </div>
            }
          >
            {/* eslint-disable-next-line react-hooks/static-components */}
            <PositionIcon className="h-4 w-4" />
          </ToolTip>
          <div className="min-w-0">
            <h3 role={'button'} className="text-foreground truncate font-semibold" onClick={handleCopyClick}>
              {player.userNick}
            </h3>
            <p className="text-muted-foreground truncate text-xs">{player.gameNick}</p>
          </div>
        </div>
        <LazyFavoritePlayerButton className={`flex-shrink-0`} playerId={player.userNick} />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">최고 티어</span>
          <span className={`text-xs ${colors.text} font-semibold`}>{player.highTier}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">점수 가감</span>
          <div className={`flex items-center gap-1 ${calcColor}`}>
            <span className={`text-xs font-semibold`}>{player.totalCalc}P</span>
            {player.totalCalc !== 0 && (
              <ToolTip
                text={
                  <div
                    className={
                      'bg-background text-background border-card-border flex flex-col gap-1 rounded-[8px] border p-2 text-xs'
                    }
                  >
                    {player.matchCntCalc !== 0 && (
                      <span className={`text-xs ${PlayerView.getCalcPointClass(player.matchCntCalc)}`}>
                        판수 : {player.matchCntCalc}P ({player.matchCntCalcType === 'penalty' ? '감점' : '가점'})
                      </span>
                    )}
                    {player.tierCalc !== 0 && (
                      <span className={PlayerView.getCalcPointClass(player.tierCalc)}>
                        티어 : {player.tierCalc}P ({player.tierCalcType === 'penalty' ? '감점' : '가점'})
                      </span>
                    )}
                  </div>
                }
              >
                <CircleHelp size={14} color="#adb5bd" strokeWidth={2} />
              </ToolTip>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">점수</span>
          <span className="text-xs font-semibold">{player.bjmatchPoint}P</span>
        </div>
      </div>
      <div className="border-border mt-3 flex gap-2 border-t pt-3">
        {player.broading === 'Y' && (
          <Link
            href={player.soopPageUrl}
            target={'_blank'}
            className="inline-flex items-center gap-1 rounded bg-red-500/20 px-2 py-1 text-xs text-red-500"
          >
            <Radio className="h-3 w-3" />
            방송중
          </Link>
        )}
        {player.recruitFlag === 'Y' ? (
          <span className="inline-flex items-center rounded bg-green-500/20 px-2 py-1 text-xs text-green-500">
            모집중
          </span>
        ) : (
          <span className="bg-muted text-muted-foreground inline-flex items-center rounded px-2 py-1 text-xs">
            모집완료
          </span>
        )}
      </div>
    </div>
  );
});
