import Link from 'next/link';
import { Bell, Package, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const userNotifications = [
    { icon: Package, text: "Pesanan #3207 Anda telah dikirim.", time: "1 jam yang lalu", href: "/dashboard/purchases" },
    { icon: MessageSquare, text: "Antoine Leduc membalas pesan Anda.", time: "3 jam yang lalu", href: "/dashboard/messages" },
    { icon: Package, text: "Pesanan baru #3210 telah masuk.", time: "1 hari yang lalu", href: "/dashboard/orders" },
];

export function NotificationBell() {
  return (
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
}
