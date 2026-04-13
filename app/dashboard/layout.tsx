import { AuthProvider } from '@/lib/auth-context';
import { DashboardNav } from '@/components/dashboard/nav';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { TopHeader } from '@/components/dashboard/top-header';

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
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopHeader />
            <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[72px] md:pb-0">
              {children}
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
