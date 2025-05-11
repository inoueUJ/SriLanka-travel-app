'use client';

import React, { useState } from 'react';
import { Globe, Map, Languages, DollarSign, AlertTriangle, ChevronRight, ExternalLink } from 'lucide-react';
import MainLayout from '@/components/layouts/main-layout';

// 便利なアプリセクションのデータ型
interface UsefulApp {
  id: string;
  name: string;
  icon: string;
  description: string;
  url: string;
  color: string;
}

// 緊急連絡先データ型
interface EmergencyContact {
  name: string;
  number: string;
  description: string;
}

// フレーズカテゴリのデータ型
interface PhraseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}
// 便利なアプリセクションのデータ
const usefulApps = [
  {
    id: 'google-maps',
    name: 'Google マップ',
    icon: '🗺️',
    description: 'オフラインマップをダウンロードして、インターネットなしでナビゲーション',
    url: 'https://maps.google.com',
    color: 'border-l-4 border-[var(--tea-green)]'
  },
  {
    id: 'google-translate',
    name: 'Google 翻訳',
    icon: '🗣️',
    description: 'シンハラ語パックをダウンロードしてオフラインで翻訳',
    url: 'https://translate.google.com',
    color: 'border-l-4 border-[var(--ocean-blue)]'
  },
  {
    id: 'currency',
    name: '通貨換算',
    icon: '💰',
    description: 'スリランカルピー(LKR)と日本円(JPY)の換算',
    url: 'https://www.xe.com/currencyconverter/',
    color: 'border-l-4 border-[var(--spice-orange)]'
  },
  {
    id: 'maps-me',
    name: 'Maps.me',
    icon: '📍',
    description: '完全オフラインで利用できる詳細な地図アプリ',
    url: 'https://maps.me/',
    color: 'border-l-4 border-[var(--lion-gold)]'
  }
];

// 緊急連絡先データ
const emergencyContacts = [
  { name: '緊急通報', number: '119', description: '警察・救急・消防' },
  { name: '警察', number: '118 / 119', description: '緊急時' },
  { name: '観光警察', number: '+94 11 242 1451', description: '観光客向け警察サービス' },
  { name: '在スリランカ日本大使館', number: '+94 11 269 3831', description: '日本人向け領事サービス' }
];

// フレーズカテゴリのデータ
const phraseCategories = [
  { id: 'taxi-negotiation', name: 'タクシー交渉', icon: '🚖', color: 'border-l-4 border-[var(--spice-orange)]' },
  { id: 'transport-details', name: '交通詳細確認', icon: '🚂', color: 'border-l-4 border-[var(--ocean-blue)]' },
  { id: 'hotel-issues', name: 'ホテル問題解決', icon: '🏨', color: 'border-l-4 border-[var(--tea-green)]' },
  { id: 'price-negotiation', name: '料金交渉', icon: '💰', color: 'border-l-4 border-[var(--lion-gold)]' }
];

// 通貨換算機能
const CurrencyConverter = () => {
  const [jpyAmount, setJpyAmount] = useState(1000);
  const [lkrAmount, setLkrAmount] = useState(2110);
  const exchRate = 2.11; // 1 JPY = 2.11 LKR
  
  // 円→ルピー変換
// 円→ルピー変換
const handleJpyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const amount = Number(e.target.value);
  setJpyAmount(amount);
  setLkrAmount(Number((amount * exchRate).toFixed(2)));
};

