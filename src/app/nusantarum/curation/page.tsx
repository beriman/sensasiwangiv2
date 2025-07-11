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
  } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, ArrowUpDown, BadgeCheck } from 'lucide-react';
import { curationApplications } from '@/data/curation-applications';
import { cn } from '@/lib/utils';

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

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'destructive';
            case 'Pending Sample Review': return 'bg-blue-100 text-blue-800';
            case 'Pending AI Review': return 'secondary';
            default: return 'outline';
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 5) return 'text-yellow-600';
        return 'text-red-600';
    }

    if (!isLoggedIn) {
        return <CurationLoginPage onLogin={() => setIsLoggedIn(true)} />;
    }

  return (
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
              <TableHead className="text-center">AI Score</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {curationApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.applicantName}</TableCell>
                <TableCell>{new Date(app.dateApplied).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={cn(getStatusVariant(app.status))}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className={cn("text-center font-bold", getScoreColor(app.aiScore))}>
                    {app.aiScore}/10
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
                      <DropdownMenuItem>View Application</DropdownMenuItem>
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuItem>Request Info</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
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
  );
}
