import { SharedTimetablesList } from '@/components/dashboard/shared-timetables-list';

export const metadata = {
  title: 'Shared Workspaces - Timely',
  description: 'View timetables shared with you',
};

export default function SharedTab() {
  return (
    <div className="flex flex-col h-full bg-background w-full p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shared With Me</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Workspaces and timetables shared by your colleagues.
        </p>
      </div>
      <div className="flex-1 overflow-auto">
        <SharedTimetablesList />
      </div>
    </div>
  );
}
