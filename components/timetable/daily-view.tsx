'use client';

import { useState } from 'react';
import { DailyTimetable, TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SlotCard } from './slot-card';
import { SlotEditor } from './slot-editor';
import { ShareDialog } from '@/components/dashboard/share-dialog';
import { CollaboratorsDisplay } from '@/components/dashboard/collaborators-display';
import { shareTimetable } from '@/lib/firestore-utils';
import { Plus, ChevronLeft, ChevronRight, Share2, Loader2, Calendar } from 'lucide-react';
import { format, addDays, subDays, isToday, isTomorrow, isYesterday } from 'date-fns';

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
  
  // Intelligent Date Label Logic
  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="h-full flex flex-col bg-background relative selection:bg-blue-500/30">
      
      {/* Mobile-Optimized Glassmorphic Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
        
        {/* Top Row: Info & Actions */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              {getDateLabel(currentDate)}
              {isToday(currentDate) && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />}
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {format(currentDate, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setShareOpen(true)}
               className="rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-600 transition-colors"
               title="Share Timetable"
             >
               <Share2 className="w-5 h-5" />
             </Button>

             {/* Desktop Add Button */}
             <Button
               onClick={handleAddNew}
               className="hidden sm:flex rounded-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
             >
               <Plus className="w-5 h-5" />
               New Task
             </Button>
          </div>
        </div>

        {/* Bottom Row: Date Navigation & Collaborators */}
        <div className="px-4 sm:px-6 pb-4 flex items-center justify-between">
          <div className="flex items-center bg-card rounded-full p-1 border border-border/50 shadow-sm shadow-black/5">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-muted shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => onDateChange(subDays(currentDate, 1))}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 sm:h-9 px-3 sm:px-5 rounded-full font-semibold text-xs sm:text-sm shrink-0 transition-colors ${isToday(currentDate) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => onDateChange(new Date())}
            >
              {isToday(currentDate) ? 'Current Day' : 'Go to Today'}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-muted shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => onDateChange(addDays(currentDate, 1))}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          <CollaboratorsDisplay
             timetableId={timetable?.id || ''}
             ownerId={timetable?.userId || ''}
          />
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex items-center justify-center flex-1 bg-muted/10">
          <div className="flex flex-col items-center gap-3">
             <Loader2 className="animate-spin text-blue-500 h-8 w-8"/>
             <span className="text-sm font-medium text-muted-foreground">Loading tasks...</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto bg-muted/10 pb-28 sm:pb-12">
          <div className="p-4 sm:p-6 sm:max-w-3xl sm:mx-auto">
            {sortedSlots.length === 0 ? (
              <div className="text-center py-20 px-4 bg-card rounded-3xl border border-border/50 shadow-sm shadow-black/5">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">No tasks for {getDateLabel(currentDate)}</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                  Your schedule is completely clear! Take a break, or add a new task to get started.
                </p>
                <Button onClick={handleAddNew} className="rounded-full px-6 shadow-md shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white">
                  Add your first task
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Mobile Task Counter */}
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 mb-2">
                  {sortedSlots.length} Task{sortedSlots.length > 1 ? 's' : ''} Scheduled
                </p>
                
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

      {/* Mobile Floating Action Button (FAB) */}
      <div className="sm:hidden fixed bottom-20 right-5 z-30">
        <Button
          size="icon"
          onClick={handleAddNew}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 border border-blue-500/50 hover:scale-105 active:scale-95 transition-all"
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
        timetableType="daily"
        onShare={async (email, role) => {
          if (!timetable) return;
          await shareTimetable(timetable.id, 'daily', timetable.userId, email, role);
        }}
      />
    </div>
  );
}
