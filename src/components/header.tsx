
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Marketplace' },
  { href: '#', label: 'Community' },
  { href: '#', label: 'School' },
  { href: '#', label: 'Database' },
  { href: '/profile', label: 'Profile' },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/60 bg-background/80 shadow-neumorphic backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-foreground/80">
          sensasiwangi.id
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base font-medium text-foreground/70 transition-colors hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
            <Button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="rounded-xl px-6 shadow-neumorphic transition-all hover:shadow-neumorphic-active"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex h-full flex-col p-6">
                <Link href="/" className="mb-8 text-2xl font-bold tracking-tight text-foreground/80">
                  sensasiwangi.id
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
                <Button 
                    onClick={() => {
                        setIsLoggedIn(!isLoggedIn);
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-xl py-6 text-lg shadow-neumorphic"
                    >
                    {isLoggedIn ? 'Logout' : 'Login'}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
