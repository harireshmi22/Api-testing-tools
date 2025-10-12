'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { SplashScreen } from '../SplashScreen';

export default function AppInitializer({ children }) {
  const { _hasHydrated, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (_hasHydrated) {
      const isAuthPage = pathname.startsWith('/auth');
      const isHomePage = pathname === '/';

      if (isAuthenticated) {
        if (isAuthPage || isHomePage) {
          router.replace('/main/dashboard');
        }
      } else {
        if (!isAuthPage && !isHomePage) {
          router.replace('/auth/login');
        }
      }
    }
  }, [_hasHydrated, isAuthenticated, pathname, router]);

  if (!_hasHydrated) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
