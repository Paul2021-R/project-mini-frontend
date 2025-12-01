'use client';

import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/chat': 'Chat History',
  '/dashboard/materials': 'Materials',
  '/dashboard/settings': 'Settings',
  '/profile': 'My Profile',
};

export function PageTitle() {
  const pathname = usePathname();

  // Simple matching or fallback
  const title = titles[pathname] || 'Dashboard';

  return <div className="text-3xl font-bold tracking-tight">{title}</div>;
}
