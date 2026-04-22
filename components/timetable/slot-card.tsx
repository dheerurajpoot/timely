'use client';

import { TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';

interface SlotCardProps {
  slot: TimeSlot;
  onEdit: (slot: TimeSlot) => void;
  onDelete: (slotId: string) => Promise<void>;
  onToggleComplete?: (slotId: string, completed: boolean) => Promise<void>;
  compact?: boolean;
  tag?: string;
}

export function SlotCard({ slot, onEdit, onDelete, onToggleComplete, compact = false, tag }: SlotCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this activity?')) {
      await onDelete(slot.id);
    }
  };

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleComplete) {
      await onToggleComplete(slot.id, !slot.completed);
    }
  };

  if (compact) {
    return (
      <div
        className={`p-3.5 rounded-xl text-white text-sm group hover:shadow-lg transition-all cursor-pointer ${slot.completed ? 'opacity-50 line-through' : ''}`}
        style={{ backgroundColor: slot.color }}
        onClick={() => onEdit(slot)}
      >
        <div className="font-medium whitespace-pre-wrap line-clamp-4 leading-relaxed mb-3 flex flex-col items-start gap-1.5">
          {tag && <span className="text-[9px] font-bold uppercase opacity-90 tracking-wider bg-black/20 px-1.5 py-0.5 rounded-sm">{tag}</span>}
          <span>{slot.title}</span>
        </div>
        <div className="text-xs font-semibold opacity-90">{slot.startTime} - {slot.endTime}</div>
      </div>
    );
  }

  return (
    <Card className={`p-4 mb-3 transition-opacity relative group/card ${slot.completed ? 'opacity-60 bg-muted/50' : ''}`} style={{ borderLeftColor: slot.color, borderLeftWidth: '4px' }}>
      <div className="flex items-start justify-between">
        <div className="flex-1 flex gap-3 min-w-0">
          {onToggleComplete && (
            <button 
              onClick={handleToggleComplete}
              className={`mt-0.5 focus:outline-none flex-shrink-0 z-10 ${slot.completed ? 'text-green-500' : 'text-muted-foreground hover:text-primary transition-colors'}`}
            >
              {slot.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            </button>
          )}
          <div className={`${slot.completed ? 'line-through text-muted-foreground' : ''} flex-1 min-w-0 pt-0.5`}>
            {tag && (
              <div className="mb-2">
                <span className="px-2 py-0.5 rounded-sm bg-muted/80 text-[10px] font-bold uppercase tracking-wide text-muted-foreground border border-border/50">
                  {tag}
                </span>
              </div>
            )}
            <div className="whitespace-pre-wrap text-sm leading-relaxed mb-3 font-medium break-words pr-2">
              {slot.title}
            </div>
            <div className={`text-xs font-medium flex items-center gap-1.5 ${slot.completed ? 'text-muted-foreground/60' : 'text-muted-foreground/80'}`}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: slot.color }}></div>
              {slot.startTime} - {slot.endTime}
            </div>
          </div>
        </div>
        <div className="flex gap-1 ml-2 flex-shrink-0 z-10 opacity-100 items-start">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(slot);
            }}
            className="h-7 w-7 p-0"
          >
            <Edit2 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
