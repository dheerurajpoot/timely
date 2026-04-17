'use client';

import { useState } from 'react';
import { MonthlyTimetable, TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SlotEditor } from './slot-editor';
import { SlotCard } from './slot-card';
import { ShareDialog } from '@/components/dashboard/share-dialog';
import { CollaboratorsDisplay } from '@/components/dashboard/collaborators-display';
import { shareTimetable } from '@/lib/firestore-utils';
import { Plus, Share2, Loader2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, ListTodo } from 'lucide-react';
import { format, getDaysInMonth, startOfMonth, addMonths, subMonths, isSameMonth, isToday as isDateToday } from 'date-fns';
import { useIsMobile } from '@/components/ui/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

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
  const isMobile = useIsMobile();
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [shareOpen, setShareOpen] = useState(false);
  
  // Mobile Day Detail Sheet
  const [dayDetailOpen, setDayDetailOpen] = useState(false);

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

  const handleDaySelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setDayDetailOpen(true);
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  // Get tasks for selected date in Sheet
  const selectedDateTasks = selectedDate ? (timetable?.events[selectedDate] || []) : [];

  return (
    <div className="h-full flex flex-col bg-background relative selection:bg-blue-500/30">
      
      {/* Mobile-Optimized Glassmorphic Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              {format(currentDate, 'MMMM')}
              <span className="text-muted-foreground/60">{format(currentDate, 'yyyy')}</span>
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5" />
              Monthly Overview
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

        {/* Month Navigation */}
        <div className="px-4 sm:px-6 pb-4 flex items-center gap-4">
          <div className="flex items-center bg-card rounded-full p-0.5 border border-border/50 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => onDateChange(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-4 rounded-full font-semibold text-xs sm:text-sm transition-colors ${isSameMonth(currentDate, new Date()) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => onDateChange(new Date())}
            >
              Current Month
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => onDateChange(addMonths(currentDate, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="flex-1 overflow-auto bg-muted/5 pb-20 sm:pb-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-blue-500 h-8 w-8"/>
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground/60">
                  {day}
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-4">
              {/* Empty days */}
              {emptyDays.map((i) => (
                <div key={`empty-${i}`} className="aspect-square sm:h-32 bg-muted/20 rounded-xl sm:rounded-2xl border border-transparent" />
              ))}

              {/* Day cells */}
              {daysArray.map((day) => {
                const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
                const dateStr = format(date, 'yyyy-MM-dd');
                const slots = timetable?.events[dateStr] || [];
                const isToday = isDateToday(date);

                return (
                  <div
                    key={day}
                    onClick={() => handleDaySelect(dateStr)}
                    className={`aspect-square sm:h-auto sm:min-h-[120px] rounded-xl sm:rounded-3xl border transition-all duration-200 p-1.5 sm:p-4 group relative overflow-hidden flex flex-col cursor-pointer ${
                      isToday
                        ? 'border-blue-500/50 bg-blue-500/[0.03] shadow-lg shadow-blue-500/5'
                        : 'border-border/40 bg-card hover:border-blue-500/30 hover:shadow-xl hover:shadow-black/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-xs sm:text-lg font-extrabold ${isToday ? 'text-blue-500' : 'text-foreground'}`}>
                        {day}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hidden sm:flex h-5 w-5 sm:h-7 sm:w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddNew(dateStr);
                        }}
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>

                    <div className="flex-1 mt-1 sm:mt-3 overflow-y-auto space-y-1 scrollbar-hide">
                      {slots.map((slot) => (
                        <div
                          key={slot.id}
                          className="text-[10px] sm:text-xs font-semibold px-1.5 py-1 rounded-lg border-l-4 truncate transition-transform hover:scale-[1.02] active:scale-95 shadow-sm"
                          style={{ 
                            backgroundColor: `${slot.color}15`, 
                            color: slot.color,
                            borderLeftColor: slot.color,
                          }}
                          onClick={(e) => {
                            if (!isMobile) {
                               e.stopPropagation();
                               handleEdit(slot, dateStr);
                            }
                          }}
                        >
                          <span className="hidden sm:inline opacity-70 mr-1">{slot.startTime}</span>
                          {slot.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Day Detail Sheet */}
      <Sheet open={dayDetailOpen} onOpenChange={setDayDetailOpen}>
        <SheetContent side="bottom" className="rounded-t-[2.5rem] px-6 pb-12 pt-8 min-h-[60vh] max-h-[90vh] overflow-y-auto">
          <SheetHeader className="mb-6">
             <div className="flex items-center justify-between">
               <div>
                 <SheetTitle className="text-2xl font-extrabold tracking-tight">
                   {selectedDate ? format(new Date(selectedDate), 'EEEE, MMM d') : 'Day Details'}
                 </SheetTitle>
                 <SheetDescription className="font-medium text-blue-500">
                   {selectedDateTasks.length} Activities Scheduled
                 </SheetDescription>
               </div>
               <Button 
                 onClick={() => handleAddNew(selectedDate)}
                 className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
               >
                 <Plus size={18} className="mr-2" />
                 Add New
               </Button>
             </div>
          </SheetHeader>
          
          <div className="space-y-4">
             {selectedDateTasks.length === 0 ? (
               <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
                  <ListTodo className="w-16 h-16 mb-4 stroke-1" />
                  <p className="font-bold uppercase tracking-widest text-sm">No Activities Yet</p>
               </div>
             ) : (
               selectedDateTasks.map((slot) => (
                 <SlotCard 
                   key={slot.id} 
                   slot={slot} 
                   onEdit={(s) => handleEdit(s, selectedDate)}
                   onDelete={(id) => onDeleteSlot(selectedDate, id)}
                   onToggleComplete={async (id, completed) => {
                     await onUpdateSlot(selectedDate, id, { completed });
                   }}
                 />
               ))
             )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Floating Action Button (FAB) - For today */}
      <div className="sm:hidden fixed bottom-20 right-5 z-30">
        <Button
          size="icon"
          onClick={() => handleAddNew(format(new Date(), 'yyyy-MM-dd'))}
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
        timetableType="monthly"
        onShare={async (email, role) => {
          if (!timetable) return;
          await shareTimetable(timetable.id, 'monthly', timetable.userId, email, role);
        }}
      />
    </div>
  );
}
