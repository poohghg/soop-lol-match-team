import { TabsList, TabsListActive, TabsTrigger } from '@/src/shared/uiKit';

export const PlayTabsList = () => {
  return (
    <TabsList className="border-border border-b">
      <TabsListActive className="from-primary bg-gradient-to-r to-purple-500" type="underline" />
      <TabsTrigger tabKey={'list'} className={`px-4 pb-3 font-semibold`}>
        전체 리스트
      </TabsTrigger>
      <TabsTrigger tabKey={'favorites'} className={`flex items-center gap-1 px-4 pb-3 font-semibold`}>
        즐겨찾기
      </TabsTrigger>
    </TabsList>
  );
};
