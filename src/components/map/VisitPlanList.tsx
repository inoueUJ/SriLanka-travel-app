'use client';

import React, { useState } from 'react';
import { TouristSpot, VisitPlan } from '@/types/tourism';
import { getTouristSpotById, removeSpotFromVisitPlan, markSpotAsVisited, addSpotToVisitPlan } from '@/lib/storage';

interface VisitPlanListProps {
  visitPlan: VisitPlan | null;
  onSelectSpot: (spot: TouristSpot) => void;
  onUpdatePlan: () => void;
}


export default function VisitPlanList({ 
  visitPlan, 
  onSelectSpot,
  onUpdatePlan
}: VisitPlanListProps) {
  const [activeTab, setActiveTab] = useState<'planned' | 'visited'>('planned');
  
  if (!visitPlan) return null;
  
  // 訪問予定のスポット情報を取得
  const plannedSpots = visitPlan.plannedSpots
    .map(plan => {
      const spot = getTouristSpotById(plan.spotId);
      if (!spot) return null;
      return { ...spot, plannedDate: plan.plannedDate };
    })
    .filter((spot)  => spot !== null);
  
  // 訪問済みのスポット情報を取得
  const visitedSpots = visitPlan.visitedSpots
    .map(visit => {
      const spot = getTouristSpotById(visit.spotId);
      if (!spot) return null;
      return { 
        ...spot, 
        visitDate: visit.visitDate,
        notes: visit.notes 
      };
    })
    .filter((spot)  => spot !== null)
    .sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()); // 最新順
  
  // 訪問予定から削除
  const handleRemove = (spotId: string) => {
    removeSpotFromVisitPlan(spotId);
    onUpdatePlan();
  };
  
  // 訪問済みに移動
  const handleMarkVisited = (spotId: string) => {
    markSpotAsVisited(spotId);
    onUpdatePlan();
  };
  
  // 訪問予定に戻す
  const handleMoveToPlanned = (spotId: string) => {
    // 訪問済みから削除して訪問予定に追加
    removeSpotFromVisitPlan(spotId);
    addSpotToVisitPlan(spotId);
    onUpdatePlan();
  };
  
  return (
    <div className="bg-white rounded-lg shadow mb-5 overflow-hidden">
      {/* タブヘッダー */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'planned' 
              ? 'border-b-2 border-[var(--tea-green)] text-[var(--tea-green)] font-medium' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('planned')}
        >
          訪問予定 ({plannedSpots.length})
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'visited' 
              ? 'border-b-2 border-[var(--tea-green)] text-[var(--tea-green)] font-medium' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('visited')}
        >
          訪問済み ({visitedSpots.length})
        </button>
      </div>
      
      {/* リスト表示 */}
      <div className="p-4">
        {activeTab === 'planned' && (
          <>
            {plannedSpots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>訪問予定のスポットはありません</p>
                <p className="text-sm mt-2">観光スポットで「訪問予定に追加」ボタンを押してください</p>
              </div>
            ) : (
              <div className="space-y-4">
                {plannedSpots.map(spot => (
                  <div 
                    key={spot.id} 
                    className="bg-gray-50 rounded-lg p-3 relative border border-gray-100"
                  >
                    <div className="flex">
                      <div 
                        className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"
                        style={{
                          backgroundImage: `url(${spot.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        onClick={() => onSelectSpot(spot)}
                      />
                      <div className="ml-3 flex-1">
                        <h3 
                          className="font-bold text-base cursor-pointer hover:text-[var(--tea-green)]"
                          onClick={() => onSelectSpot(spot)}
                        >
                          {spot.name}
                        </h3>
                        <p className="text-xs text-gray-500">{spot.location.province}</p>
                        
                        {spot.plannedDate && (
                          <p className="text-xs text-[var(--tea-green)] mt-1">
                            予定日: {spot.plannedDate}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* アクションボタン */}
                    <div className="flex gap-1 mt-2">
                      <button
                        className="flex-1 py-1 px-2 text-xs bg-[var(--ocean-blue)] text-white rounded"
                        onClick={() => handleMarkVisited(spot.id)}
                      >
                        訪問済みにする
                      </button>
                      <button
                        className="flex-1 py-1 px-2 text-xs bg-gray-200 text-gray-700 rounded"
                        onClick={() => handleRemove(spot.id)}
                      >
                        リストから削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {activeTab === 'visited' && (
          <>
            {visitedSpots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>訪問済みのスポットはありません</p>
              </div>
            ) : (
              <div className="space-y-4">
                {visitedSpots.map(spot => (
                  <div 
                    key={spot.id} 
                    className="bg-gray-50 rounded-lg p-3 relative border border-gray-100"
                  >
                    <div className="flex">
                      <div 
                        className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"
                        style={{
                          backgroundImage: `url(${spot.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        onClick={() => onSelectSpot(spot)}
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 
                            className="font-bold text-base cursor-pointer hover:text-[var(--tea-green)]"
                            onClick={() => onSelectSpot(spot)}
                          >
                            {spot.name}
                          </h3>
                          <span className="bg-[var(--spice-orange)] text-white text-xs px-2 py-0.5 rounded-full">
                            訪問済み
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{spot.location.province}</p>
                        
                        <p className="text-xs text-gray-600 mt-1">
                          訪問日: {spot.visitDate}
                        </p>
                        
                        {spot.notes && (
                          <p className="text-xs text-gray-600 mt-1">
                            メモ: {spot.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* アクションボタン */}
                    <div className="flex gap-1 mt-2">
                      <button
                        className="flex-1 py-1 px-2 text-xs bg-[var(--tea-green)] text-white rounded"
                        onClick={() => handleMoveToPlanned(spot.id)}
                      >
                        訪問予定に戻す
                      </button>
                      <button
                        className="flex-1 py-1 px-2 text-xs bg-gray-200 text-gray-700 rounded"
                        onClick={() => handleRemove(spot.id)}
                      >
                        リストから削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
