import { AdminProtectedRoute } from '@/components/auth/admin-protected-route';
import { AdminNav } from '@/components/admin/admin-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtectedRoute>
      <div className="flex flex-col md:flex-row min-h-screen bg-background">
        <AdminNav />
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  );
}
