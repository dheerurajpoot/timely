'use client';

import { useState, useEffect } from 'react';
import { TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#0ea5e9', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
];

interface SlotEditorProps {
  isOpen: boolean;
  slot?: TimeSlot;
  onClose: () => void;
  onSave: (slot: TimeSlot) => Promise<void>;
}

export function SlotEditor({ isOpen, slot, onClose, onSave }: SlotEditorProps) {
  const [title, setTitle] = useState(slot?.title || '');
  const [startTime, setStartTime] = useState(slot?.startTime || '09:00');
  const [endTime, setEndTime] = useState(slot?.endTime || '10:00');
  const [color, setColor] = useState(slot?.color || COLORS[4]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(slot?.title || '');
      setStartTime(slot?.startTime || '09:00');
      setEndTime(slot?.endTime || '10:00');
      setColor(slot?.color || COLORS[4]);
    }
  }, [isOpen, slot]);

  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);
    try {
      const newSlot: TimeSlot = {
        id: slot?.id || `slot_${Date.now()}`,
        title: title.trim(),
        startTime,
        endTime,
        color,
      };
      await onSave(newSlot);
      handleClose();
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setTitle(slot?.title || '');
    setStartTime(slot?.startTime || '09:00');
    setEndTime(slot?.endTime || '10:00');
    setColor(slot?.color || COLORS[4]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{slot ? 'Edit Activity' : 'Add Activity'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Note / Task</label>
            <Textarea
              placeholder="Jot down notes, task details..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
              className="resize-none min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time</label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Time</label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={saving}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    color === c ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  disabled={saving}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !title.trim()}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
