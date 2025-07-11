// src/app/dashboard/layout.tsx
import { AppHeader } from '@/components/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { profiles } from '@/data/profiles';

// In a real app, this would come from an authentication context
const currentUser = profiles.find(p => p.slug === 'alex-doe');

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <aside className="md:col-span-1 lg:col-span-1">
             <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic p-4 text-center">
                 <Avatar className="h-24 w-24 mx-auto shadow-neumorphic-inset">
                    <AvatarImage src={currentUser?.profilePicture} alt={currentUser?.name} />
                    <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardHeader className="p-2 pb-0">
                    <CardTitle className="text-xl">{currentUser?.name}</CardTitle>
                    <CardDescription>{currentUser?.username}</CardDescription>
                </CardHeader>
             </Card>
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
