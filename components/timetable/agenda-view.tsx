'use client';

import { useState, useEffect } from 'react';
import { TimeSlot, DailyTimetable, WeeklyTimetable, MonthlyTimetable } from '@/lib/types';
import { SlotCard } from './slot-card';
import { SlotEditor } from './slot-editor';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, addDays, startOfToday, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

interface AgendaViewProps {
  dailyTimetables: Record<string, DailyTimetable>;
  weeklyTimetables: Record<string, WeeklyTimetable>;
  monthlyTimetables: Record<string, MonthlyTimetable>;
  onUpdateSlot: (type: string, id: string, slotId: string, updates: Partial<TimeSlot>) => Promise<void>;
  onDeleteSlot: (type: string, id: string, slotId: string) => Promise<void>;
  loading: boolean;
}

interface AgendaSlot extends TimeSlot {
  sourceType: 'daily' | 'weekly' | 'monthly';
  sourceId: string;
  date: string;
  day?: string;
}

export function AgendaView({
  dailyTimetables,
  weeklyTimetables,
  monthlyTimetables,
  onUpdateSlot,
  onDeleteSlot,
  loading,
}: AgendaViewProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<AgendaSlot | undefined>();
  const [agendaSlots, setAgendaSlots] = useState<AgendaSlot[]>([]);

  // Aggregate all slots from all timetables
  useEffect(() => {
    const slots: AgendaSlot[] = [];
    const today = startOfToday();
    const nextMonth = addDays(today, 30);

    // Add daily timetable slots
    Object.entries(dailyTimetables).forEach(([_, tt]) => {
      const ttDate = new Date(tt.date);
      if (isAfter(ttDate, today) && isBefore(ttDate, nextMonth)) {
        tt.slots.forEach((slot) => {
          slots.push({
            ...slot,
            sourceType: 'daily',
            sourceId: tt.id,
            date: tt.date,
          });
        });
      }
    });

    // Add weekly timetable slots (repeated for each day)
    Object.entries(weeklyTimetables).forEach(([_, tt]) => {
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach((day, index) => {
        (tt.slots[day] || []).forEach((slot) => {
          slots.push({
            ...slot,
            sourceType: 'weekly',
            sourceId: tt.id,
            date: tt.weekStart,
            day,
          });
        });
      });
    });

    // Add monthly timetable slots
    Object.entries(monthlyTimetables).forEach(([_, tt]) => {
      Object.entries(tt.events).forEach(([date, evSlots]) => {
        evSlots.forEach((slot) => {
          slots.push({
            ...slot,
            sourceType: 'monthly',
            sourceId: tt.id,
            date,
          });
        });
      });
    });

    // Sort by date and time
    slots.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });

    setAgendaSlots(slots);
  }, [dailyTimetables, weeklyTimetables, monthlyTimetables]);

  const handleEdit = (slot: AgendaSlot) => {
    setSelectedSlot(slot);
    setEditorOpen(true);
  };

  const handleSaveSlot = async (slot: TimeSlot) => {
    if (selectedSlot) {
      await onUpdateSlot(
        selectedSlot.sourceType,
        selectedSlot.sourceId,
        selectedSlot.id,
        slot
      );
    }
  };

  const handleDelete = async (slot: AgendaSlot) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await onDeleteSlot(slot.sourceType, slot.sourceId, slot.id);
    }
  };

 if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
         <Loader2 className="animate-spin rounded-full h-8 w-8"/>
      </div>
    );
  }

  // Group slots by date
  const groupedSlots: Record<string, AgendaSlot[]> = {};
  agendaSlots.forEach((slot) => {
    if (!groupedSlots[slot.date]) {
      groupedSlots[slot.date] = [];
    }
    groupedSlots[slot.date].push(slot);
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {agendaSlots.length} upcoming activities
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {agendaSlots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No upcoming activities scheduled</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSlots)
              .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
              .map(([date, slots]) => (
                <div key={date}>
                  <h3 className="text-lg font-semibold mb-3">
                    {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <div className="space-y-2">
                    {slots.map((slot) => (
                      <SlotCard
                        key={`${slot.sourceId}-${slot.id}`}
                        slot={slot}
                        onEdit={() => handleEdit(slot)}
                        onDelete={() => handleDelete(slot)}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
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
