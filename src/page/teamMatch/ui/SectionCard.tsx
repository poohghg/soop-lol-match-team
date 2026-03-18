import { Spacing } from '@/src/shared/uiKit';

export const SectionCard = ({ header, children }: { header: React.ReactNode; children: React.ReactNode }) => {
  return (
    <section className="bg-card border-card-border @container w-full rounded-xl border p-2 shadow-sm backdrop-blur-sm">
      {header}
      <Spacing size={16} />
      {children}
    </section>
  );
};
