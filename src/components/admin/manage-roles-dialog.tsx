// src/components/admin/manage-roles-dialog.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import type { Profile, ModeratorRole } from '@/lib/types';
import { Badge } from '../ui/badge';

const ALL_ROLES: ModeratorRole[] = ['Marketplace', 'School', 'Forum', 'Curation', 'Admin'];

interface ManageRolesDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: Profile | null;
  onSave: (userId: string, roles: ModeratorRole[]) => void;
}

export function ManageRolesDialog({ isOpen, onOpenChange, user, onSave }: ManageRolesDialogProps) {
  const [selectedRoles, setSelectedRoles] = useState<ModeratorRole[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedRoles(user.moderatorRoles || []);
    }
  }, [user]);

  const handleRoleChange = (role: ModeratorRole, checked: boolean) => {
    setSelectedRoles(prev => 
      checked ? [...prev, role] : prev.filter(r => r !== role)
    );
  };

  const handleSaveClick = () => {
    if (user) {
      setIsSaving(true);
      // Simulate API call
      setTimeout(() => {
        onSave(user.slug, selectedRoles);
        setIsSaving(false);
      }, 1000);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">Manage Roles for {user.name}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Assign or remove moderator roles. <Badge variant="destructive">Admin</Badge> role grants all permissions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            {ALL_ROLES.map(role => (
                <div key={role} className="flex items-center space-x-3 rounded-md border p-3">
                    <Checkbox
                        id={`role-${role}`}
                        checked={selectedRoles.includes(role)}
                        onCheckedChange={(checked) => handleRoleChange(role, !!checked)}
                    />
                    <Label htmlFor={`role-${role}`} className="text-base font-medium leading-none cursor-pointer">
                        {role}
                    </Label>
                </div>
            ))}
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" onClick={handleSaveClick} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
