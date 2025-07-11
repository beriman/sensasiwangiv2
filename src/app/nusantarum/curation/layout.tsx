// src/app/nusantarum/curation/layout.tsx
import { AppHeader } from '@/components/header';

export default function CurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
