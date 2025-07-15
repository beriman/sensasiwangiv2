
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Bell, Package, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Cart } from '@/components/cart';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import AuthComponent from './auth';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const navLinks = [
  { href: '/browse', label: 'Marketplace' },
  { href: '/school', label: 'School' },
  { href: '/community', label: 'Community' },
  { href: '/nusantarum', label: 'Nusantarum' },
];

const userNotifications = [
    { icon: Package, text: "Pesanan #3207 Anda telah dikirim.", time: "1 jam yang lalu", href: "/dashboard/purchases" },
    { icon: MessageSquare, text: "Antoine Leduc membalas pesan Anda.", time: "3 jam yang lalu", href: "/dashboard/messages" },
    { icon: Package, text: "Pesanan baru #3210 telah masuk.", time: "1 hari yang lalu", href: "/dashboard/orders" },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const UserMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
            <Avatar>
                <AvatarImage src={session?.user?.user_metadata?.avatar_url} alt={session?.user?.email} />
                <AvatarFallback>{session?.user?.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/my-products">
                Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${session?.user?.id}`}>
                Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );

  const NotificationBell = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
             <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
             </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userNotifications.map((notification, index) => {
                const Icon = notification.icon;
                return (
                    <DropdownMenuItem key={index} asChild>
                        <Link href={notification.href} className="flex items-start gap-3 py-2">
                            <Icon className="h-5 w-5 text-muted-foreground mt-1" />
                            <div className="flex flex-col">
                               <p className="text-sm font-medium leading-snug whitespace-normal">{notification.text}</p>
                               <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                );
            })}
             <DropdownMenuSeparator />
             <DropdownMenuItem asChild>
                <Link href="/dashboard/notifications" className="justify-center text-sm text-accent hover:text-accent focus:text-accent">
                    Lihat Semua Notifikasi
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
             </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/60 bg-background/80 shadow-neumorphic backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground/80">
          <span>sensasiwangi.id</span>
          <Badge variant="outline" className="border-accent text-xs font-bold text-accent">BETA</Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base font-medium text-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
            {session ? (
              <>
                <NotificationBell />
                <UserMenu />
              </>
            ) : (
              <AuthComponent />
            )}
            <Cart />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Cart />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex h-full flex-col p-6">
                <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground/80">
                  <span>sensasiwangi.id</span>
                  <Badge variant="outline" className="border-accent text-xs font-bold text-accent">BETA</Badge>
                </Link>
                <div className="flex flex-1 flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="rounded-lg p-3 text-lg font-medium text-foreground/80 transition-colors hover:bg-accent/50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                {session ? (
                  <div className="mt-auto">
                    <UserMenu />
                  </div>
                ) : (
                  <AuthComponent />
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
