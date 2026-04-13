'use client';

import { useState } from 'react';
import { DailyTimetable, TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SlotCard } from './slot-card';
import { SlotEditor } from './slot-editor';
import { ShareDialog } from '@/components/dashboard/share-dialog';
import { CollaboratorsDisplay } from '@/components/dashboard/collaborators-display';
import { shareTimetable } from '@/lib/firestore-utils';
import { Plus, ChevronLeft, ChevronRight, Share2, Loader2 } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

interface DailyViewProps {
  timetable: DailyTimetable | null;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAddSlot: (slot: TimeSlot) => Promise<void>;
  onUpdateSlot: (slotId: string, updates: Partial<TimeSlot>) => Promise<void>;
  onDeleteSlot: (slotId: string) => Promise<void>;
  loading: boolean;
}

export function DailyView({
  timetable,
  currentDate,
  onDateChange,
  onAddSlot,
  onUpdateSlot,
  onDeleteSlot,
  loading,
}: DailyViewProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [shareOpen, setShareOpen] = useState(false);

  const handleEdit = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setEditorOpen(true);
  };

  const handleAddNew = () => {
    setSelectedSlot(undefined);
    setEditorOpen(true);
  };

  const handleSaveSlot = async (slot: TimeSlot) => {
    if (selectedSlot) {
      await onUpdateSlot(selectedSlot.id, slot);
    } else {
      await onAddSlot(slot);
    }
  };

  const sortedSlots = timetable?.slots.sort((a, b) => a.startTime.localeCompare(b.startTime)) || [];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {sortedSlots.length} activities scheduled
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-4">
          <CollaboratorsDisplay
            timetableId={timetable?.id || ''}
            ownerId={timetable?.userId || ''}
          />
          <div className="flex flex-col-reverse md:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShareOpen(true)}
              className="gap-2"
            >
              <Share2 size={20} />
              Share
            </Button>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus size={20} />
              Add Activity
            </Button>
          </div>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="border-b border-border px-6 py-3 flex items-center gap-2 bg-card">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateChange(subDays(currentDate, 1))}
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
          onClick={() => onDateChange(addDays(currentDate, 1))}
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="animate-spin rounded-full h-8 w-8"/>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {sortedSlots.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No activities scheduled</p>
                <Button onClick={handleAddNew} variant="outline">
                  Add your first activity
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedSlots.map((slot) => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    onEdit={handleEdit}
                    onDelete={onDeleteSlot}
                    onToggleComplete={async (slotId, completed) => {
                      await onUpdateSlot(slotId, { completed });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
        timetableType="daily"
        onShare={async (email, role) => {
          if (!timetable) return;
          await shareTimetable(timetable.id, 'daily', timetable.userId, email, role);
        }}
      />
    </div>
  );
}
