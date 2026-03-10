import { Player } from '@/src/entities/player';
import { LazyFavoritePlayerButton } from '@/src/features/player/ui/FavoritePlayerButton';
import { copyToClipboard } from '@/src/shared/lib/utils';
import { SeeMoreList, toasts } from '@/src/shared/uiKit';
import { ToolTip } from '@/src/shared/uiKit/ui/Tooltop/Tooltop';
import { CircleHelp, Heart, Radio, Shield, Sparkles, Sword, Target } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

const positionIcons = {
  '1': Shield,
  '2': Sword,
  '3': Sparkles,
  '4': Target,
  '5': Heart,
};

const positionClasses = {
  '1': {
    bg: 'bg-position-top',
    text: 'text-position-top',
    bgLight: 'bg-position-top/20',
  },
  '2': {
    bg: 'bg-position-jungle',
    text: 'text-position-jungle',
    bgLight: 'bg-position-jungle/20',
  },
  '3': {
    bg: 'bg-position-mid',
    text: 'text-position-mid',
    bgLight: 'bg-position-mid/20',
  },
  '4': {
    bg: 'bg-position-adc',
    text: 'text-position-adc',
    bgLight: 'bg-position-adc/20',
  },
  '5': {
    bg: 'bg-position-support',
    text: 'text-position-support',
    bgLight: 'bg-position-support/20',
  },
};

const getCalcColorClass = (calc: number) => {
  if (calc < 0) {
    return 'text-blue-500';
  }
  if (calc > 0) {
    return 'text-red-500';
  }
  return 'text-muted-foreground';
};

const PlayerListRow = ({ player }: { player: Player }) => {
  const Icon = positionIcons[player.positionIdx as keyof typeof positionIcons];
  const colors = positionClasses[player.positionIdx as keyof typeof positionClasses];
  const calcColor = getCalcColorClass(player.totalCalc);

  const handleCopyClick = async () => {
    const isSuccess = await copyToClipboard(player.userNick);
    if (isSuccess) {
      toasts.success(`${player.userNick} 닉네임이 클립보드에 복사되었습니다.`);
    }
  };

  return (
    <div
      key={player.memberIdx}
      className="bg-muted border-border hover:border-primary/50 rounded-lg border p-4 transition-all"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
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
            <Icon className="h-4 w-4" />
          </ToolTip>
          <div className="min-w-0 flex-1">
            <h3 role={'button'} className="text-foreground truncate font-semibold" onClick={handleCopyClick}>
              {player.userNick}
            </h3>
            <p className="text-muted-foreground truncate text-xs">{player.gameNick}</p>
          </div>
        </div>
        <LazyFavoritePlayerButton playerId={player.userNick} />
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
                      <span className={`text-xs ${getCalcColorClass(player.matchCntCalc)}`}>
                        판수 : {player.matchCntCalc}P ({player.matchCntCalcType === 'penalty' ? '감점' : '가점'})
                      </span>
                    )}
                    {player.tierCalc !== 0 && (
                      <span className={getCalcColorClass(player.tierCalc)}>
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
};

interface PlayerListProps {
  players: Player[];
  queryKey?: string;
}

export const PlayerList = memo(({ players, queryKey }: PlayerListProps) => {
  if (players.length === 0) {
    return (
      <div className="text-muted-foreground col-span-full py-12 text-center">
        <p className="text-lg font-medium">등록된 플레이어가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SeeMoreList key={queryKey} data={players} pageSize={30} isInfiniteScroll>
        {currentPlayers => currentPlayers.map(player => <PlayerListRow key={player.memberIdx} player={player} />)}
      </SeeMoreList>
    </div>
  );
});
