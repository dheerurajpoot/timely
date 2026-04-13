'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useWeeklyTimetable } from '@/hooks/use-timetable';
import { WeeklyView } from '@/components/timetable/weekly-view';
import { format, startOfWeek } from 'date-fns';

export default function WeeklyPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekStartStr = format(weekStart, 'yyyy-MM-dd');
  
  const { timetable, loading, addSlot, updateSlot, removeSlot } = useWeeklyTimetable(
    user?.uid,
    weekStartStr
  );

  return (
    <WeeklyView
      timetable={timetable}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      onAddSlot={addSlot}
      onUpdateSlot={updateSlot}
      onDeleteSlot={removeSlot}
      loading={loading}
    />
  );
}
