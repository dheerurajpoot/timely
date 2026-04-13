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
}

export function SlotCard({ slot, onEdit, onDelete, onToggleComplete, compact = false }: SlotCardProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await onDelete(slot.id);
    }
  };

  const handleToggleComplete = async () => {
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
        <div className="font-medium truncate">{slot.title}</div>
        <div className="text-xs opacity-80">{slot.startTime} - {slot.endTime}</div>
      </div>
    );
  }

  return (
    <Card className={`p-4 mb-3 transition-opacity ${slot.completed ? 'opacity-60 bg-muted/50' : ''}`} style={{ borderLeftColor: slot.color, borderLeftWidth: '4px' }}>
      <div className="flex items-start justify-between">
        <div className="flex-1 flex gap-3">
          {onToggleComplete && (
            <button 
              onClick={handleToggleComplete}
              className={`mt-0.5 focus:outline-none flex-shrink-0 ${slot.completed ? 'text-green-500' : 'text-muted-foreground hover:text-primary transition-colors'}`}
            >
              {slot.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            </button>
          )}
          <div className={`${slot.completed ? 'line-through text-muted-foreground' : ''}`}>
            <h3 className="font-semibold text-sm">{slot.title}</h3>
            {slot.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{slot.description}</p>
            )}
            <div className={`text-xs mt-2 ${slot.completed ? 'text-muted-foreground/80' : 'text-muted-foreground'}`}>
              {slot.startTime} - {slot.endTime}
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(slot)}
            className="h-8 w-8 p-0"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
