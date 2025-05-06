'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, DollarSign, BookOpen, Map, CheckSquare, Settings } from 'lucide-react';
import { sriLankaColors } from '@/lib/colors';

type NavItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

export default function BottomNavigation() {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    {
      path: '/',
      label: 'ホーム',
      icon: <Home size={22} />,
    },
    {
      path: '/currency',
      label: '通貨',
      icon: <DollarSign size={22} />,
    },
    {
      path: '/language',
      label: '言語',
      icon: <BookOpen size={22} />,
    },
    {
      path: '/map',
      label: '観光',
      icon: <Map size={22} />,
    },
    {
      path: '/itinerary',
      label: '旅程',
      icon: <CheckSquare size={22} />,
    },
    {
      path: '/settings',
      label: '設定',
      icon: <Settings size={22} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-6">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center py-2 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
              style={{
                color: isActive ? sriLankaColors.teaGreen : undefined,
              }}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}