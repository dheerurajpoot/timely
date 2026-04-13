'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  timetableId: string;
  timetableType: 'daily' | 'weekly' | 'monthly';
  onShare: (email: string, role: 'viewer' | 'editor') => Promise<void>;
}

export function ShareDialog({
  isOpen,
  onClose,
  timetableId,
  timetableType,
  onShare,
}: ShareDialogProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'viewer' | 'editor'>('editor');
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard/shared/${timetableType}/${timetableId}`;

  const handleShare = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email');
      return;
    }

    setSharing(true);
    try {
      await onShare(email, role);
      toast.success(`Shared with ${email}`);
      setEmail('');
      setRole('editor');
    } catch (error) {
      toast.error('Failed to share');
    } finally {
      setSharing(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Timetable</DialogTitle>
          <DialogDescription>
            Invite others to collaborate on this {timetableType} timetable
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Share Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={copyLink}
                className="px-3"
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this link can access the timetable
            </p>
          </div>

          {/* Invite via Email */}
          <div className="border-t border-border pt-4">
            <label className="text-sm font-medium block mb-2">Invite People</label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sharing}
                  type="email"
                />
                <Select value={role} onValueChange={(v) => setRole(v as 'viewer' | 'editor')}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">View</SelectItem>
                    <SelectItem value="editor">Edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={handleShare}
                disabled={sharing || !email.trim()}
              >
                {sharing ? 'Sending...' : 'Send Invite'}
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted/50 p-3 rounded-lg text-xs text-muted-foreground">
            <p className="font-medium mb-1">Permission Levels:</p>
            <ul className="space-y-1">
              <li><strong>View:</strong> Read-only access to the timetable</li>
              <li><strong>Edit:</strong> Can view and modify activities</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
