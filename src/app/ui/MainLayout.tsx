import { Spacing } from '@/src/shared/uiKit';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-[calc(100vh-var(--spacing-main-header))] w-full flex-col items-center">
        {children}
        <Spacing className={`safe-bottom`} size={20} />
      </main>
    </>
  );
};
