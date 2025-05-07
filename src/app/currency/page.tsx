'use client';

import { useState } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import CurrencyInfo from '@/components/currency/CurrencyInfo';
import BudgetManager from '@/components/currency/BudgetManager';

export default function CurrencyPage() {
  const [activeTab, setActiveTab] = useState<'budget' | 'currency'>('budget');
  
  return (
    <MainLayout title="通貨・予算管理" subtitle="スリランカの通貨と旅行予算">
      <div className="p-4 pb-20">
        {/* タブ切り替え */}
        <div className="flex bg-white rounded-lg shadow-sm mb-4">
          <button 
            className={`flex-1 py-3 px-2 text-center ${activeTab === 'budget' ? 'border-b-2 border-[var(--tea-green)] text-[var(--tea-green)] font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('budget')}
          >
            予算管理
          </button>
          <button 
            className={`flex-1 py-3 px-2 text-center ${activeTab === 'currency' ? 'border-b-2 border-[var(--tea-green)] text-[var(--tea-green)] font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('currency')}
          >
            通貨情報
          </button>
        </div>
        
        {/* タブコンテンツ */}
        {activeTab === 'budget' ? (
          <BudgetManager />
        ) : (
          <CurrencyInfo />
        )}
      </div>
    </MainLayout>
  );
}
