'use client';

import { useState } from 'react';
import { WeeklyTimetable, TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SlotEditor } from './slot-editor';
import { SlotCard } from './slot-card';
import { ShareDialog } from '@/components/dashboard/share-dialog';
import { CollaboratorsDisplay } from '@/components/dashboard/collaborators-display';
import { shareTimetable } from '@/lib/firestore-utils';
import { Plus, Share2, Loader2, Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { format, startOfWeek, addWeeks, subWeeks, isSameWeek } from 'date-fns';

interface WeeklyViewProps {
  timetable: WeeklyTimetable | null;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAddSlot: (day: string, slot: TimeSlot) => Promise<void>;
  onUpdateSlot: (day: string, slotId: string, updates: Partial<TimeSlot>) => Promise<void>;
  onDeleteSlot: (day: string, slotId: string) => Promise<void>;
  loading: boolean;
}

export function WeeklyView({
  timetable,
  currentDate,
  onDateChange,
  onAddSlot,
  onUpdateSlot,
  onDeleteSlot,
  loading,
}: WeeklyViewProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [shareOpen, setShareOpen] = useState(false);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = addWeeks(weekStart, 1);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleEdit = (slot: TimeSlot, day: string) => {
    setSelectedSlot(slot);
    setSelectedDay(day);
    setEditorOpen(true);
  };

  const handleAddNew = (day: string) => {
    setSelectedSlot(undefined);
    setSelectedDay(day);
    setEditorOpen(true);
  };

  const handleSaveSlot = async (slot: TimeSlot) => {
    if (selectedSlot) {
      await onUpdateSlot(selectedDay, selectedSlot.id, slot);
    } else {
      await onAddSlot(selectedDay, slot);
    }
  };

  const isToday = (day: string) => {
    const today = format(new Date(), 'EEEE');
    return isSameWeek(currentDate, new Date(), { weekStartsOn: 1 }) && today === day;
  };

  return (
    <div className="h-full flex flex-col bg-background relative selection:bg-blue-500/30">
      
      {/* Glassmorphic Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              Weekly
              <span className="text-muted-foreground/60 hidden sm:inline">Planner</span>
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {format(weekStart, 'MMM d')} — {format(subWeeks(weekEnd, 0), 'MMM d, yyyy')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShareOpen(true)}
              className="rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <CollaboratorsDisplay
              timetableId={timetable?.id || ''}
              ownerId={timetable?.userId || ''}
            />
          </div>
        </div>

        {/* Week Navigation */}
        <div className="px-4 sm:px-6 pb-4 flex items-center gap-4">
          <div className="flex items-center bg-card rounded-full p-0.5 border border-border/50 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => onDateChange(subWeeks(currentDate, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-4 rounded-full font-semibold text-xs sm:text-sm transition-colors ${isSameWeek(currentDate, new Date(), { weekStartsOn: 1 }) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => onDateChange(new Date())}
            >
              This Week
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => onDateChange(addWeeks(currentDate, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-muted/5 pb-20 sm:pb-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
             <Loader2 className="animate-spin text-blue-500 h-8 w-8"/>
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-nowrap overflow-x-auto gap-6 pb-20 snap-x scrollbar-hide scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
              {days.map((day) => {
                const daySlots = timetable?.slots[day] || [];
                const active = isToday(day);

                return (
                  <div key={day} className="flex-none w-[280px] sm:w-[320px] lg:w-[350px] flex flex-col gap-4 snap-center">
                    {/* Day Header */}
                    <div className="flex items-center justify-between px-2">
                       <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-6 rounded-full ${active ? 'bg-blue-500' : 'bg-muted-foreground/30'}`} />
                         <h3 className={`text-sm sm:text-lg font-extrabold uppercase tracking-widest ${active ? 'text-blue-500' : 'text-foreground/70'}`}>
                           {day}
                         </h3>
                       </div>
                       <Button
                         variant="ghost"
                         size="icon"
                         onClick={() => handleAddNew(day)}
                         className="h-7 w-7 rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-colors"
                       >
                         <Plus className="w-4 h-4" />
                       </Button>
                    </div>

                    {/* Day Card Wall */}
                    <div className={`flex-1 min-h-[400px] rounded-[2.5rem] p-5 transition-all duration-300 border ${
                      active 
                        ? 'bg-blue-500/[0.04] border-blue-500/40 shadow-xl shadow-blue-500/10' 
                        : 'bg-card/50 border-border/40 hover:border-border/80 hover:bg-card/80'
                    }`}>
                      {daySlots.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-30 py-12">
                           <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                              <Sparkles className="w-6 h-6" />
                           </div>
                           <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">No activities</span>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {daySlots
                            .sort((a, b) => a.startTime.localeCompare(b.startTime))
                            .map((slot) => (
                              <SlotCard
                                key={slot.id}
                                slot={slot}
                                onEdit={(s) => handleEdit(s, day)}
                                onDelete={(id) => onDeleteSlot(day, id)}
                                onToggleComplete={async (id, completed) => {
                                  await onUpdateSlot(day, id, { completed });
                                }}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FAB for Mobile */}
      <div className="sm:hidden fixed bottom-20 right-5 z-30">
        <Button
          size="icon"
          onClick={() => handleAddNew(format(new Date(), 'EEEE'))}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 border border-blue-500/50"
        >
          <Plus className="w-7 h-7" />
        </Button>
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

      {/* Share Dialog */}
      <ShareDialog
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        timetableId={timetable?.id || ''}
        timetableType="weekly"
        onShare={async (email, role) => {
          if (!timetable) return;
          await shareTimetable(timetable.id, 'weekly', timetable.userId, email, role);
        }}
      />
    </div>
  );
}
