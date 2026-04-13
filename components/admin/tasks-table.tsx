'use client';

import { useState, useEffect } from 'react';
import { DailyTimetable, WeeklyTimetable, MonthlyTimetable, UserProfile } from '@/lib/types';
import { getAllUsers, getAllDailyTimetables, getAllWeeklyTimetables, getAllMonthlyTimetables } from '@/lib/admin-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistance } from 'date-fns';
import { Loader2, Trash2, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function TasksTable() {
  const [usersMap, setUsersMap] = useState<Record<string, UserProfile>>({});
  const [dailyTTs, setDailyTTs] = useState<DailyTimetable[]>([]);
  const [weeklyTTs, setWeeklyTTs] = useState<WeeklyTimetable[]>([]);
  const [monthlyTTs, setMonthlyTTs] = useState<MonthlyTimetable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [users, daily, weekly, monthly] = await Promise.all([
        getAllUsers(),
        getAllDailyTimetables(),
        getAllWeeklyTimetables(),
        getAllMonthlyTimetables()
      ]);
      
      const map: Record<string, UserProfile> = {};
      users.forEach(u => map[u.id] = u);
      setUsersMap(map);
      
      setDailyTTs(daily);
      setWeeklyTTs(weekly);
      setMonthlyTTs(monthly);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load tasks data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTimetable = async (collectionName: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this timetable and all its tasks? This action cannot be undone.')) return;
    
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success('Timetable deleted successfully');
      fetchData(); // Reload data
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete timetable');
    }
  };

  const renderUser = (userId: string) => {
    const user = usersMap[userId];
    if (!user) return <span className="text-muted-foreground">{userId}</span>;
    return (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{user.displayName || 'Unknown'}</span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        Loading global tasks...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Global Tasks Management</h2>
        <p className="text-muted-foreground">Monitor and manage all user timetables system-wide.</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="overflow-hidden">
            {dailyTTs.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground flex flex-col items-center">
                <CalendarDays className="w-10 h-10 mb-2 opacity-20" />
                No daily tasks found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Owner</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Date</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Total Slots</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Last Modified</th>
                      <th className="text-right px-6 py-3 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyTTs.map((tt) => (
                      <tr key={tt.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">{renderUser(tt.userId)}</td>
                        <td className="px-6 py-4 text-sm font-medium">{tt.date}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                            {tt.slots?.length || 0} items
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {tt.updatedAt ? formatDistance(new Date(tt.updatedAt), new Date(), { addSuffix: true }) : 'Unknown'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteTimetable('daily_timetables', tt.id)}
                            className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="overflow-hidden">
            {weeklyTTs.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground flex flex-col items-center">
                <CalendarDays className="w-10 h-10 mb-2 opacity-20" />
                No weekly tasks found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Owner</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Week Start</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Timetable Name</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Last Modified</th>
                      <th className="text-right px-6 py-3 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyTTs.map((tt) => {
                      const totalSlots = Object.values(tt.slots || {}).reduce((acc, curr) => acc + (curr?.length || 0), 0);
                      return (
                        <tr key={tt.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">{renderUser(tt.userId)}</td>
                          <td className="px-6 py-4 text-sm font-medium">{tt.weekStart}</td>
                          <td className="px-6 py-4 text-sm max-w-[200px] truncate">
                            <span className="font-semibold">{tt.name}</span>
                            <div className="text-xs text-muted-foreground mt-1">{totalSlots} internal tasks</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {tt.updatedAt ? formatDistance(new Date(tt.updatedAt), new Date(), { addSuffix: true }) : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteTimetable('weekly_timetables', tt.id)}
                              className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="overflow-hidden">
            {monthlyTTs.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground flex flex-col items-center">
                <CalendarDays className="w-10 h-10 mb-2 opacity-20" />
                No monthly tasks found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Owner</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Month</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Label</th>
                      <th className="text-left px-6 py-3 font-semibold text-sm">Last Modified</th>
                      <th className="text-right px-6 py-3 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyTTs.map((tt) => {
                      const totalSlots = Object.values(tt.events || {}).reduce((acc, curr) => acc + (curr?.length || 0), 0);
                      return (
                        <tr key={tt.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">{renderUser(tt.userId)}</td>
                          <td className="px-6 py-4 text-sm font-medium">{tt.month}</td>
                          <td className="px-6 py-4 text-sm max-w-[200px] truncate">
                            <span className="font-semibold">{tt.name}</span>
                            <div className="text-xs text-muted-foreground mt-1">{totalSlots} internal events</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {tt.updatedAt ? formatDistance(new Date(tt.updatedAt), new Date(), { addSuffix: true }) : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteTimetable('monthly_timetables', tt.id)}
                              className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
