// src/app/nusantarum/curation/page.tsx
'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, ArrowUpDown, BadgeCheck } from 'lucide-react';
import { curationApplications as initialApplications, CurationApplication, CurationStatus } from '@/data/curation-applications';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

function CurationLoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (email && password) {
      onLogin();
    }
  };

  return (
      <div className="flex items-center justify-center pt-10">
        <Card className="mx-auto max-w-sm w-full shadow-neumorphic border-none bg-transparent">
          <CardHeader className="text-center">
            <div className="inline-block bg-background p-3 rounded-full shadow-neumorphic-inset mb-4 mx-auto w-fit">
              <BadgeCheck className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground/90">Curator Login</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access the Nusantarum Curation Panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="curator@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-6 h-12 rounded-xl bg-accent-gradient text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
              onClick={handleLoginClick}
              disabled={!email || !password}
            >
              Enter Panel
            </Button>
          </CardContent>
        </Card>
      </div>
  );
}


export default function CurationDashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [applications, setApplications] = useState<CurationApplication[]>(initialApplications);
    const [selectedApp, setSelectedApp] = useState<CurationApplication | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{ type: 'Approve' | 'Reject' | null }>({ type: null });
    const { toast } = useToast();

    // In a real app, this would come from the authenticated user's session
    const MOCK_CURATOR_NAME = "Curator A";

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'destructive';
            case 'Pending Sample Review': return 'bg-blue-100 text-blue-800';
            case 'More Info Required': return 'bg-yellow-100 text-yellow-800';
            case 'Pending AI Review': return 'secondary';
            default: return 'outline';
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 5) return 'text-yellow-600';
        return 'text-red-600';
    }
    
    const handleActionClick = (app: CurationApplication, actionType: 'View' | 'Approve' | 'Reject' | 'Request Info') => {
      setSelectedApp(app);
      if (actionType === 'View') {
        setIsViewDialogOpen(true);
      } else if (actionType === 'Approve' || actionType === 'Reject') {
        setConfirmAction({ type: actionType });
        setIsConfirmDialogOpen(true);
      } else if (actionType === 'Request Info') {
        updateApplicationStatus(app.id, 'More Info Required');
      }
    };

    const updateApplicationStatus = (appId: string, status: CurationStatus) => {
        setApplications(prev => prev.map(app => app.id === appId ? { ...app, status, lastUpdatedBy: MOCK_CURATOR_NAME } : app));
        toast({
            title: 'Status Updated',
            description: `Application from ${selectedApp?.applicantName} is now "${status}".`,
        });
    };

    const handleConfirm = () => {
        if (selectedApp && confirmAction.type) {
            updateApplicationStatus(selectedApp.id, confirmAction.type === 'Approve' ? 'Approved' : 'Rejected');
        }
        setIsConfirmDialogOpen(false);
        setSelectedApp(null);
        setConfirmAction({ type: null });
    };

    if (!isLoggedIn) {
        return <CurationLoginPage onLogin={() => setIsLoggedIn(true)} />;
    }

  return (
    <>
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle>Curation Applications</CardTitle>
        <CardDescription>
          Review and manage applications for Nusantarum verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Applicant
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated By</TableHead>
              <TableHead className="text-center">AI Score</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.applicantName}</TableCell>
                <TableCell>{new Date(app.dateApplied).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={cn(getStatusVariant(app.status))}>
                    {app.status}
                  </Badge>
                </TableCell>
                 <TableCell className="text-muted-foreground">{app.lastUpdatedBy || '-'}</TableCell>
                <TableCell className={cn("text-center font-bold", getScoreColor(app.aiScore))}>
                    {app.aiScore > 0 ? `${app.aiScore}/10` : 'N/A'}
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
                      <DropdownMenuItem onClick={() => handleActionClick(app, 'View')}>
                        View Application
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleActionClick(app, 'Approve')}>
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleActionClick(app, 'Request Info')}>
                        Request Info
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleActionClick(app, 'Reject')}>
                        Reject
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

    {/* View Application Dialog */}
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>Application: {selectedApp?.applicantName}</DialogTitle>
                <DialogDescription>
                    Full details for curator review.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                <h3 className="font-semibold">Applicant's Statement</h3>
                <p className="text-sm p-4 bg-muted rounded-md whitespace-pre-wrap">{selectedApp?.statement}</p>
                <h3 className="font-semibold">AI Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>AI Score</Label>
                        <p className={cn("font-bold text-2xl", getScoreColor(selectedApp?.aiScore ?? 0))}>
                            {selectedApp?.aiScore ?? 0}/10
                        </p>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>

    {/* Confirmation Dialog */}
    <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    You are about to change the status of the application from{' '}
                    <span className="font-bold">{selectedApp?.applicantName}</span> to{' '}
                    <span className="font-bold">{confirmAction.type}</span>. This action can be reversed, but please confirm.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm} className={confirmAction.type === 'Reject' ? buttonVariants({ variant: 'destructive'}) : ''}>
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
