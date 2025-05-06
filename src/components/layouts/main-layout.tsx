// components/layouts/main-layout.tsx
import React from 'react';
import Header from '../ui/header';
import BottomNavigation from '../ui/bottom-navigation';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function MainLayout({ 
  children, 
  title,
  subtitle
}: MainLayoutProps) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-gray-100">
      <Header title={title} subtitle={subtitle} />
      
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      
      <BottomNavigation />
    </div>
  );
}