import { AuthProvider } from '@/lib/auth-context';
import { DashboardNav } from '@/components/dashboard/nav';
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
    <AuthProvider>
      <ProtectedRoute>
        <div className="flex h-screen bg-background">
          <DashboardNav />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
