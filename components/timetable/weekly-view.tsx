'use client';

import { useState } from 'react';
import { WeeklyTimetable, TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SlotCard } from './slot-card';
import { SlotEditor } from './slot-editor';
import { ShareDialog } from '@/components/dashboard/share-dialog';
import { CollaboratorsDisplay } from '@/components/dashboard/collaborators-display';
import { shareTimetable } from '@/lib/firestore-utils';
import { Plus, ChevronLeft, ChevronRight, Share2, Loader2 } from 'lucide-react';
import { format, addWeeks, subWeeks, startOfWeek } from 'date-fns';

interface WeeklyViewProps {
  timetable: WeeklyTimetable | null;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAddSlot: (day: string, slot: TimeSlot) => Promise<void>;
  onUpdateSlot: (day: string, slotId: string, updates: Partial<TimeSlot>) => Promise<void>;
  onDeleteSlot: (day: string, slotId: string) => Promise<void>;
  loading: boolean;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [shareOpen, setShareOpen] = useState(false);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

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
        <div>
          <h1 className="text-3xl font-bold">Weekly Timetable</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-4">
          <CollaboratorsDisplay
            timetableId={timetable?.id || ''}
            ownerId={timetable?.userId || ''}
          />
          <Button
            variant="outline"
            onClick={() => setShareOpen(true)}
            className="gap-2"
          >
            <Share2 size={20} />
            Share
          </Button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="border-b border-border px-6 py-3 flex items-center gap-2 bg-card">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange(subWeeks(currentDate, 1))}
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange(new Date())}
        >
          Current Week
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange(addWeeks(currentDate, 1))}
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Weekly Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {DAYS.map((day) => {
            const slots = timetable?.slots[day] || [];
            const sorted = slots.sort((a, b) => a.startTime.localeCompare(b.startTime));

            return (
              <div key={day} className="flex flex-col">
                <div className="mb-3 pb-3 border-b border-border">
                  <h3 className="font-semibold text-sm">{day}</h3>
                  <p className="text-xs text-muted-foreground">{sorted.length} activities</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-3 gap-1"
                  onClick={() => handleAddNew(day)}
                >
                  <Plus size={14} />
                  Add
                </Button>
                <div className="space-y-2 flex-1">
                  {sorted.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No activities</p>
                  ) : (
                    sorted.map((slot) => (
                      <div
                        key={slot.id}
                        className="p-2 rounded-lg text-white text-xs group cursor-pointer hover:shadow-md transition-shadow"
                        style={{ backgroundColor: slot.color }}
                        onClick={() => handleEdit(slot, day)}
                      >
                        <div className="font-medium truncate">{slot.title}</div>
                        <div className="text-xs opacity-80">{slot.startTime}</div>
                      </div>
                    ))
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
