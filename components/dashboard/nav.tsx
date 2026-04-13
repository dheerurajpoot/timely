'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Calendar, CalendarDays, Grid3x3, List, LogOut, LogIn } from 'lucide-react';
import { toast } from 'sonner';

export function DashboardNav() {
  const { signOut, userProfile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
    { label: 'Monthly', href: '/dashboard/monthly', icon: CalendarDays },
    { label: 'Agenda', href: '/dashboard/agenda', icon: List },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen z-40 sticky top-0">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 duration-200">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              T
            </div>
            <div>
              <h1 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Timely</h1>
              <p className="text-xs text-muted-foreground">Smart Scheduler</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md' 
                      : 'hover:bg-muted font-medium'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-muted-foreground'} />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Appearance</span>
            <ThemeToggle />
          </div>
          {userProfile && (
            <div className="px-3 py-2.5 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm font-semibold truncate text-foreground">{userProfile.displayName || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={handleSignOut}
          >
            <LogOut size={20} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-background/80 backdrop-blur-xl border-t border-border z-50 flex items-center justify-around px-2 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.4)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-300 ${
                isActive ? 'text-blue-500 scale-105' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-500/10' : 'bg-transparent'}`}>
                <Icon size={isActive ? 22 : 20} className={isActive ? 'text-blue-500' : 'text-muted-foreground'} />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
              </div>
              <span className={`text-[10px] font-medium transition-all ${isActive ? 'text-blue-500' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
        {/* Settings/Profile Mobile Placeholder */}
        {userProfile ? (
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center justify-center w-16 h-full gap-1 text-muted-foreground hover:text-destructive transition-all duration-300"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent">
              <LogOut size={20} />
            </div>
            <span className="text-[10px] font-medium">Log Out</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex flex-col items-center justify-center w-16 h-full gap-1 text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent">
              <LogIn size={20} />
            </div>
            <span className="text-[10px] font-medium">Sign In</span>
          </Link>
        )}
      </nav>
    </>
  );
}
