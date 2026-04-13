'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { getAllUsers, updateUserStatus, updateUserProfile } from '@/lib/admin-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Ban, CheckCircle, AlertCircle, MoreHorizontal, Edit, CalendarDays, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistance } from 'date-fns';
import Link from 'next/link';

export function UsersTable() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'banned' | 'suspended'>('all');
  const [loading, setLoading] = useState(true);

  // Edit User Dialog State
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editRole, setEditRole] = useState<'user' | 'admin'>('user');
  const [editStatus, setEditStatus] = useState<'active' | 'banned' | 'suspended'>('active');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, statusFilter]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const openEditDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setEditDisplayName(user.displayName || '');
    setEditRole(user.role || 'user');
    setEditStatus(user.status || 'active');
    setEditUserDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    setIsUpdating(true);
    try {
      await updateUserProfile(selectedUser.id, {
        displayName: editDisplayName,
        role: editRole,
        status: editStatus,
      });
      toast.success('User updated successfully');
      setEditUserDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update user');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'banned':
        return <Ban className="text-red-500" size={20} />;
      case 'suspended':
        return <AlertCircle className="text-orange-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">User Management</h2>
        <p className="text-muted-foreground">Manage user accounts, roles, and tasks</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="animate-spin w-5 h-5" />
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-sm">User Details</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Role</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Joined</th>
                  <th className="text-right px-6 py-3 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{user.displayName || 'No Name'}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.status)}
                        <span className="capitalize text-sm font-medium">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Stats */}
      <Card className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Active</p>
            <p className="text-2xl font-bold text-green-500">
              {users.filter((u) => u.status === 'active').length}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Restricted</p>
            <p className="text-2xl font-bold text-red-500">
              {users.filter((u) => u.status !== 'active').length}
            </p>
          </div>
        </div>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
            <DialogDescription>
              Update role, status, and details for {selectedUser?.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input
                value={editDisplayName}
                onChange={(e) => setEditDisplayName(e.target.value)}
                placeholder="User's display name"
              />
            </div>
            <div className="space-y-2">
              <Label>System Role</Label>
              <Select value={editRole} onValueChange={(val: 'user' | 'admin') => setEditRole(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account Status</Label>
              <Select
                value={editStatus}
                onValueChange={(val: 'active' | 'banned' | 'suspended') => setEditStatus(val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditUserDialogOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} disabled={isUpdating}>
              {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
