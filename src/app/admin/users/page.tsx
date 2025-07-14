// src/app/admin/users/page.tsx
'use client';

import { useState, useMemo } from 'react';
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
import { profiles as initialProfiles, type Profile, type ModeratorRole } from '@/data/profiles';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Shield, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ManageRolesDialog } from '@/components/admin/manage-roles-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const roleColors: Record<ModeratorRole, string> = {
    Admin: 'bg-destructive text-destructive-foreground',
    Marketplace: 'bg-blue-100 text-blue-800',
    School: 'bg-green-100 text-green-800',
    Forum: 'bg-purple-100 text-purple-800',
    Curation: 'bg-yellow-100 text-yellow-800',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>(initialProfiles);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleManageRolesClick = (user: Profile) => {
    setSelectedUser(user);
    setIsManageRolesOpen(true);
  }

  const handleSaveRoles = (userId: string, newRoles: ModeratorRole[]) => {
    setUsers(currentUsers => currentUsers.map(u => 
        u.slug === userId ? { ...u, moderatorRoles: newRoles } : u
    ));
    toast({
        title: 'Peran Diperbarui',
        description: `Peran untuk ${selectedUser?.name} telah berhasil diperbarui.`,
    })
    setIsManageRolesOpen(false);
  }


  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Customers & Users</CardTitle>
        <CardDescription>
          Manage your users and their roles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by name or email..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.profilePicture || 'https://placehold.co/40x40.png'}
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
                    <div className="flex items-center flex-wrap gap-2">
                        <Badge variant="secondary">{user.type}</Badge>
                        {user.moderatorRoles?.map(role => (
                            <Badge key={role} className={cn(roleColors[role])}>
                                {role}
                            </Badge>
                        ))}
                    </div>
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
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleManageRolesClick(user)}>
                        <Shield className="mr-2 h-4 w-4" />
                        Manage Roles
                      </DropdownMenuItem>
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
         {filteredUsers.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                No users found matching your search.
            </div>
          )}
      </CardContent>
    </Card>

    <ManageRolesDialog 
        isOpen={isManageRolesOpen}
        onOpenChange={setIsManageRolesOpen}
        user={selectedUser}
        onSave={handleSaveRoles}
    />
    </>
  );
}
