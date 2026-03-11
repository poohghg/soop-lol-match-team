'use client';

import { Player, PlayerCard, PlayerView } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { usePositionFilter, useSearchPlayer } from '@/src/features/player';
import { Dimmed, Portal, SearchBar, SwitchCase } from '@/src/shared/uiKit';
import { X } from 'lucide-react';

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
        <div className="bg-card border-card-border flex h-9/12 w-4/5 max-w-4xl flex-col rounded-xl border shadow-2xl">
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
              <SwitchCase
                value={filteredPlayers.length}
                caseBy={{
                  0: () => (
                    <div className="text-muted-foreground col-span-full py-12 text-center">
                      <p className="text-lg font-medium">검색 결과가 없습니다.</p>
                    </div>
                  ),
                }}
                defaultComponent={() =>
                  filteredPlayers.map(player => (
                    <div key={player.memberIdx} onClick={() => onSelectPlayer(player)}>
                      <PlayerCard player={player} />
                    </div>
                  ))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
