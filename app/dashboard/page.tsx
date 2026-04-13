'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useDailyTimetable } from '@/hooks/use-timetable';
import { DailyView } from '@/components/timetable/daily-view';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateStr = format(currentDate, 'yyyy-MM-dd');
  
  const { timetable, loading, addSlot, updateSlot, removeSlot } = useDailyTimetable(
    user?.uid,
    dateStr
  );

  return (
    <div className="flex flex-col h-full bg-background w-full">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <DailyView
          timetable={timetable}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onAddSlot={addSlot}
          onUpdateSlot={updateSlot}
          onDeleteSlot={removeSlot}
          loading={loading}
        />
      </div>
    </div>
  );
}
