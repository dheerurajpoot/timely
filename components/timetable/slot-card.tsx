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
        className={`p-3 rounded-lg text-white text-sm group hover:shadow-md transition-shadow cursor-pointer ${slot.completed ? 'opacity-50 line-through' : ''}`}
        style={{ backgroundColor: slot.color }}
        onClick={() => onEdit(slot)}
      >
        <div className="font-medium truncate flex justify-between items-center gap-2">
          {slot.title}
          {tag && <span className="text-[8px] font-bold uppercase opacity-70 tracking-tighter">{tag}</span>}
        </div>
        <div className="text-xs opacity-80">{slot.startTime} - {slot.endTime}</div>
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
          <div className={`${slot.completed ? 'line-through text-muted-foreground' : ''} flex-1 min-w-0`}>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-sm truncate" title={slot.title}>{slot.title}</h3>
              {tag && (
                <span className="px-1.5 py-0.5 rounded-full bg-muted text-[9px] font-bold uppercase tracking-tighter text-muted-foreground border border-border/30">
                  {tag}
                </span>
              )}
            </div>
            {slot.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{slot.description}</p>
            )}
            <div className={`text-xs mt-2 ${slot.completed ? 'text-muted-foreground/80' : 'text-muted-foreground'}`}>
              {slot.startTime} - {slot.endTime}
            </div>
          </div>
        </div>
        <div className="flex gap-1 ml-2 flex-shrink-0 z-10 opacity-100 sm:opacity-0 sm:group-hover/card:opacity-100 transition-opacity">
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
