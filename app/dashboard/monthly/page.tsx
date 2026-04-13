'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useMonthlyTimetable } from '@/hooks/use-timetable';
import { MonthlyView } from '@/components/timetable/monthly-view';
import { format } from 'date-fns';

export default function MonthlyPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStr = format(currentDate, 'yyyy-MM');
  
  const { timetable, loading, addSlot, updateSlot, removeSlot } = useMonthlyTimetable(
    user?.uid,
    monthStr
  );

  return (
    <MonthlyView
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
