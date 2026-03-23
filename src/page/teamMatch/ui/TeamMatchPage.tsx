import { PageContent } from '@/src/page/teamMatch/ui/PageContent';
import { PageHeader } from '@/src/page/teamMatch/ui/PageHeader';
import { teamMatchService } from '@/src/page/teamMatch/usecase/TeamMatchService';

const TeamMatchPage = async () => {
  const { players } = await teamMatchService.getPlayers();

  return (
    <div className="from-background via-background to-muted min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <PageHeader />
        <PageContent players={players} />
      </div>
    </div>
  );
};

export default TeamMatchPage;
