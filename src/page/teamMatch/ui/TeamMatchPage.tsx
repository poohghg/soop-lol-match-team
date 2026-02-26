'use client';

import { AddPlayerModal } from '@/src/page/teamMatch/ui/AddPlayerModal';
import { PlayerListSection } from '@/src/page/teamMatch/ui/PlayerListSection';
import { TeamMatch } from '@/src/page/teamMatch/ui/TeamMatch';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Player {
  memberIdx: number;
  userId: string;
  userNick: string;
  gameNick: string;
  totalGameNickList: string[];
  positionIdx: number;
  grade: number;
  highTier: string;
  bjmatchPoint: number;
  bjmatchPointOrigin: number;
  broading: string;
  recruitFlag: string;
  likeCnt: number;
  likeYn: string;
  matchCnt: number;
  regDate: string;
  memo: string;
}

export interface TeamSlot {
  position: string;
  positionIdx: number;
  player: Player | null;
}

function TeamMatchPage() {
  const [isDark, setIsDark] = useState(true);
  const [teams, setTeams] = useState<TeamSlot[][]>([
    [
      { position: '탑', positionIdx: 1, player: null },
      { position: '정글', positionIdx: 2, player: null },
      { position: '미드', positionIdx: 3, player: null },
      { position: '원딜', positionIdx: 4, player: null },
      { position: '서폿', positionIdx: 5, player: null },
    ],
  ]);

  const [favorites, setFavorites] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  // Mock player data
  const [players] = useState<Player[]>([
    {
      memberIdx: 7696,
      userId: 'qkrdnxozz',
      userNick: '우태',
      gameNick: 'dnxo#KR1',
      totalGameNickList: ['dnxo#KR1', 'dnxo#KR2'],
      positionIdx: 1,
      grade: 1,
      highTier: '마스터 1800',
      bjmatchPoint: 67,
      bjmatchPointOrigin: 67,
      broading: 'Y',
      recruitFlag: 'Y',
      likeCnt: 33,
      likeYn: 'N',
      matchCnt: 0,
      regDate: '2026-02-25T18:08:59',
      memo: '',
    },
    {
      memberIdx: 7697,
      userId: 'jungle123',
      userNick: '정글러',
      gameNick: 'JungleKing#KR1',
      totalGameNickList: ['JungleKing#KR1'],
      positionIdx: 2,
      grade: 2,
      highTier: '다이아 2100',
      bjmatchPoint: 85,
      bjmatchPointOrigin: 85,
      broading: 'N',
      recruitFlag: 'Y',
      likeCnt: 45,
      likeYn: 'N',
      matchCnt: 12,
      regDate: '2026-02-24T15:30:00',
      memo: '',
    },
    {
      memberIdx: 7698,
      userId: 'mid456',
      userNick: '미드신',
      gameNick: 'MidGod#KR1',
      totalGameNickList: ['MidGod#KR1', 'MidGod#KR2'],
      positionIdx: 3,
      grade: 1,
      highTier: '챌린저 2500',
      bjmatchPoint: 95,
      bjmatchPointOrigin: 95,
      broading: 'Y',
      recruitFlag: 'Y',
      likeCnt: 120,
      likeYn: 'N',
      matchCnt: 28,
      regDate: '2026-02-23T10:15:00',
      memo: '',
    },
    {
      memberIdx: 7699,
      userId: 'adc789',
      userNick: '원딜장인',
      gameNick: 'ADCPro#KR1',
      totalGameNickList: ['ADCPro#KR1'],
      positionIdx: 4,
      grade: 2,
      highTier: '그마 1900',
      bjmatchPoint: 72,
      bjmatchPointOrigin: 72,
      broading: 'Y',
      recruitFlag: 'N',
      likeCnt: 58,
      likeYn: 'N',
      matchCnt: 15,
      regDate: '2026-02-22T14:20:00',
      memo: '',
    },
    {
      memberIdx: 7700,
      userId: 'support999',
      userNick: '서폿마스터',
      gameNick: 'SupMaster#KR1',
      totalGameNickList: ['SupMaster#KR1', 'SupMaster#KR2'],
      positionIdx: 5,
      grade: 1,
      highTier: '마스터 2000',
      bjmatchPoint: 88,
      bjmatchPointOrigin: 88,
      broading: 'N',
      recruitFlag: 'Y',
      likeCnt: 67,
      likeYn: 'N',
      matchCnt: 22,
      regDate: '2026-02-21T09:45:00',
      memo: '',
    },
    {
      memberIdx: 7701,
      userId: 'top111',
      userNick: '탑솔러',
      gameNick: 'TopLane#KR1',
      totalGameNickList: ['TopLane#KR1'],
      positionIdx: 1,
      grade: 2,
      highTier: '다이아 1700',
      bjmatchPoint: 65,
      bjmatchPointOrigin: 65,
      broading: 'N',
      recruitFlag: 'Y',
      likeCnt: 28,
      likeYn: 'N',
      matchCnt: 8,
      regDate: '2026-02-20T16:30:00',
      memo: '',
    },
  ]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleAddTeam = () => {
    setTeams([
      ...teams,
      [
        { position: '탑', positionIdx: 1, player: null },
        { position: '정글', positionIdx: 2, player: null },
        { position: '미드', positionIdx: 3, player: null },
        { position: '원딜', positionIdx: 4, player: null },
        { position: '서폿', positionIdx: 5, player: null },
      ],
    ]);
  };

  const handleRemoveTeam = (teamIndex: number) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, index) => index !== teamIndex));
    }
  };

  const handleOpenModal = (teamIndex: number, positionIdx: number) => {
    setSelectedTeamIndex(teamIndex);
    setSelectedPosition(positionIdx);
    setIsModalOpen(true);
  };

  const handleSelectPlayer = (player: Player) => {
    if (selectedTeamIndex !== null && selectedPosition !== null) {
      const newTeams = [...teams];
      const slotIndex = newTeams[selectedTeamIndex].findIndex(slot => slot.positionIdx === selectedPosition);
      newTeams[selectedTeamIndex][slotIndex].player = player;
      setTeams(newTeams);
      setIsModalOpen(false);
      setSelectedTeamIndex(null);
      setSelectedPosition(null);
    }
  };

  const handleRemovePlayer = (teamIndex: number, positionIdx: number) => {
    const newTeams = [...teams];
    const slotIndex = newTeams[teamIndex].findIndex(slot => slot.positionIdx === positionIdx);
    newTeams[teamIndex][slotIndex].player = null;
    setTeams(newTeams);
  };

  const handleToggleFavorite = (memberIdx: number) => {
    setFavorites(prev => (prev.includes(memberIdx) ? prev.filter(id => id !== memberIdx) : [...prev, memberIdx]));
  };

  return (
    <div className="from-background via-background to-muted min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="from-primary bg-gradient-to-r to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
              팀 매칭 시스템
            </h1>
            <p className="text-muted-foreground mt-2">최고의 팀을 구성하세요</p>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="bg-card border-card-border hover:bg-muted rounded-lg border p-3 transition-colors"
          >
            {isDark ? <Sun className="text-foreground h-5 w-5" /> : <Moon className="text-foreground h-5 w-5" />}
          </button>
        </header>
        <TeamMatch
          teams={teams}
          onAddTeam={handleAddTeam}
          onRemoveTeam={handleRemoveTeam}
          onOpenModal={handleOpenModal}
          onRemovePlayer={handleRemovePlayer}
        />
        <PlayerListSection players={players} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        {isModalOpen && (
          <AddPlayerModal
            players={players}
            positionIdx={selectedPosition}
            onSelectPlayer={handleSelectPlayer}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTeamIndex(null);
              setSelectedPosition(null);
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
}

export default TeamMatchPage;
