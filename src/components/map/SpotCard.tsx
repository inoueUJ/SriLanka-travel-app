'use client';

import React from 'react';
import { TouristSpot } from '@/types/tourism';

interface SpotCardProps {
  spot: TouristSpot;
  onSelect: (spot: TouristSpot) => void;
}

export default function SpotCard({ spot, onSelect }: SpotCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow mb-4 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onSelect(spot)}
    >
      <div className="flex">
        {/* サムネイル */}
        <div 
          className="w-24 h-24 bg-gray-200 flex-shrink-0"
          style={{
            backgroundImage: `url(${spot.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* 情報 */}
        <div className="p-3 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg leading-tight">{spot.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1">{spot.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            {spot.location.province} • {spot.isWorldHeritage ? '世界遺産' : ''}
          </p>
          
          <p className="text-sm mt-2 line-clamp-2 text-gray-700">
            {spot.description.slice(0, 60)}...
          </p>
          
          {/* カテゴリータグ */}
          <div className="flex flex-wrap mt-2 gap-1">
            {spot.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700"
              >
                {category}
              </span>
            ))}
            {spot.categories.length > 2 && (
              <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                +{spot.categories.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
