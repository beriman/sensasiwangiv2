// src/app/admin/layout.tsx
'use client';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import AdminLoginPage from './page';
import { Toaster } from '@/components/ui/toaster';
import { Skeleton } from '@/components/ui/skeleton';

function AdminDashboard({ children }: { children: React.ReactNode }) {
  const { user, logout, isAdmin, userRoles, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
  }

  if (!user) {
    return <AdminLoginPage />;
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar roles={isAdmin ? ['Admin'] : userRoles} />
      <div className="flex flex-col flex-1 sm:gap-4 sm:py-4 sm:pl-14">
        <AdminHeader onLogout={logout} user={user} />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <AdminDashboard>{children}</AdminDashboard>
        <Toaster />
    </AuthProvider>
  );
}
