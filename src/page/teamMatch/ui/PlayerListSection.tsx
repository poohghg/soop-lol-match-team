'use client';

import { Player } from '@/src/page/teamMatch/ui/TeamMatchPage';
import { SearchBar, Spacing, Tabs, TabsList, TabsListActive, TabsTrigger } from '@/src/shared/uiKit';
import { Heart, Radio, Shield, Sparkles, Star, Sword, Target } from 'lucide-react';
import { useState } from 'react';

interface PlayerListSectionProps {
  players: Player[];
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

export function PlayerListSection({ players, favorites, onToggleFavorite }: PlayerListSectionProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'favorites'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const tiers = ['챌린저', '그마', '마스터', '다이아'];

  const filteredPlayers = players.filter(player => {
    const matchesTab = activeTab === 'list' || favorites.includes(player.memberIdx);
    const matchesSearch =
      searchQuery === '' ||
      player.userNick.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.gameNick.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = selectedPosition === null || player.positionIdx === selectedPosition;
    const matchesTier = selectedTier === null || player.highTier.includes(selectedTier);

    return matchesTab && matchesSearch && matchesPosition && matchesTier;
  });

  return (
    <section>
      <h2 className="text-foreground mb-6 text-2xl font-bold">선수 리스트</h2>
      <div className="bg-card border-card-border rounded-xl border p-6 shadow-sm backdrop-blur-sm">
        {/* Tabs */}
        <Tabs defaultKey={'list'}>
          <TabsList className="border-border border-b">
            <TabsListActive className="from-primary bg-gradient-to-r to-purple-500" type="underline" />
            <TabsTrigger tabKey={'list'} className={`px-4 pb-3 font-semibold`}>
              전체 리스트
            </TabsTrigger>
            <TabsTrigger tabKey={'favorites'} className={`flex items-center gap-1 px-4 pb-3 font-semibold`}>
              즐겨찾기
            </TabsTrigger>
          </TabsList>
          <Spacing size={16} />
        </Tabs>
        {/* Search and Filter */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <SearchBar
              className="text-muted-foreground focus-within:text-foreground border-border"
              value={searchQuery}
              onChange={query => setSearchQuery(query)}
              placeholder="선수 이름 또는 게임 닉네임 검색..."
            />
          </div>
          {/*<button*/}
          {/*  onClick={() => setIsFilterOpen(!isFilterOpen)}*/}
          {/*  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all ${*/}
          {/*    isFilterOpen || selectedPosition || selectedTier*/}
          {/*      ? 'bg-primary text-white'*/}
          {/*      : 'bg-muted border-border text-foreground hover:bg-muted-foreground/20 border'*/}
          {/*  }`}*/}
          {/*>*/}
          {/*  <Filter className="h-5 w-5" />*/}
          {/*  필터*/}
          {/*  {(selectedPosition || selectedTier) && <span className="h-2 w-2 rounded-full bg-yellow-400" />}*/}
          {/*</button>*/}
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-muted border-border mb-6 space-y-4 rounded-lg border p-4">
            <div>
              <label className="text-foreground mb-2 block text-sm font-semibold">포지션</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map(pos => {
                  const Icon = positionIcons[pos as keyof typeof positionIcons];
                  const colors = positionClasses[pos as keyof typeof positionClasses];
                  return (
                    <button
                      key={pos}
                      onClick={() => setSelectedPosition(selectedPosition === pos ? null : pos)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                        selectedPosition === pos
                          ? `${colors.bgLight} ${colors.text}`
                          : 'bg-card text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {positionMap[pos]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-foreground mb-2 block text-sm font-semibold">티어</label>
              <div className="flex flex-wrap gap-2">
                {tiers.map(tier => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
                    className={`rounded-lg px-3 py-2 transition-all ${
                      selectedTier === tier
                        ? 'from-primary bg-gradient-to-r to-purple-600 text-white'
                        : 'bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {(selectedPosition || selectedTier) && (
              <button
                onClick={() => {
                  setSelectedPosition(null);
                  setSelectedTier(null);
                }}
                className="text-primary hover:text-primary/80 text-sm transition-colors"
              >
                필터 초기화
              </button>
            )}
          </div>
        )}

        {/* Player List */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => {
              const Icon = positionIcons[player.positionIdx as keyof typeof positionIcons];
              const colors = positionClasses[player.positionIdx as keyof typeof positionClasses];
              const isFavorite = favorites.includes(player.memberIdx);

              return (
                <div
                  key={player.memberIdx}
                  className="bg-muted border-border hover:border-primary/50 group rounded-lg border p-4 transition-all"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-lg p-2 ${colors.bgLight} ${colors.text}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-foreground truncate font-semibold">{player.userNick}</h3>
                        <p className="text-muted-foreground truncate text-xs">{player.gameNick}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleFavorite(player.memberIdx)}
                      className={`transition-all ${
                        isFavorite ? 'text-yellow-400' : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      <Star className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">티어</span>
                      <span className={`text-sm font-semibold ${colors.text}`}>{player.highTier}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">매칭 포인트</span>
                      <span className="text-position-adc text-sm font-semibold">{player.bjmatchPoint}P</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">좋아요</span>
                      <span className="text-sm text-pink-500">{player.likeCnt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">경기 수</span>
                      <span className="text-foreground text-sm">{player.matchCnt}</span>
                    </div>
                  </div>

                  <div className="border-border mt-3 flex gap-2 border-t pt-3">
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
            <div className="text-muted-foreground col-span-full py-12 text-center">
              {activeTab === 'favorites' && favorites.length === 0
                ? '즐겨찾기한 선수가 없습니다.'
                : '검색 결과가 없습니다.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
