'use client';

import { useState, useEffect } from 'react';
import { Announcement } from '@/lib/types';
import {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from '@/lib/admin-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';

export function AnnouncementsManager() {
  const { userProfile } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info' as const,
    visible: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAllAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (editingId) {
        await updateAnnouncement(editingId, {
          ...formData,
          updatedAt: Date.now(),
        });
        toast.success('Announcement updated');
      } else {
        if (!userProfile) {
          toast.error('User not authenticated');
          return;
        }
        await createAnnouncement({
          ...formData,
          createdBy: userProfile.id,
        });
        toast.success('Announcement created');
      }
      fetchAnnouncements();
      resetForm();
    } catch (error) {
      console.error('Failed to save announcement:', error);
      toast.error('Failed to save announcement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await deleteAnnouncement(id);
      toast.success('Announcement deleted');
      fetchAnnouncements();
    } catch (error) {
      console.error('Failed to delete announcement:', error);
      toast.error('Failed to delete announcement');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', type: 'info', visible: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type,
      visible: announcement.visible,
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'warning':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
      case 'success':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'error':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Announcements</h2>
          <p className="text-muted-foreground">Manage system announcements</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={20} />
          New Announcement
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {editingId ? 'Edit Announcement' : 'Create Announcement'}
            </h3>
            <button onClick={resetForm} className="p-2 hover:bg-muted rounded">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Announcement title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                value={formData.content}
                onChange={e =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Announcement content"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <Select
                  value={formData.type}
                  onValueChange={value =>
                    setFormData({ ...formData, type: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <Select
                  value={formData.visible ? 'visible' : 'hidden'}
                  onValueChange={value =>
                    setFormData({ ...formData, visible: value === 'visible' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visible">Visible</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center p-6 text-muted-foreground">Loading...</div>
        ) : announcements.length === 0 ? (
          <div className="text-center p-6 text-muted-foreground">
            No announcements yet
          </div>
        ) : (
          announcements.map(announcement => (
            <Card
              key={announcement.id}
              className={`p-6 border-l-4 ${getTypeColor(announcement.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        announcement.visible
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-muted'
                      }`}
                    >
                      {announcement.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground">
                    Type: {announcement.type.toUpperCase()}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(announcement)}
                  >
                    <Edit2 size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
