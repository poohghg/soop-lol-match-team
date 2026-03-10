'use client';

import { Player, PlayerView } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { FavoritePlayerButton, usePositionFilter, useSearchPlayer } from '@/src/features/player';
import { Dimmed, Portal, SearchBar } from '@/src/shared/uiKit';
import { Radio, X } from 'lucide-react';

interface AddPlayerModalProps {
  players: Player[];
  positionIdx: PositionIdx;
  onSelectPlayer: (player: Player) => void;
  onClose: () => void;
}

export function AddPlayerModal({ players, positionIdx, onSelectPlayer, onClose }: AddPlayerModalProps) {
  const { searchedPlayer, searchQuery, setQuery } = useSearchPlayer(players);
  const { filteredPlayers } = usePositionFilter(searchedPlayer, positionIdx);

  return (
    <Portal>
      <Dimmed />
      <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
        <div className="bg-card border-card-border flex h-9/12 w-full max-w-4xl flex-col rounded-xl border shadow-2xl">
          <div className="border-border flex items-center justify-between border-b p-4">
            <div>
              <h2 className="text-foreground text-2xl font-bold">선수 선택</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {PlayerView.getPositionName(positionIdx as unknown as PositionIdx)} 포지션 선수를 선택하세요
              </p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className={'p-4'}>
            <SearchBar
              className="text-muted-foreground focus-within:text-foreground border-border"
              value={searchQuery}
              onChange={query => setQuery(query)}
              placeholder="선수 이름 또는 게임 닉네임 검색..."
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {0 < filteredPlayers.length ? (
                filteredPlayers.map(player => {
                  const Icon = PlayerView.getPositionIcon(player.positionIdx);
                  const colors = PlayerView.getPositionClasses(player.positionIdx);

                  return (
                    <div
                      key={player.memberIdx}
                      onClick={() => onSelectPlayer(player)}
                      className="bg-muted border-border hover:border-primary hover:bg-card group cursor-pointer rounded-lg border p-4 transition-all"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <div className={`rounded-lg p-2 ${colors.bgLight} ${colors.text}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-foreground truncate font-semibold">{player.userNick}</h3>
                            <p className="text-muted-foreground truncate text-xs">{player.gameNick}</p>
                          </div>
                        </div>
                        <FavoritePlayerButton playerId={player.userNick} />
                      </div>

                      <div className="mb-3 grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-muted-foreground text-xs">티어</span>
                          <p className={`text-sm font-semibold ${colors.text}`}>{player.highTier}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">매칭 포인트</span>
                          <p className="text-position-adc text-sm font-semibold">{player.bjmatchPoint}P</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">좋아요</span>
                          <p className="text-sm text-pink-500">{player.likeCnt}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {player.broading === 'Y' && (
                          <span className="inline-flex items-center gap-1 rounded bg-red-500/20 px-2 py-1 text-xs text-red-500">
                            <Radio className="h-3 w-3" />
                            방송중
                          </span>
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
                })
              ) : (
                <div className="text-muted-foreground col-span-full py-12 text-center">검색 결과가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
