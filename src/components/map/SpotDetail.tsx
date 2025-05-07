'use client';

import React, { useState } from 'react';
import { TouristSpot, VisitPlan } from '@/types/tourism';
import { addSpotToVisitPlan, markSpotAsVisited, removeSpotFromVisitPlan } from '@/lib/storage';

interface SpotDetailProps {
  spot: TouristSpot;
  visitPlan: VisitPlan | null;
  onBack: () => void;
  onAddToPlan: (spotId: string) => void;
}

export default function SpotDetail({ 
  spot, 
  visitPlan, 
  onBack,
  onAddToPlan
}: SpotDetailProps) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [visitNote, setVisitNote] = useState('');
  const [plannedDate, setPlannedDate] = useState('');
  
  if (!visitPlan) return null;
  
  // 訪問予定かどうかを確認
  const isPlanned = visitPlan.plannedSpots.some(p => p.spotId === spot.id) || false;
  
  // 訪問済みかどうかを確認
  const isVisited = visitPlan.visitedSpots.some(p => p.spotId === spot.id) || false;
  
  // 訪問予定に追加
  const handleAddToPlan = () => {
    if (isPlanned || isVisited) return;
    
    addSpotToVisitPlan(spot.id, plannedDate);
    onAddToPlan(spot.id);
  };
  
  // 訪問済みにマーク
  const handleMarkAsVisited = () => {
    if (isVisited) return;
    
    markSpotAsVisited(spot.id, visitNote);
    setShowNoteInput(false);
    setVisitNote('');
    onAddToPlan(spot.id);
  };
  
  // 訪問予定に戻す
  const handleMoveToPlanned = () => {
    removeSpotFromVisitPlan(spot.id);
    addSpotToVisitPlan(spot.id, plannedDate);
    onAddToPlan(spot.id);
  };
  
  // リストから完全に削除
  const handleRemoveFromList = () => {
    removeSpotFromVisitPlan(spot.id);
    onAddToPlan(spot.id);
  };
  
  // 入場料の表示形式を整える
  const formatFee = () => {
    if (spot.details.entranceFee.amount === 0) {
      return '無料';
    }
    
    const { amount, currency } = spot.details.entranceFee;
    
    if (currency === 'USD') {
      return `${amount} USD / 約${Math.round(amount * 150)}円`;
    } else if (currency === 'LKR') {
      return `${amount.toLocaleString()} LKR / 約${Math.round(amount * 0.47)}円`;
    }
    
    return `${amount} ${currency}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg mb-5 overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="relative">
        <button
          className="absolute top-4 left-4 z-10 bg-white bg-opacity-80 rounded-full p-2"
          onClick={onBack}
        >
          ←
        </button>
        
        {/* メイン画像 */}
        <div 
          className="h-48 bg-[var(--ocean-blue)]"
          style={{
            backgroundImage: `url(${spot.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {spot.isWorldHeritage && (
            <div className="absolute top-4 right-4 bg-[var(--lion-gold)] text-white text-xs px-2 py-1 rounded-full">
              世界遺産
            </div>
          )}
        </div>
      </div>
      
      {/* ステータスバッジ */}
      {(isPlanned || isVisited) && (
        <div className={`px-4 py-2 ${
          isVisited ? 'bg-[var(--spice-orange)]' : 'bg-[var(--tea-green)]'
        } text-white text-sm font-medium`}>
          {isVisited ? '訪問済み' : '訪問予定'}
        </div>
      )}
      
      {/* 基本情報 */}
      <div className="p-4">
        <h1 className="text-xl font-bold">{spot.name}</h1>
        <p className="text-sm text-gray-500">{spot.nameEn}</p>
        
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">⭐</span>
          <span className="ml-1 font-medium">{spot.rating.toFixed(1)}</span>
          <span className="ml-1 text-sm text-gray-500">({spot.reviewCount.toLocaleString()}件)</span>
        </div>
        
        <div className="flex flex-wrap mt-2 gap-1">
          {spot.categories.map((category, index) => (
            <span
              key={index}
              className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      
      {/* 情報テーブル */}
      <div className="px-4 py-2 border-t border-b border-gray-100">
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-500">入場料</span>
          <span className="text-sm font-medium">{formatFee()}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-500">営業時間</span>
          <span className="text-sm font-medium">{spot.details.openingHours}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-500">所要時間</span>
          <span className="text-sm font-medium">{spot.details.duration}</span>
        </div>
        
        <div className="flex justify-between py-2">
          <span className="text-sm text-gray-500">ベストシーズン</span>
          <span className="text-sm font-medium">{spot.details.bestTimeToVisit}</span>
        </div>
      </div>
      
      {/* 説明 */}
      <div className="p-4">
        <h2 className="font-bold mb-2">概要</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{spot.description}</p>
        
        <h2 className="font-bold mt-4 mb-2">歴史</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{spot.history}</p>
        
        <h2 className="font-bold mt-4 mb-2">アクセス</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{spot.access}</p>
        
        {spot.tips.length > 0 && (
          <>
            <h2 className="font-bold mt-4 mb-2">訪問ヒント</h2>
            <ul className="text-sm text-gray-700 leading-relaxed">
              {spot.tips.map((tip, index) => (
                <li key={index} className="mb-1 flex items-start">
                  <span className="mr-2 text-[var(--tea-green)]">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      
      {/* 訪問計画フォーム */}
      <div className="px-4 pb-4">
        {!isPlanned && !isVisited && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              訪問予定日（任意）
            </label>
            <input
              type="date"
              value={plannedDate}
              onChange={(e) => setPlannedDate(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
            />
          </div>
        )}
        
        {!isVisited && isPlanned && (
          <div className="mb-4">
            <button
              className="w-full py-2 rounded-md bg-[var(--ocean-blue)] text-white font-medium mb-2"
              onClick={() => setShowNoteInput(true)}
            >
              訪問済みにする
            </button>
            {showNoteInput && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  訪問メモ（任意）
                </label>
                <textarea
                  value={visitNote}
                  onChange={(e) => setVisitNote(e.target.value)}
                  placeholder="感想や覚えておきたいことをメモ"
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)] text-sm"
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 py-1 px-3 bg-[var(--ocean-blue)] text-white rounded-md text-sm"
                    onClick={handleMarkAsVisited}
                  >
                    確定
                  </button>
                  <button
                    className="flex-1 py-1 px-3 bg-gray-200 text-gray-700 rounded-md text-sm"
                    onClick={() => setShowNoteInput(false)}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* アクション */}
      <div className="p-4 bg-gray-50 flex gap-2">
        {!isPlanned && !isVisited && (
          <button
            className="flex-1 py-3 px-4 rounded-lg text-center font-medium bg-[var(--tea-green)] text-white"
            onClick={handleAddToPlan}
          >
            訪問予定に追加
          </button>
        )}
        
        {isPlanned && (
          <button
            className="flex-1 py-3 px-4 rounded-lg text-center font-medium bg-gray-200 text-gray-700"
            onClick={handleRemoveFromList}
          >
            リストから削除
          </button>
        )}
        
        {isVisited && (
          <>
            <button
              className="flex-1 py-3 px-4 rounded-lg text-center font-medium bg-[var(--tea-green)] text-white"
              onClick={handleMoveToPlanned}
            >
              訪問予定に戻す
            </button>
            <button
              className="flex-1 py-3 px-4 rounded-lg text-center font-medium bg-gray-200 text-gray-700"
              onClick={handleRemoveFromList}
            >
              リストから削除
            </button>
          </>
        )}
      </div>
    </div>
  );
}
