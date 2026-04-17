import { ProtectedRoute } from '@/components/auth/protected-route';

export const metadata = {
  title: 'Dashboard - Timely',
  description: 'Manage your timetables',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
