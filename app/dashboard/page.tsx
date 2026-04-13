'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useDailyTimetable } from '@/hooks/use-timetable';
import { DailyView } from '@/components/timetable/daily-view';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateStr = format(currentDate, 'yyyy-MM-dd');
  
  const { timetable, loading, addSlot, updateSlot, removeSlot } = useDailyTimetable(
    user?.uid,
    dateStr
  );

  return (
    <div className="flex flex-col h-full bg-background w-full">
      {/* Professional User Header */}
      <div className="px-6 py-8 md:py-10 bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Welcome back, <span className="text-primary">{userProfile?.displayName || user?.displayName || 'User'}</span> 👋
        </h1>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          Here is your daily overview. Let's make today productive!
        </p>
      </div>

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
