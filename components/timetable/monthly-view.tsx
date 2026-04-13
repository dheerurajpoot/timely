'use client';

import { useState } from 'react';
import { MonthlyTimetable, TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SlotEditor } from './slot-editor';
import { Plus, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth } from 'date-fns';

interface MonthlyViewProps {
  timetable: MonthlyTimetable | null;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAddSlot: (date: string, slot: TimeSlot) => Promise<void>;
  onUpdateSlot: (date: string, slotId: string, updates: Partial<TimeSlot>) => Promise<void>;
  onDeleteSlot: (date: string, slotId: string) => Promise<void>;
  loading: boolean;
}

export function MonthlyView({
  timetable,
  currentDate,
  onDateChange,
  onAddSlot,
  onUpdateSlot,
  onDeleteSlot,
  loading,
}: MonthlyViewProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>('');

  const monthStart = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(monthStart);
  const firstDayOfWeek = monthStart.getDay();

  const handleEdit = (slot: TimeSlot, date: string) => {
    setSelectedSlot(slot);
    setSelectedDate(date);
    setEditorOpen(true);
  };

  const handleAddNew = (date: string) => {
    setSelectedSlot(undefined);
    setSelectedDate(date);
    setEditorOpen(true);
  };

  const handleSaveSlot = async (slot: TimeSlot) => {
    if (selectedSlot) {
      await onUpdateSlot(selectedDate, selectedSlot.id, slot);
    } else {
      await onAddSlot(selectedDate, slot);
    }
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
         <Loader2 className="animate-spin rounded-full h-8 w-8"/>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{format(monthStart, 'MMMM yyyy')}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(subMonths(currentDate, 1))}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(addMonths(currentDate, 1))}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto p-6">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="h-24 bg-muted/30 rounded-lg" />
          ))}

          {/* Days of month */}
          {daysArray.map((day) => {
            const dateStr = format(
              new Date(monthStart.getFullYear(), monthStart.getMonth(), day),
              'yyyy-MM-dd'
            );
            const slots = timetable?.events[dateStr] || [];
            const isToday = new Date().toDateString() === new Date(monthStart.getFullYear(), monthStart.getMonth(), day).toDateString();

            return (
              <div
                key={day}
                className={`h-24 rounded-lg border-2 p-2 flex flex-col ${
                  isToday
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-semibold ${isToday ? 'text-primary' : ''}`}>
                    {day}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0"
                    onClick={() => handleAddNew(dateStr)}
                    title="Add activity"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1">
                  {slots.slice(0, 2).map((slot) => (
                    <div
                      key={slot.id}
                      className="text-xs font-medium px-1 py-0.5 rounded cursor-pointer text-white truncate hover:opacity-90"
                      style={{ backgroundColor: slot.color }}
                      onClick={() => handleEdit(slot, dateStr)}
                      title={slot.title}
                    >
                      {slot.title}
                    </div>
                  ))}
                  {slots.length > 2 && (
                    <div className="text-xs text-muted-foreground px-1">
                      +{slots.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slot Editor Dialog */}
      <SlotEditor
        isOpen={editorOpen}
        slot={selectedSlot}
        onClose={() => {
          setEditorOpen(false);
          setSelectedSlot(undefined);
        }}
        onSave={handleSaveSlot}
      />
    </div>
  );
}
