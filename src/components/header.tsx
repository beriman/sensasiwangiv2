'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Cart } from '@/components/cart';
import { Badge } from '@/components/ui/badge';
import AuthComponent from '@/components/auth';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import { UserMenu } from '@/components/header/user-menu';
import { NotificationBell } from '@/components/header/notification-bell';

const navLinks = [
  { href: '/browse', label: 'Marketplace' },
  { href: '/school', label: 'School' },
  { href: '/community', label: 'Community' },
  { href: '/nusantarum', label: 'Nusantarum' },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
                <UserMenu onLogout={handleLogout} />
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
                    <UserMenu onLogout={handleLogout} />
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