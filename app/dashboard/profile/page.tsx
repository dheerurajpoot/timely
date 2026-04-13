'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, Mail, KeyRound, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { userProfile, user } = useAuth();
  const [resetLoading, setResetLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!user?.email) {
      toast.error('No valid email found to reset password.');
      return;
    }
    
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(`Password reset link sent to ${user.email}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Failed to send password reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Profile Details</h1>
          <p className="text-muted-foreground">
            Manage your personal settings and password.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <UserCircle className="w-6 h-6 text-primary" />
              General Information
            </CardTitle>
            <CardDescription>
              Your current profile details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input value={userProfile?.displayName || user?.displayName || ''} readOnly className="bg-muted/50" />
              <p className="text-xs text-muted-foreground">This is how your name appears in the app.</p>
            </div>
            
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={userProfile?.email || user?.email || ''} readOnly className="pl-9 bg-muted/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <KeyRound className="w-6 h-6 text-primary" />
              Security
            </CardTitle>
            <CardDescription>
              Reset your password via an email link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below to receive an email with instructions on how to reset your password. The link will be sent to <strong>{user?.email}</strong>.
            </p>
            <Button onClick={handlePasswordReset} disabled={resetLoading} variant="secondary">
              {resetLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <KeyRound className="w-4 h-4 mr-2" />}
              Send Password Reset Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
