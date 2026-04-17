'use client';

import { useState, useEffect } from 'react';
import { TimeSlot, DailyTimetable, WeeklyTimetable, MonthlyTimetable } from '@/lib/types';
import { SlotCard } from './slot-card';
import { SlotEditor } from './slot-editor';
import { Loader2, Plus, Calendar, ListTodo, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, addDays, startOfToday, isAfter, isBefore, isToday, isTomorrow, isYesterday } from 'date-fns';

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
      if (isAfter(ttDate, today) || isToday(ttDate)) {
        if (isBefore(ttDate, nextMonth)) {
          tt.slots.forEach((slot) => {
            slots.push({
              ...slot,
              sourceType: 'daily',
              sourceId: tt.date, // Use date string as key for lookup
              date: tt.date,
            });
          });
        }
      }
    });

    // Add weekly timetable slots (repeated for each day in current week)
    Object.entries(weeklyTimetables).forEach(([_, tt]) => {
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach((day) => {
        (tt.slots[day] || []).forEach((slot) => {
          // Simplification: use current week's dates for weekly items in agenda
          slots.push({
            ...slot,
            sourceType: 'weekly',
            sourceId: tt.weekStart, // Use weekStart string as key for lookup
            date: tt.weekStart, // placeholder
            day,
          });
        });
      });
    });

    // Add monthly timetable slots
    Object.entries(monthlyTimetables).forEach(([_, tt]) => {
      Object.entries(tt.events).forEach(([date, evSlots]) => {
        const itemDate = new Date(date);
        if (isAfter(itemDate, today) || isToday(itemDate)) {
          evSlots.forEach((slot) => {
            slots.push({
              ...slot,
              sourceType: 'monthly',
              sourceId: tt.month, // Use month string as key for lookup
              date,
            });
          });
        }
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

  // Group slots by date
  const groupedSlots: Record<string, AgendaSlot[]> = {};
  agendaSlots.forEach((slot) => {
    if (!groupedSlots[slot.date]) {
      groupedSlots[slot.date] = [];
    }
    groupedSlots[slot.date].push(slot);
  });

  // Intelligent Date Label Logic
  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'EEEE, MMM d');
  };

  return (
    <div className="h-full flex flex-col bg-background relative selection:bg-blue-500/30">
      
      {/* Glassmorphic Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
                Agenda
                <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
              </h1>
              <p className="text-sm font-medium text-muted-foreground mt-1 flex items-center gap-1.5">
                <ListTodo className="w-4 h-4" />
                {agendaSlots.length} Activities Found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-muted/5 pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
             <Loader2 className="animate-spin text-blue-500 h-8 w-8"/>
             <span className="text-sm font-medium text-muted-foreground">Compiling your schedule...</span>
          </div>
        ) : agendaSlots.length === 0 ? (
          <div className="p-8 max-w-lg mx-auto mt-12 text-center bg-card rounded-[2.5rem] border border-border/50 shadow-xl shadow-black/5">
            <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
               <Calendar className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Your agenda is clear</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              There are no upcoming activities scheduled for the next 30 days. High five! 
              Time to relax or start planning your next big thing.
            </p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-12 sm:space-y-16">
            {Object.entries(groupedSlots)
              .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
              .map(([date, slots]) => (
                <div key={date} className="relative">
                  {/* Date section header - Fixed sticky logic & background */}
                  <div className="sticky top-0 z-20 py-4 bg-background/95 backdrop-blur-md border-b border-border/5 mb-6">
                    <div className="flex items-center gap-3">
                       <div className={`w-1.5 h-6 rounded-full ${isToday(new Date(date)) ? 'bg-blue-500' : 'bg-muted-foreground/30'}`} />
                       <h3 className={`text-sm sm:text-lg font-extrabold uppercase tracking-widest ${isToday(new Date(date)) ? 'text-blue-500' : 'text-foreground/80'}`}>
                         {getDateLabel(date)}
                       </h3>
                       <div className="flex-1 h-px bg-border/20 mx-2" />
                       <span className="text-[10px] sm:text-xs font-black text-muted-foreground/40 bg-muted/20 px-2 py-1 rounded-md uppercase tracking-tighter">
                         {slots.length} Task{slots.length > 1 ? 's' : ''}
                       </span>
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8 pl-4 sm:pl-6 border-l-2 border-border/30 ml-2 sm:ml-3">
                    {slots.map((slot) => (
                      <div key={`${slot.sourceId}-${slot.id}`} className="group relative">
                        {/* Timeline Connector Dot */}
                        <div className="absolute -left-[23px] sm:-left-[31px] top-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-background border-2 border-border/50 group-hover:border-blue-500 group-hover:scale-125 transition-all z-10" />
                        
                        <SlotCard
                          slot={slot}
                          tag={slot.sourceType}
                          onEdit={() => handleEdit(slot)}
                          onDelete={() => handleDelete(slot)}
                          onToggleComplete={async (slotId, completed) => {
                            await onUpdateSlot(slot.sourceType, slot.sourceId, slotId, { completed });
                          }}
                        />
                      </div>
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
