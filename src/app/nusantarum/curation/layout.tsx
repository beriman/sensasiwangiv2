// src/app/nusantarum/curation/layout.tsx
'use client';

import { useState } from 'react';
import CurationLoginPage from './page';
import { AppHeader } from '@/components/header';

export default function CurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  if (!isLoggedIn) {
    return <CurationLoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
