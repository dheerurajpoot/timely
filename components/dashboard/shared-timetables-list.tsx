'use client';

import { useEffect, useState } from 'react';
import { getSharedTimetablesByEmail, getUserProfile } from '@/lib/firestore-utils';
import { SharedTimetable, UserProfile } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, CalendarIcon, CalendarClock, ArrowRight, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function SharedTimetablesList() {
  const { user } = useAuth();
  const [shared, setShared] = useState<SharedTimetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [owners, setOwners] = useState<Record<string, UserProfile>>({});

  useEffect(() => {
    if (!user?.email) return;

    const loadShared = async () => {
      try {
        const timetables = await getSharedTimetablesByEmail(user.email!);
        setShared(timetables);

        // Fetch owners
        const uniqueOwnerIds = Array.from(new Set(timetables.map(t => t.ownerId)));
        const profiles = await Promise.all(uniqueOwnerIds.map(id => getUserProfile(id)));
        
        const ownerMap: Record<string, UserProfile> = {};
        profiles.forEach(p => {
          if (p) ownerMap[p.id] = p;
        });
        setOwners(ownerMap);
      } catch (error) {
        console.error('Failed to load shared timetables:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShared();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        Loading your shared workspaces...
      </div>
    );
  }

  if (shared.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg bg-muted/20">
        <CalendarDays className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-semibold">Nothing shared with you</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          When colleagues invite you to their timetables via your email ({user?.email}), they will appear directly here for instant access.
        </p>
      </div>
    );
  }

  const getIconForType = (type: string) => {
    switch(type) {
      case 'daily': return <CalendarClock className="w-5 h-5 text-blue-500" />;
      case 'weekly': return <CalendarDays className="w-5 h-5 text-green-500" />;
      case 'monthly': return <CalendarIcon className="w-5 h-5 text-purple-500" />;
      default: return <CalendarDays className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
      {shared.map((doc) => {
        const access = doc.sharedWith.find(s => s.email === user?.email);
        const owner = owners[doc.ownerId];

        // Format the ID display depending on type
        // The ID generally looks like "daily_ID_2026-04-13" or "weekly_ID_2026-04-13"
        const idParts = doc.timetableId.split('_');
        const specificDate = idParts.length > 2 ? idParts[2] : 'Workspace';

        return (
          <Card key={doc.id} className="p-5 flex flex-col justify-between hover:border-primary/50 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  {getIconForType(doc.timetableType)}
                  <span className="capitalize font-semibold">{doc.timetableType} Timetable</span>
                </div>
                <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full uppercase">
                  {access?.role || 'Viewer'}
                </div>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium">Date / Range:</p>
                <p className="text-sm text-muted-foreground">{specificDate}</p>
              </div>

              <div className="space-y-1 mb-6">
                <p className="text-sm font-medium">Owner / Host:</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                    {owner?.displayName ? owner.displayName.charAt(0).toUpperCase() : 'O'}
                  </div>
                  <p className="text-sm text-muted-foreground">{owner?.displayName || 'Unknown'} ({owner?.email || 'No email'})</p>
                </div>
              </div>
            </div>

            <Button asChild className="w-full group-hover:bg-primary group-hover:text-white transition-all">
              <Link href={`/dashboard/shared/${doc.timetableType}/${doc.timetableId}`}>
                Open Workspace
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
