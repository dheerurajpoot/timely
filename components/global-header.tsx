'use client';

import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { UserCircle, Download, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function GlobalHeader() {
  const { userProfile, loading } = useAuth();
  const { installPrompt, isInstalled, handleInstall } = usePWAInstall();
  const pathname = usePathname();

  // If we are showing the sidebar (like on dashboard), we don't necessarily 
  // need the logo duplicated in the header on desktop. But for "app feel" standard, 
  // let's adjust based on layout or just keep it simple.
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 sm:px-6 backdrop-blur-md transition-all duration-300">
      {/* Left side: App Name */}
      <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-200">
        <div className="md:hidden lg:flex w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
          <Image src="/logo.png" alt="Logo" width={28} height={28} />
        </div>
        <h1 className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 block md:hidden lg:block">
          Timely
        </h1>
      </Link>

      {/* Right side: Actions, Install, Auth, Theme */}
      <div className="flex items-center gap-2 sm:gap-4">
        {!isInstalled && installPrompt && (
          <Button 
            onClick={handleInstall}
            variant="outline" 
            className="hidden sm:flex rounded-full border-blue-500/30 text-blue-500 hover:bg-blue-500/10 gap-2 font-medium h-9 px-4"
          >
            <Download className="w-4 h-4" />
            Install App
          </Button>
        )}
        
        <ThemeToggle />

        {!loading && (
          userProfile ? (
            <Link 
              href="/dashboard/profile" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity p-1 rounded-full hover:bg-muted"
            >
              <span className="text-sm font-medium hidden sm:inline-block">
                {userProfile.displayName || 'Profile'}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center border border-border shadow-sm">
                <UserCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </Link>
          ) : (
            <>
              {pathname !== '/login' && (
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" className="font-semibold text-muted-foreground hover:text-foreground">Log in</Button>
                </Link>
              )}
              {pathname !== '/signup' && (
                <Link href="/signup">
                  <Button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/20 border-0 transition-transform hover:-translate-y-0.5 h-9">
                    Sign Up <ChevronRight className="w-4 h-4 ml-1 hidden sm:block" />
                  </Button>
                </Link>
              )}
            </>
          )
        )}
      </div>
    </header>
  );
}
