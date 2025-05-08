'use client';

import React, { useState, useEffect } from 'react';
import { TouristSpot } from '@/types/tourism';

interface FeaturedSpotsProps {
  spots: TouristSpot[];
  onSelect: (spot: TouristSpot) => void;
}

export default function FeaturedSpots({ spots, onSelect }: FeaturedSpotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // スポットが変更されたらアクティブインデックスをリセット
  useEffect(() => {
    setActiveIndex(0);
  }, [spots]);
  
  // 自動スライドショー
  useEffect(() => {
    if (spots.length <= 1) return;
    
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % spots.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [spots]);
  
  if (!spots.length) return null;
  
  const featuredSpots = spots.slice(0, Math.min(5, spots.length));
  
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold mb-3">注目スポット</h2>
      
      <div className="relative bg-white rounded-lg shadow overflow-hidden">
        {/* スライダーコンテンツ */}
        <div className="h-48 relative">
          {featuredSpots.map((spot, index) => (
            <div
              key={spot.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => onSelect(spot)}
            >
              {/* 背景は実際の画像に置き換えられます（仮のスタイル） */}
              <div 
                className="h-full w-full bg-[var(--ocean-blue)]"
                style={{
                  backgroundImage: spot.images && spot.images.length > 0 ? `url(${spot.images[0]})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">{spot.name}</h3>
                  <p className="text-white text-sm opacity-90">{spot.categories.join(' • ')}</p>
                  
                  {spot.isWorldHeritage && (
                    <div className="absolute top-4 right-4 bg-[var(--lion-gold)] text-white text-xs px-2 py-1 rounded-full">
                      世界遺産
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* ナビゲーションドット */}
        {featuredSpots.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {featuredSpots.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
