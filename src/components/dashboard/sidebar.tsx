// src/components/dashboard/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, MessageSquare, Heart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/dashboard/my-products', icon: Package, label: 'My Products' },
    { href: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/dashboard/wishlist', icon: Heart, label: 'Wishlist' },
    { href: '/dashboard/settings', icon: Settings, label: 'Account Settings' },
];

export function DashboardSidebar() {
    const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 rounded-2xl border-none bg-transparent p-2 shadow-neumorphic">
        {navLinks.map((link) => (
            <Link
                key={link.label}
                href={link.href}
                className={cn(
                    "flex items-center gap-3 rounded-xl p-3 text-lg font-medium text-foreground/70 transition-colors hover:bg-muted/50",
                    pathname === link.href && "bg-accent/20 text-accent-foreground"
                )}
            >
                <link.icon className="h-6 w-6" />
                <span>{link.label}</span>
            </Link>
        ))}
    </nav>
  );
}
