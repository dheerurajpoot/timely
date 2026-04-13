import { AnnouncementsManager } from '@/components/admin/announcements-manager';

export const metadata = {
  title: 'Announcements - Timely Admin',
  description: 'Manage system announcements',
};

export default function AnnouncementsPage() {
  return <AnnouncementsManager />;
}
