'use client';

import { Player } from '@/src/page/teamMatch/ui/TeamMatchPage';
import { Heart, Radio, Search, Shield, Sparkles, Star, Sword, Target, X } from 'lucide-react';
import { useState } from 'react';

interface AddPlayerModalProps {
  players: Player[];
  positionIdx: number | null;
  onSelectPlayer: (player: Player) => void;
  onClose: () => void;
  favorites: number[];
  onToggleFavorite: (memberIdx: number) => void;
}

const positionMap: Record<number, string> = {
  1: '탑',
  2: '정글',
  3: '미드',
  4: '원딜',
  5: '서폿',
};

const positionIcons = {
  1: Shield,
  2: Sword,
  3: Sparkles,
  4: Target,
  5: Heart,
};

const positionClasses = {
  1: {
    bg: 'bg-position-top',
    text: 'text-position-top',
    bgLight: 'bg-position-top/20',
  },
  2: {
    bg: 'bg-position-jungle',
    text: 'text-position-jungle',
    bgLight: 'bg-position-jungle/20',
  },
  3: {
    bg: 'bg-position-mid',
    text: 'text-position-mid',
    bgLight: 'bg-position-mid/20',
  },
  4: {
    bg: 'bg-position-adc',
    text: 'text-position-adc',
    bgLight: 'bg-position-adc/20',
  },
  5: {
    bg: 'bg-position-support',
    text: 'text-position-support',
    bgLight: 'bg-position-support/20',
  },
};

export function AddPlayerModal({
  players,
  positionIdx,
  onSelectPlayer,
  onClose,
  favorites,
  onToggleFavorite,
}: AddPlayerModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = players.filter(player => {
    const matchesPosition = positionIdx === null || player.positionIdx === positionIdx;
    const matchesSearch =
      searchQuery === '' ||
      player.userNick.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.gameNick.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPosition && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="bg-card border-card-border flex max-h-[80vh] w-full max-w-4xl flex-col rounded-xl border shadow-2xl">
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-foreground text-2xl font-bold">선수 선택</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {positionIdx && `${positionMap[positionIdx]} 포지션 선수를 선택하세요`}
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="border-border border-b p-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <input
              type="text"
              placeholder="선수 이름 또는 게임 닉네임 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-input-background border-input text-foreground placeholder-muted-foreground focus:border-primary w-full rounded-lg border py-2.5 pr-4 pl-10 transition-colors focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Player List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map(player => {
                const Icon = positionIcons[player.positionIdx as keyof typeof positionIcons];
                const colors = positionClasses[player.positionIdx as keyof typeof positionClasses];
                const isFavorite = favorites.includes(player.memberIdx);

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
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onToggleFavorite(player.memberIdx);
                        }}
                        className={`transition-all ${
                          isFavorite ? 'text-yellow-400' : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                      >
                        <Star className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
                      </button>
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
                      <div>
                        <span className="text-muted-foreground text-xs">경기 수</span>
                        <p className="text-foreground text-sm">{player.matchCnt}</p>
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

        {/* Footer */}
        <div className="border-border border-t p-6">
          <button
            onClick={onClose}
            className="bg-muted hover:bg-muted-foreground/20 text-foreground w-full rounded-lg py-2.5 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
