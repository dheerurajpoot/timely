'use client';

import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto bg-yellow-500/90 text-yellow-950 px-4 py-3 rounded-lg flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-bottom-2">
      <WifiOff size={18} />
      <div>
        <p className="font-semibold text-sm">You&apos;re offline</p>
        <p className="text-xs opacity-80">Changes will sync when you&apos;re back online</p>
      </div>
    </div>
  );
}
