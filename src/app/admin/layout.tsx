// src/app/admin/layout.tsx
'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import AdminLoginPage from './page';
import type { ModeratorRole, Profile } from '@/lib/types';
import { profiles } from '@/data/profiles';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = useState<Profile | null>(null);

  const handleLogin = (user: Profile) => {
    setLoggedInUser(user);
  };
  
  const handleLogout = () => {
    setLoggedInUser(null);
  }

  if (!loggedInUser) {
    return <AdminLoginPage onLogin={handleLogin} />;
  }

  const userRoles = loggedInUser.moderatorRoles || [];
  const isAdmin = userRoles.includes('Admin');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar roles={isAdmin ? ['Admin'] : userRoles} />
      <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-14">
        <AdminHeader onLogout={handleLogout} user={loggedInUser}/>
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
