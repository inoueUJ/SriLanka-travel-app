'use client';

import React from 'react';
import { TouristSpot } from '@/types/tourism';
import SpotCard from './SpotCard';

interface SpotListProps {
  spots: TouristSpot[];
  onSelect: (spot: TouristSpot) => void;
}

export default function SpotList({ spots, onSelect }: SpotListProps) {
  if (!spots.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 mb-2">該当する観光地が見つかりませんでした</p>
        <p className="text-sm text-gray-400">別のカテゴリーで探してみてください</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-lg font-bold mb-3">観光スポット一覧</h2>
      <div className="space-y-1">
        {spots.map(spot => (
          <SpotCard 
            key={spot.id} 
            spot={spot} 
            onSelect={onSelect} 
          />
        ))}
      </div>
    </div>
  );
}
