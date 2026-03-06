import { PlayerTab } from '@/src/page/teamMatch/ui/PlayerTab/PlayerTab';
import { TeamMatch } from '@/src/page/teamMatch/ui/TeamMatch/TeamMatch';
import { teamMatchService } from '@/src/page/teamMatch/usecase/TeamMatchService';

async function TeamMatchPage() {
  const { players, positionCountMap } = await teamMatchService.getPlayers();

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
          {/*<button*/}
          {/*  onClick={() => setIsDark(!isDark)}*/}
          {/*  className="bg-card border-card-border hover:bg-muted rounded-lg border p-3 transition-colors"*/}
          {/*>*/}
          {/*  {isDark ? <Sun className="text-foreground h-5 w-5" /> : <Moon className="text-foreground h-5 w-5" />}*/}
          {/*</button>*/}
        </header>
        <TeamMatch players={players} />
        <PlayerTab players={players} positionCountMap={positionCountMap} />
      </div>
    </div>
  );
}

export default TeamMatchPage;
