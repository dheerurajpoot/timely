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
        <div className="flex flex-col md:flex-row h-screen bg-background text-foreground overflow-hidden">
          <DashboardNav />
          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[72px] md:pb-0">
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
