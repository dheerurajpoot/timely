'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { getAllUsers, updateUserStatus, searchUsers } from '@/lib/admin-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Ban, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistance } from 'date-fns';

export function UsersTable() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'banned' | 'suspended'>('all');
  const [loading, setLoading] = useState(true);

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
      filtered = filtered.filter(u => u.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        u =>
          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleStatusChange = async (userId: string, newStatus: 'active' | 'banned' | 'suspended') => {
    try {
      await updateUserStatus(userId, newStatus);
      toast.success(`User status updated to ${newStatus}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user status:', error);
      toast.error('Failed to update user status');
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
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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
          <div className="p-6 text-center text-muted-foreground">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Email</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Name</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Role</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Joined</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-3 text-sm">{user.email}</td>
                    <td className="px-6 py-3 text-sm">{user.displayName}</td>
                    <td className="px-6 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.status)}
                        <span className="capitalize text-xs">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm capitalize">{user.role}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      {formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <Select
                        value={user.status}
                        onValueChange={(value) => handleStatusChange(user.id, value as any)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspend</SelectItem>
                          <SelectItem value="banned">Ban</SelectItem>
                        </SelectContent>
                      </Select>
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
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Restricted</p>
            <p className="text-2xl font-bold text-red-500">
              {users.filter(u => u.status !== 'active').length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
