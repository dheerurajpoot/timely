'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { AdminStats } from '@/lib/types';
import { getAdminStats } from '@/lib/admin-utils';
import { Users, Calendar, MessageSquare, AlertCircle } from 'lucide-react';

export function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-12 bg-muted rounded-lg mb-4"></div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 bg-muted rounded-lg border border-border">
        <p className="text-muted-foreground">Unable to load statistics</p>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      color: 'text-green-500',
    },
    {
      label: 'Total Timetables',
      value: stats.totalTimetables,
      icon: Calendar,
      color: 'text-purple-500',
    },
    {
      label: 'Open Tickets',
      value: stats.openTickets,
      icon: AlertCircle,
      color: 'text-red-500',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadContactSubmissions,
      icon: MessageSquare,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Database Connection</span>
              <span className="text-xs font-semibold text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Authentication Service</span>
              <span className="text-xs font-semibold text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Real-time Sync</span>
              <span className="text-xs font-semibold text-green-500">Active</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              {stats.totalUsers} users registered
            </p>
            <p className="text-muted-foreground">
              {stats.totalTimetables} timetables created
            </p>
            <p className="text-muted-foreground">
              {stats.openTickets} open support tickets
            </p>
            <p className="text-muted-foreground">
              {stats.unreadContactSubmissions} unread contact submissions
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
