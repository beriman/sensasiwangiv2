// src/app/dashboard/layout.tsx
import { AppHeader } from '@/components/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { UserProfileCard } from '@/components/dashboard/user-profile-card';
import { useAuth } from '@/context/AuthContext'; // Assuming AuthContext is the source of truth

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>; // Or a skeleton loader
  }

  if (!user) {
    // Redirect to login or show an unauthorized message
    return <div className="min-h-screen flex items-center justify-center">Please log in to access the dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <aside className="md:col-span-1 lg:col-span-1">
            <UserProfileCard userId={user.slug} /> {/* Pass user slug from AuthContext */}
            <div className="mt-6">
                <DashboardSidebar />
            </div>
          </aside>
          <main className="md:col-span-3 lg:col-span-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

