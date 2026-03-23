'use client';

import { Player, PlayerCard, PlayerView } from '@/src/entities/player';
import { PositionIdx } from '@/src/entities/player/model/type';
import { usePositionFilter, useSearchPlayer } from '@/src/features/player';
import { Dialog, SearchBar, SeeMoreList, SwitchCase } from '@/src/shared/uiKit';
import { X } from 'lucide-react';

interface AddPlayerModalProps {
  isOpen: boolean;
  unMount: () => void;
  players: Player[];
  positionIdx: PositionIdx;
  query: string;
  onSelectPlayer: (player: Player) => void;
  onClose: () => void;
}

export function AddPlayerModal({
  isOpen,
  unMount,
  players,
  positionIdx,
  query,
  onSelectPlayer,
  onClose,
}: AddPlayerModalProps) {
  const { searchedPlayer, searchQuery, setQuery } = useSearchPlayer(players, query);
  const { filteredPlayers } = usePositionFilter(searchedPlayer, positionIdx);

  return (
    <Dialog isOpen={isOpen} unMount={unMount} onClose={onClose}>
      <div className="bg-card border-card-border w- flex h-[80vh] w-[80vw] flex-col rounded-xl border shadow-2xl">
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
        <div className={'px-4 py-2'}>
          <SearchBar
            className="text-muted-foreground focus-within:text-foreground border-border"
            value={searchQuery}
            onChange={query => setQuery(query)}
            placeholder="선수 이름 또는 게임 닉네임 검색..."
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
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
              defaultComponent={() => (
                <SeeMoreList data={filteredPlayers} isInfiniteScroll>
                  {items =>
                    items.map(player => (
                      <div key={player.memberIdx} onClick={() => onSelectPlayer(player)}>
                        <PlayerCard player={player} />
                      </div>
                    ))
                  }
                </SeeMoreList>
              )}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
