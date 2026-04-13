'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  LayoutDashboard,
  Users,
  Mail,
  Megaphone,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/tasks', label: 'Tasks Management', icon: FileText },
  { href: '/admin/contact', label: 'Contact Submissions', icon: Mail },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const { signOut, userProfile } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden border-b border-border p-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 font-bold">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-sm">
            T
          </div>
          <span>Timely Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-muted border-r border-border p-4 flex flex-col z-50 transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="hidden md:flex items-center gap-2 mb-8 font-bold">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-sm">
            T
          </div>
          <span>Timely Admin</span>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-background'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="space-y-4 border-t border-border pt-4">
          <div className="px-4 py-2 bg-background rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Admin</p>
            <p className="text-sm font-medium truncate">{userProfile?.email}</p>
          </div>

          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={20} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
