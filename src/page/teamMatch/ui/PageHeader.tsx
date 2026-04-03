'use client';

import { LazyThemeButton } from '@/src/shared/libs/theme/ThemeButton';
import { openAlertDialog } from '@/src/shared/uiKit/ui/AlertDialog/AlertDialog';

export const PageHeader = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1
          onClick={async () => {
            const res = await openAlertDialog({
              title: '팀 매칭 시스템',
            });
            console.log('AlertDialog Result:', res);
          }}
          className="from-primary bg-gradient-to-r to-purple-500 bg-clip-text text-4xl font-bold text-transparent"
        >
          팀 매칭 시스템
        </h1>
        <p className="text-muted-foreground mt-2">최고의 팀을 구성하세요</p>
      </div>
      <LazyThemeButton />
    </header>
  );
};
