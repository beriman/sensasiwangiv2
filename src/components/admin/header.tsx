// src/components/admin/header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Package2,
  Settings,
  User,
  LogOut,
  Bell
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/lib/types';

interface AdminHeaderProps {
    onLogout: () => void;
    user: Profile;
}

const notifications = [
    { title: "New order #3210 has been placed.", time: "5 min ago" },
    { title: "New Curation Application from 'Scent Solutions'.", time: "15 min ago" },
    { title: "User 'Jane Smith' submitted new feedback.", time: "20 min ago"},
    { title: "Product 'Boisé Mystique' needs approval.", time: "1 hour ago"},
]

export function AdminHeader({ onLogout, user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <div className="flex-1">
          <h1 className="text-xl font-semibold">Dashboard</h1>
       </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification, index) => (
                <DropdownMenuItem key={index} className="flex flex-col items-start gap-1">
                    <p className="text-sm font-medium leading-none whitespace-normal">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                </DropdownMenuItem>
            ))}
             <DropdownMenuSeparator />
             <DropdownMenuItem className="justify-center text-sm text-muted-foreground hover:text-foreground">
                View all notifications
             </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={user.profilePicture || "https://placehold.co/36x36.png"}
              width={36}
              height={36}
              alt={user.name}
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
