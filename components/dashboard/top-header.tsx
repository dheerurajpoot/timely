'use client';

import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';

export function TopHeader() {
  const { userProfile } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      {/* Left side: App Name */}
      <div className="flex items-center gap-2">
        <div className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
          <Image src="/logo.png" alt="Logo" width={28} height={28} />
        </div>
        <h1 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 md:hidden">
          Timely
        </h1>
        <div className="hidden md:block font-bold text-xl text-foreground">
          Timely
        </div>
      </div>

      {/* Right side: Theme Toggle + User Profile */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link 
          href="/dashboard/profile" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity p-1 rounded-full hover:bg-muted"
        >
          <span className="text-sm font-medium hidden sm:inline-block">
            {userProfile?.displayName || 'Profile'}
          </span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center border border-border shadow-sm">
            <UserCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </Link>
      </div>
    </header>
  );
}
