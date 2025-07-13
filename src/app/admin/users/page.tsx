// src/app/admin/users/page.tsx
'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { profiles } from '@/data/profiles';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const mockUsers = [
    ...profiles.map(p => ({ 
        name: p.name, 
        email: `${p.slug}@email.com`,
        role: p.type,
        status: 'Active',
        avatar: p.profilePicture,
        isModerator: p.slug === 'alex-doe', // Alex Doe is now a moderator
    })),
    {
        name: 'John Doe',
        email: 'john.doe@email.com',
        role: 'Member',
        status: 'Active',
        avatar: 'https://placehold.co/40x40.png',
        isModerator: false,
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        role: 'Member',
        status: 'Suspended',
        avatar: 'https://placehold.co/40x40.png',
        isModerator: false,
    }
]

export default function AdminUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          Manage your customers and view their information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.avatar || 'https://placehold.co/40x40.png'}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{user.role}</span>
                        {user.isModerator && <Badge className="bg-blue-100 text-blue-800">Moderator</Badge>}
                    </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Suspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
