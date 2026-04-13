'use client';

import { useParams } from 'next/navigation';
import { 
  useSharedDailyTimetable, 
  useSharedWeeklyTimetable, 
  useSharedMonthlyTimetable 
} from '@/hooks/use-timetable';
import { DailyView } from '@/components/timetable/daily-view';
import { WeeklyView } from '@/components/timetable/weekly-view';
import { MonthlyView } from '@/components/timetable/monthly-view';
import { Loader2 } from 'lucide-react';

export default function SharedTimetablePage() {
  const params = useParams();
  const type = params.type as string;
  const id = params.id as string;

  // We conditionally call hooks based on type, but React requires hooks to be called consistently.
  // Instead of conditional hooks, we extract them to wrapper components.
  
  if (!type || !id) {
    return <div className="p-8 text-center text-muted-foreground">Invalid link.</div>;
  }

  if (type === 'daily') return <SharedDailyWrapper id={id} />;
  if (type === 'weekly') return <SharedWeeklyWrapper id={id} />;
  if (type === 'monthly') return <SharedMonthlyWrapper id={id} />;

  return <div className="p-8 text-center text-muted-foreground">Unknown timetable type.</div>;
}

function SharedDailyWrapper({ id }: { id: string }) {
  const { timetable, loading, addSlot, updateSlot, removeSlot } = useSharedDailyTimetable(id);

  if (loading) return <LoadingState />;
  if (!timetable) return <NotFoundState />;

  // We pass a dummy onDateChange because in a shared view, the date is fixed to the timetable date
  return (
    <DailyView
      timetable={timetable}
      currentDate={new Date(timetable.date)}
      onDateChange={() => {}} 
      onAddSlot={addSlot}
      onUpdateSlot={updateSlot}
      onDeleteSlot={removeSlot}
      loading={loading}
    />
  );
}

function SharedWeeklyWrapper({ id }: { id: string }) {
  const { timetable, loading, addSlot, updateSlot, removeSlot } = useSharedWeeklyTimetable(id);

  if (loading) return <LoadingState />;
  if (!timetable) return <NotFoundState />;

  return (
    <WeeklyView
      timetable={timetable}
      currentDate={new Date(timetable.weekStart)}
      onDateChange={() => {}} 
      onAddSlot={addSlot}
      onUpdateSlot={updateSlot}
      onDeleteSlot={removeSlot}
      loading={loading}
    />
  );
}

function SharedMonthlyWrapper({ id }: { id: string }) {
  const { timetable, loading, addSlot, updateSlot, removeSlot } = useSharedMonthlyTimetable(id);

  if (loading) return <LoadingState />;
  if (!timetable) return <NotFoundState />;

  return (
    <MonthlyView
      timetable={timetable}
      currentDate={new Date(timetable.month + '-01')}
      onDateChange={() => {}} 
      onAddSlot={addSlot}
      onUpdateSlot={updateSlot}
      onDeleteSlot={removeSlot}
      loading={loading}
    />
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground">Timetable not found or you lack permission to view it.</p>
    </div>
  );
}
