'use client';

import { useState, useEffect } from 'react';
import { ContactSubmission } from '@/lib/types';
import { getContactSubmissions, updateContactSubmission } from '@/lib/admin-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistance } from 'date-fns';

export function ContactManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContactSubmission['status']) => {
    try {
      await updateContactSubmission(id, { status: newStatus });
      toast.success('Status updated');
      fetchSubmissions();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleReply = async (id: string) => {
    if (!response.trim()) {
      toast.error('Please enter a response');
      return;
    }

    try {
      await updateContactSubmission(id, {
        response,
        status: 'replied',
        respondedBy: 'admin',
      });
      toast.success('Response sent');
      setResponse('');
      setSelectedId(null);
      fetchSubmissions();
    } catch (error) {
      console.error('Failed to send response:', error);
      toast.error('Failed to send response');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-500';
      case 'read':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'replied':
        return 'bg-green-500/10 text-green-500';
      case 'resolved':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Contact Submissions</h2>
        <p className="text-muted-foreground">Manage and respond to contact submissions</p>
      </div>

      {/* Stats */}
      <Card className="p-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Total</p>
            <p className="text-2xl font-bold">{submissions.length}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">New</p>
            <p className="text-2xl font-bold text-blue-500">
              {submissions.filter(s => s.status === 'new').length}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Read</p>
            <p className="text-2xl font-bold text-yellow-500">
              {submissions.filter(s => s.status === 'read').length}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Resolved</p>
            <p className="text-2xl font-bold text-green-500">
              {submissions.filter(s => s.status === 'resolved').length}
            </p>
          </div>
        </div>
      </Card>

      {/* Submissions */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center p-6 text-muted-foreground">Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center p-6 text-muted-foreground">
            No submissions yet
          </div>
        ) : (
          submissions.map(submission => (
            <Card key={submission.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={20} className="text-primary" />
                    <h3 className="text-lg font-semibold">{submission.subject}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>From:</strong> {submission.name} ({submission.email})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Submitted:</strong> {formatDistance(new Date(submission.createdAt), new Date(), { addSuffix: true })}
                  </p>
                </div>

                <Select
                  value={submission.status}
                  onValueChange={status => handleStatusChange(submission.id, status as any)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">{submission.message}</p>
              </div>

              {submission.response && (
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                  <p className="text-xs text-green-600 mb-2">Admin Response</p>
                  <p className="text-sm">{submission.response}</p>
                </div>
              )}

              {selectedId === submission.id ? (
                <div className="space-y-2 border-t border-border pt-4">
                  <label className="block text-sm font-medium">Your Response</label>
                  <Textarea
                    value={response}
                    onChange={e => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleReply(submission.id)}
                      className="gap-2"
                    >
                      <CheckCircle size={18} />
                      Send Response
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedId(null);
                        setResponse('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setSelectedId(submission.id)}
                  disabled={submission.status === 'resolved'}
                >
                  Reply
                </Button>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
