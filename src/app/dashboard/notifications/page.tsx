// src/app/dashboard/notifications/page.tsx
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, MessageSquare, BadgeCheck } from 'lucide-react';

const allNotifications = [
    { icon: Package, text: "Pesanan #3207 Anda telah dikirim oleh penjual.", time: "1 jam yang lalu", href: "/dashboard/purchases", isRead: false },
    { icon: MessageSquare, text: "Antoine Leduc membalas pesan Anda.", time: "3 jam yang lalu", href: "/dashboard/messages", isRead: false },
    { icon: Package, text: "Pesanan baru #3210 telah masuk.", time: "1 hari yang lalu", href: "/dashboard/orders", isRead: false },
    { icon: BadgeCheck, text: "Selamat! Anda meraih lencana 'Trusted Reviewer I'.", time: "2 hari yang lalu", href: "/profile/alex-doe", isRead: true },
    { icon: MessageSquare, text: "Admin menanggapi laporan Anda di forum.", time: "3 hari yang lalu", href: "/community/thread/tech-2", isRead: true },
];


export default function NotificationsPage() {

  return (
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="text-xl font-bold text-foreground/80">Notifikasi</CardTitle>
            <CardDescription>Semua pembaruan Anda ada di sini.</CardDescription>
        </div>
        <Button variant="outline">Tandai semua telah dibaca</Button>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
            <ul className="-my-4 divide-y divide-border/50">
                {allNotifications.map((notification, index) => {
                    const Icon = notification.icon;
                    return (
                        <li key={index} className="relative py-4">
                             {!notification.isRead && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent"></span>
                            )}
                            <Link href={notification.href} className="flex items-start gap-4 pl-5">
                                <span className="flex-shrink-0 rounded-full bg-muted p-2">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground/90">{notification.text}</p>
                                    <p className="text-sm text-muted-foreground">{notification.time}</p>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
