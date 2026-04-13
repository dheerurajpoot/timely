'use client';

import { TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Edit2 } from 'lucide-react';

interface SlotCardProps {
  slot: TimeSlot;
  onEdit: (slot: TimeSlot) => void;
  onDelete: (slotId: string) => Promise<void>;
  compact?: boolean;
}

export function SlotCard({ slot, onEdit, onDelete, compact = false }: SlotCardProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await onDelete(slot.id);
    }
  };

  if (compact) {
    return (
      <div
        className="p-3 rounded-lg text-white text-sm group hover:shadow-md transition-shadow cursor-pointer"
        style={{ backgroundColor: slot.color }}
        onClick={() => onEdit(slot)}
      >
        <div className="font-medium truncate">{slot.title}</div>
        <div className="text-xs opacity-80">{slot.startTime} - {slot.endTime}</div>
      </div>
    );
  }

  return (
    <Card className="p-4 mb-3" style={{ borderLeftColor: slot.color, borderLeftWidth: '4px' }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{slot.title}</h3>
          {slot.description && (
            <p className="text-xs text-muted-foreground mt-1">{slot.description}</p>
          )}
          <div className="text-xs text-muted-foreground mt-2">
            {slot.startTime} - {slot.endTime}
          </div>
        </div>
        <div className="flex gap-2 ml-2">
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
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
