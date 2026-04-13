'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { AgendaView } from '@/components/timetable/agenda-view';
import { DailyTimetable, WeeklyTimetable, MonthlyTimetable } from '@/lib/types';
import {
  getDailyTimetable,
  getWeeklyTimetable,
  getMonthlyTimetable,
  updateDailyTimetable,
  updateWeeklyTimetable,
  updateMonthlyTimetable,
} from '@/lib/firestore-utils';
import { format, addDays, startOfToday, startOfWeek, startOfMonth } from 'date-fns';

export default function AgendaPage() {
  const { user } = useAuth();
  const [dailyTimetables, setDailyTimetables] = useState<Record<string, DailyTimetable>>({});
  const [weeklyTimetables, setWeeklyTimetables] = useState<Record<string, WeeklyTimetable>>({});
  const [monthlyTimetables, setMonthlyTimetables] = useState<Record<string, MonthlyTimetable>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadTimetables = async () => {
      try {
        setLoading(true);
        const today = startOfToday();
        
        // Load next 30 days of daily timetables
        const dailies: Record<string, DailyTimetable> = {};
        for (let i = 0; i < 30; i++) {
          const date = addDays(today, i);
          const dateStr = format(date, 'yyyy-MM-dd');
          const tt = await getDailyTimetable(user.uid, dateStr);
          if (tt) dailies[dateStr] = tt;
        }
        setDailyTimetables(dailies);

        // Load current and next 2 weeks
        const weeklies: Record<string, WeeklyTimetable> = {};
        for (let i = 0; i < 3; i++) {
          const weekDate = addDays(today, i * 7);
          const weekStart = startOfWeek(weekDate, { weekStartsOn: 1 });
          const weekStartStr = format(weekStart, 'yyyy-MM-dd');
          const tt = await getWeeklyTimetable(user.uid, weekStartStr);
          if (tt) weeklies[weekStartStr] = tt;
        }
        setWeeklyTimetables(weeklies);

        // Load current and next 2 months
        const monthlies: Record<string, MonthlyTimetable> = {};
        for (let i = 0; i < 3; i++) {
          const monthDate = new Date(today);
          monthDate.setMonth(monthDate.getMonth() + i);
          const monthStr = format(monthDate, 'yyyy-MM');
          const tt = await getMonthlyTimetable(user.uid, monthStr);
          if (tt) monthlies[monthStr] = tt;
        }
        setMonthlyTimetables(monthlies);
      } catch (error) {
        console.error('Error loading timetables:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTimetables();
  }, [user]);

  const handleUpdateSlot = async (
    type: string,
    id: string,
    slotId: string,
    updates: any
  ) => {
    try {
      if (type === 'daily') {
        const tt = dailyTimetables[id];
        if (tt) {
          const updated = {
            ...tt,
            slots: tt.slots.map((s) =>
              s.id === slotId ? { ...s, ...updates } : s
            ),
          };
          await updateDailyTimetable(updated);
          setDailyTimetables({
            ...dailyTimetables,
            [id]: updated,
          });
        }
      } else if (type === 'weekly') {
        const tt = weeklyTimetables[id];
        if (tt) {
          // Find which day has this slot
          let updated = tt;
          for (const day of Object.keys(tt.slots)) {
            const hasSlot = tt.slots[day].some((s) => s.id === slotId);
            if (hasSlot) {
              updated = {
                ...tt,
                slots: {
                  ...tt.slots,
                  [day]: tt.slots[day].map((s) =>
                    s.id === slotId ? { ...s, ...updates } : s
                  ),
                },
              };
              break;
            }
          }
          await updateWeeklyTimetable(updated);
          setWeeklyTimetables({
            ...weeklyTimetables,
            [id]: updated,
          });
        }
      } else if (type === 'monthly') {
        const tt = monthlyTimetables[id];
        if (tt) {
          // Find which date has this slot
          let updated = tt;
          for (const date of Object.keys(tt.events)) {
            const hasSlot = tt.events[date].some((s) => s.id === slotId);
            if (hasSlot) {
              updated = {
                ...tt,
                events: {
                  ...tt.events,
                  [date]: tt.events[date].map((s) =>
                    s.id === slotId ? { ...s, ...updates } : s
                  ),
                },
              };
              break;
            }
          }
          await updateMonthlyTimetable(updated);
          setMonthlyTimetables({
            ...monthlyTimetables,
            [id]: updated,
          });
        }
      }
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  };

  const handleDeleteSlot = async (
    type: string,
    id: string,
    slotId: string
  ) => {
    try {
      if (type === 'daily') {
        const tt = dailyTimetables[id];
        if (tt) {
          const updated = {
            ...tt,
            slots: tt.slots.filter((s) => s.id !== slotId),
          };
          await updateDailyTimetable(updated);
          setDailyTimetables({
            ...dailyTimetables,
            [id]: updated,
          });
        }
      } else if (type === 'weekly') {
        const tt = weeklyTimetables[id];
        if (tt) {
          let updated = tt;
          for (const day of Object.keys(tt.slots)) {
            const hasSlot = tt.slots[day].some((s) => s.id === slotId);
            if (hasSlot) {
              updated = {
                ...tt,
                slots: {
                  ...tt.slots,
                  [day]: tt.slots[day].filter((s) => s.id !== slotId),
                },
              };
              break;
            }
          }
          await updateWeeklyTimetable(updated);
          setWeeklyTimetables({
            ...weeklyTimetables,
            [id]: updated,
          });
        }
      } else if (type === 'monthly') {
        const tt = monthlyTimetables[id];
        if (tt) {
          let updated = tt;
          for (const date of Object.keys(tt.events)) {
            const hasSlot = tt.events[date].some((s) => s.id === slotId);
            if (hasSlot) {
              updated = {
                ...tt,
                events: {
                  ...tt.events,
                  [date]: tt.events[date].filter((s) => s.id !== slotId),
                },
              };
              break;
            }
          }
          await updateMonthlyTimetable(updated);
          setMonthlyTimetables({
            ...monthlyTimetables,
            [id]: updated,
          });
        }
      }
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  return (
    <AgendaView
      dailyTimetables={dailyTimetables}
      weeklyTimetables={weeklyTimetables}
      monthlyTimetables={monthlyTimetables}
      onUpdateSlot={handleUpdateSlot}
      onDeleteSlot={handleDeleteSlot}
      loading={loading}
    />
  );
}
