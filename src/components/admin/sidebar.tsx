// src/components/admin/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Home, Package, ShoppingCart, Users, LineChart, Settings, Flame, MessageSquareWarning, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ModeratorRole } from '@/lib/types';

const allNavLinks = [
    { href: '/admin/dashboard', icon: Home, label: 'Dashboard', roles: ['Admin'] },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders', roles: ['Admin', 'Marketplace'] },
    { href: '/admin/products', icon: Package, label: 'Products', roles: ['Admin', 'Marketplace'] },
    { href: '/admin/users', icon: Users, label: 'Users', roles: ['Admin'] },
    { href: '/admin/analytics', icon: LineChart, label: 'Analytics', roles: ['Admin'] },
    { href: '/admin/feedback', icon: MessageSquareWarning, label: 'Feedback', roles: ['Admin', 'Forum'] },
    { href: '/admin/curation', icon: BadgeCheck, label: 'Curation', roles: ['Admin', 'Curation'] }
];

interface AdminSidebarProps {
    roles: ModeratorRole[];
}

export function AdminSidebar({ roles }: AdminSidebarProps) {
    const pathname = usePathname();

    const availableLinks = allNavLinks.filter(link => 
        roles.includes('Admin') || link.roles.some(role => roles.includes(role))
    );

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
                href="/"
                className="group mb-4 flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <Flame className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Sensasi Wangi</span>
            </Link>
            {availableLinks.map((link) => (
                <Tooltip key={link.href}>
                    <TooltipTrigger asChild>
                    <Link
                        href={link.href}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                            pathname.startsWith(link.href) && "bg-accent text-accent-foreground"
                        )}
                    >
                        <link.icon className="h-5 w-5" />
                        <span className="sr-only">{link.label}</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{link.label}</TooltipContent>
                </Tooltip>
            ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/admin/settings"
                    className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                        pathname.startsWith('/admin/settings') && "bg-accent text-accent-foreground"
                    )}
                >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            </nav>
        </TooltipProvider>
        </aside>
    );
}
