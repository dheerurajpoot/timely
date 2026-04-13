'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Grid3x3, List, Menu, X, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';

export function DashboardNav() {
  const { signOut, userProfile } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const navItems = [
    { label: 'Daily', href: '/dashboard', icon: Grid3x3 },
    { label: 'Weekly', href: '/dashboard/weekly', icon: Calendar },
    { label: 'Monthly', href: '/dashboard/monthly', icon: Calendar },
    { label: 'Agenda', href: '/dashboard/agenda', icon: List },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-40`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              T
            </div>
            <div>
              <h1 className="font-bold text-lg">Timely</h1>
              <p className="text-xs text-muted-foreground">Smart Scheduler</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={20} />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-xs font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          {userProfile && (
            <div className="px-3 py-2 rounded-md bg-muted">
              <p className="text-sm font-medium truncate">{userProfile.displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
            </div>
          )}
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
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
