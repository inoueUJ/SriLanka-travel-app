'use client';

import React from 'react';
import { currencyInfo } from '@/lib/storage';

export default function CurrencyInfo() {
  return (
    <div className="space-y-6">
      {/* 為替レート */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">今日の為替レート</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded text-center border-l-4 border-[var(--tea-green)]">
            <p className="text-xs text-gray-500">日本円 → ルピー</p>
            <p className="font-bold">1 JPY = 2.11 LKR</p>
          </div>
          <div className="bg-gray-50 p-3 rounded text-center border-l-4 border-[var(--spice-orange)]">
            <p className="text-xs text-gray-500">ルピー → 日本円</p>
            <p className="font-bold">1 LKR = 0.47 JPY</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">日本円からルピーへの換算</span>
          </div>
          <div className="flex">
            <input 
              type="number" 
              defaultValue="1000" 
              placeholder="金額" 
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
            />
            <select className="border-l-0 border rounded-r-md px-3 py-2 bg-white focus:outline-none">
              <option>円 (JPY)</option>
              <option>ルピー (LKR)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-center my-2">
            <span className="text-gray-400">↓</span>
          </div>
          
          <div className="bg-[var(--tea-green)] bg-opacity-10 rounded-md p-3 text-center">
            <p className="text-sm text-gray-600">換算結果</p>
            <p className="text-xl font-bold">2,110 LKR</p>
          </div>
        </div>
      </div>
      
      {/* 紙幣情報 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">スリランカの紙幣</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          {currencyInfo.banknotes.map((note, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-3 rounded flex items-center"
              style={{ borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: note.color }}
            >
              <div className="w-12 h-8 bg-gray-200 rounded mr-2 flex-shrink-0">
                {/* 実際の画像がある場合はここに表示 */}
              </div>
              <div>
                <p className="font-bold">{note.value} LKR</p>
                <p className="text-xs text-gray-500">約{note.jpyValue}円</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 硬貨情報 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">スリランカの硬貨</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {currencyInfo.coins.map((coin, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-3 rounded flex items-center"
              style={{ borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: coin.color }}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex-shrink-0 flex items-center justify-center">
                {/* 実際の画像がある場合はここに表示 */}
                <span className="text-xs">{coin.value}</span>
              </div>
              <div>
                <p className="font-bold">{coin.value} LKR</p>
                <p className="text-xs text-gray-500">約{coin.jpyValue}円</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* チップ情報 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">チップの目安</h2>
        
        <div className="space-y-3">
          {currencyInfo.tippingInfo.map((tip, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-3 rounded border-l-4"
              style={{ borderLeftColor: index % 2 === 0 ? 'var(--tea-green)' : 'var(--spice-orange)' }}
            >
              <h3 className="font-bold text-sm">{tip.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
              <p className="text-xs font-medium mt-2">目安: {tip.recommended}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 支払いヒント */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">支払いヒント</h2>
        
        <ul className="space-y-2">
          {currencyInfo.paymentTips.map((tip, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-[var(--tea-green)] mr-2">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