// ルピー→円変換
const handleLkrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const amount = Number(e.target.value);
  setLkrAmount(amount);
  setJpyAmount(Number((amount / exchRate).toFixed(2)));
};
  
  return (
    <div className="sri-card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">通貨換算ツール</h3>
        <span className="text-[var(--spice-orange)]">リアルタイム</span>
      </div>
      
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">日本円 (JPY)</label>
        <div className="flex">
          <input
            type="number"
            value={jpyAmount}
            onChange={handleJpyChange}
            className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
          />
          <span className="border-l-0 border rounded-r-md px-3 py-2 bg-white">円</span>
        </div>
      </div>
      
      <div className="flex justify-center my-2">
        <span className="text-gray-400">↓</span>
      </div>
      
      <div>
        <label className="block text-xs text-gray-600 mb-1">スリランカルピー (LKR)</label>
        <div className="flex">
          <input
            type="number"
            value={lkrAmount}
            onChange={handleLkrChange}
            className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
          />
          <span className="border-l-0 border rounded-r-md px-3 py-2 bg-white">LKR</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <MainLayout>
      <div className="p-4">
        {/* ウェルカムカード */}
        <div className="sri-gradient rounded-lg p-4 mb-4 shadow">
          <h2 className="text-xl font-bold mb-2">アーユボーワン！</h2>
          <p>スリランカ旅行オフラインガイドへようこそ</p>
          <p className="text-sm mt-2 opacity-80">5/12-5/16の旅程をサポートします</p>
        </div>
        
        {/* クイックアクセス */}
        <div className="grid grid-cols-2 gap-3 my-4">
          {[
            { title: '通貨情報', icon: '💰', href: '/currency', color: 'border-l-4 border-[var(--spice-orange)]' },
            { title: '言語フレーズ', icon: '🗣️', href: '/language', color: 'border-l-4 border-[var(--ocean-blue)]' },
            { title: '観光スポット', icon: '🗺️', href: '/map', color: 'border-l-4 border-[var(--tea-green)]' },
            { title: '旅程チェック', icon: '✅', href: '/itinerary', color: 'border-l-4 border-[var(--lion-gold)]' },
          ].map((item, index) => (
            <a 
              key={index} 
              href={item.href}
              className={`bg-white rounded-lg p-3 shadow flex flex-col items-center ${item.color}`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-center font-medium">{item.title}</div>
            </a>
          ))}
        </div>
        
        {/* 為替レート */}
        <div className="sri-card mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">今日の為替レート</h3>
            <span className="text-[var(--spice-orange)]">更新済</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="bg-gray-100 p-2 rounded flex-1 text-center mr-2 border-l-4 border-[var(--tea-green)]">
              <div className="text-xs text-gray-600">日本円 → ルピー</div>
              <div className="font-bold">1 JPY = 2.11 LKR</div>
            </div>
            <div className="bg-gray-100 p-2 rounded flex-1 text-center border-l-4 border-[var(--spice-orange)]">
              <div className="text-xs text-gray-600">ルピー → 日本円</div>
              <div className="font-bold">1 LKR = 0.47 JPY</div>
            </div>
          </div>
        </div>
        
        {/* 便利なアプリセクション */}
        <div className="mb-4">
          <button 
            onClick={() => toggleSection('apps')}
            className="w-full flex justify-between items-center bg-white rounded-lg p-3 shadow"
          >
            <div className="flex items-center">
              <Globe size={20} className="text-[var(--tea-green)] mr-2" />
              <h3 className="font-bold">便利なアプリリンク</h3>
            </div>
            <ChevronRight 
              size={20} 
              className={`text-gray-400 transition-transform ${expandedSection === 'apps' ? 'rotate-90' : ''}`} 
            />
          </button>
          
          {expandedSection === 'apps' && (
            <div className="mt-2 grid grid-cols-2 gap-3">
              {usefulApps.map(app => (
                <a 
                  key={app.id} 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-white rounded-lg p-3 shadow flex flex-col ${app.color}`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">{app.icon}</span>
                    <span className="font-medium">{app.name}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {app.description}
                  </p>
                  <div className="mt-2 text-right">
                    <ExternalLink size={14} className="text-gray-400 inline-block" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        
        {/* フレーズ集セクション */}
        <div className="mb-4">
          <button 
            onClick={() => toggleSection('phrases')}
            className="w-full flex justify-between items-center bg-white rounded-lg p-3 shadow"
          >
            <div className="flex items-center">
              <Languages size={20} className="text-[var(--ocean-blue)] mr-2" />
              <h3 className="font-bold">便利なフレーズ集</h3>
            </div>
            <ChevronRight 
              size={20} 
              className={`text-gray-400 transition-transform ${expandedSection === 'phrases' ? 'rotate-90' : ''}`} 
            />
          </button>
          
          {expandedSection === 'phrases' && (
            <div className="mt-2 grid grid-cols-2 gap-3">
              {phraseCategories.map(category => (
                <a 
                  key={category.id} 
                  href={`/language?category=${category.id}`} 
                  className={`bg-white rounded-lg p-3 shadow flex flex-col ${category.color}`}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-xl mr-2">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="mt-auto text-right">
                    <ChevronRight size={14} className="text-gray-400 inline-block" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        
        {/* 通貨換算ツール */}
        <button 
          onClick={() => toggleSection('currency')}
          className="w-full flex justify-between items-center bg-white rounded-lg p-3 shadow mb-4"
        >
          <div className="flex items-center">
            <DollarSign size={20} className="text-[var(--spice-orange)] mr-2" />
            <h3 className="font-bold">通貨換算ツール</h3>
          </div>
          <ChevronRight 
            size={20} 
            className={`text-gray-400 transition-transform ${expandedSection === 'currency' ? 'rotate-90' : ''}`} 
          />
        </button>
        
        {expandedSection === 'currency' && (
          <div className="mb-4">
            <CurrencyConverter />
          </div>
        )}
        
        {/* 緊急連絡先セクション */}
        <div className="mb-4">
          <button 
            onClick={() => toggleSection('emergency')}
            className="w-full flex justify-between items-center bg-white rounded-lg p-3 shadow"
          >
            <div className="flex items-center">
              <AlertTriangle size={20} className="text-red-600 mr-2" />
              <h3 className="font-bold">緊急連絡先</h3>
            </div>
            <ChevronRight 
              size={20} 
              className={`text-gray-400 transition-transform ${expandedSection === 'emergency' ? 'rotate-90' : ''}`} 
            />
          </button>
          
          {expandedSection === 'emergency' && (
            <div className="mt-2 bg-white rounded-lg p-3 shadow">
              {emergencyContacts.map((contact, index) => (
                <div 
                  key={index} 
                  className={`py-2 ${index < emergencyContacts.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{contact.name}</span>
                    <a 
                      href={`tel:${contact.number.replace(/\s/g, '')}`} 
                      className="text-[var(--tea-green)] font-medium"
                    >
                      {contact.number}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{contact.description}</p>
                </div>
              ))}
              <div className="mt-3 text-xs text-gray-500 text-center">
                すべての緊急連絡先はオフラインでもアクセスできます
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}