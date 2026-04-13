'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Presence } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PresenceIndicatorProps {
  timetableId: string;
  timetableType: 'daily' | 'weekly' | 'monthly';
}

const COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#0ea5e9',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
];

export function PresenceIndicator({
  timetableId,
  timetableType,
}: PresenceIndicatorProps) {
  const { userProfile } = useAuth();
  const [presences, setPresences] = useState<Presence[]>([]);

  useEffect(() => {
    if (!userProfile) return;

    // Simulate presence updates - in production, use real-time listeners
    const interval = setInterval(() => {
      // Update user's presence
      const userPresence: Presence = {
        userId: userProfile.id,
        displayName: userProfile.displayName,
        lastSeen: Date.now(),
        isActive: true,
      };

      setPresences([userPresence]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [userProfile]);

  if (presences.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Active:</span>
        <div className="flex -space-x-2">
          {presences.map((presence, index) => {
            const color = COLORS[index % COLORS.length];
            const initials = presence.displayName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <Tooltip key={presence.userId}>
                <TooltipTrigger asChild>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-background"
                    style={{ backgroundColor: color }}
                    title={presence.displayName}
                  >
                    {initials}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{presence.displayName}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
