import { PageContent } from '@/src/page/teamMatch/ui/PageContent';
import { PageHeader } from '@/src/page/teamMatch/ui/PageHeader';
import { teamMatchService } from '@/src/page/teamMatch/usecase/TeamMatchService';
import { ServerFetcher } from '@/src/shared/uiKit';

const TeamMatchPage = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <PageHeader />
        <ServerFetcher fetcher={teamMatchService.getPlayers}>
          {({ players }) => <PageContent players={players} />}
        </ServerFetcher>
      </div>
    </div>
  );
};

export default TeamMatchPage;
