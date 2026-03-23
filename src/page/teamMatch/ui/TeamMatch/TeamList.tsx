import { Player } from '@/src/entities/player';
import { useTeamStore } from '@/src/features/player';
import { AddPlayerModal } from '@/src/page/teamMatch/ui/TeamMatch/AddPlayerModal';
import { SkeletonTeamCard, TeamCard } from '@/src/page/teamMatch/ui/TeamMatch/TeamCard';
import { TeamSlotCard } from '@/src/page/teamMatch/ui/TeamMatch/TeamSlotCard';
import dynamic from 'next/dynamic';
import { overlay } from 'overlay-kit';

interface TeamListProps {
  players: Player[];
}

const LazyAddPlayerModal = dynamic(() => Promise.resolve(AddPlayerModal), {
  ssr: false,
});

export const TeamList = ({ players }: TeamListProps) => {
  const { teams, removeTeam, changeTeamTitle, addPlayerToTeam, removePlayerFromTeam } = useTeamStore();
  return (
    <div className={`flex flex-col gap-6 pb-4`}>
      {teams.map((team, teamIndex) => (
        <TeamCard
          key={teamIndex}
          teamIndex={teamIndex}
          team={team}
          isRemovable={teams.length > 1}
          onTeamTitleChange={changeTeamTitle}
          onRemoveTeam={removeTeam}
          teamSlot={slot => (
            <TeamSlotCard
              key={slot.positionIdx}
              slot={slot}
              teamIndex={teamIndex}
              onOpenModal={() =>
                overlay.open(({ isOpen, close, unmount }) => (
                  <LazyAddPlayerModal
                    isOpen={isOpen}
                    unMount={unmount}
                    players={players}
                    positionIdx={slot.positionIdx}
                    onSelectPlayer={player => {
                      addPlayerToTeam(teamIndex, slot.positionIdx, player);
                      close();
                    }}
                    onClose={() => close()}
                    query={slot.player?.userNick || ''}
                  />
                ))
              }
              onRemovePlayer={() => removePlayerFromTeam(teamIndex, slot.positionIdx)}
            />
          )}
        />
      ))}
    </div>
  );
};

export const LazyTeamList = dynamic(() => Promise.resolve(TeamList), {
  ssr: false,
  loading: () => (
    <div className={`flex flex-col gap-6 pb-4`}>
      {[1, 2].map(v => (
        <SkeletonTeamCard key={v} />
      ))}
    </div>
  ),
});
