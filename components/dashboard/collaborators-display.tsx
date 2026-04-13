'use client';

import { useEffect, useState } from 'react';
import { getTimetableCollaborators, getUserProfile } from '@/lib/firestore-utils';
import { SharedTimetable, UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CollaboratorsDisplayProps {
  timetableId: string;
  ownerId: string; // The owner's user id
}

export function CollaboratorsDisplay({ timetableId, ownerId }: CollaboratorsDisplayProps) {
  const [owner, setOwner] = useState<UserProfile | null>(null);
  const [collaborators, setCollaborators] = useState<SharedTimetable[]>([]);

  useEffect(() => {
    if (!timetableId) return;

    const loadData = async () => {
      try {
        const [ownerProfile, shared] = await Promise.all([
          ownerId ? getUserProfile(ownerId) : null,
          getTimetableCollaborators(timetableId),
        ]);
        if (ownerProfile) setOwner(ownerProfile);
        setCollaborators(shared);
      } catch (error) {
        console.error('Failed to load collaborators:', error);
      }
    };

    loadData();
    // We ideally could subscribe to changes if needed, but a fetch on mount is fine for now.
  }, [timetableId, ownerId]);

  if (!timetableId) return null;

  return (
    <div className="flex items-center -space-x-2 mr-4">
      <TooltipProvider>
        {/* Owner */}
        {owner && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8 border-2 border-background ring-2 ring-primary/20 z-10 transition-transform hover:scale-110">
                <AvatarImage src={owner.avatar || ''} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {owner.displayName ? owner.displayName.charAt(0).toUpperCase() : 'O'}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{owner.displayName || 'Owner'}</p>
              <p className="text-xs text-muted-foreground">{owner.email} (Owner)</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Collaborators */}
        {collaborators.map((collab, idx) => {
          const access = collab.sharedWith[0];
          if (!access) return null;
          
          return (
            <Tooltip key={collab.id}>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8 border-2 border-background z-0 transition-transform hover:scale-110 hover:z-20">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                    {access.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{access.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{access.role}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
