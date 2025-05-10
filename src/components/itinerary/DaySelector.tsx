'use client';

import React from 'react';
import { ItineraryDataType } from '@/data/itineraryData';

interface DaySelectorProps {
  activeDay: string;
  setActiveDay: (day: string) => void;
  itineraryData: ItineraryDataType;
  progressData: Record<string, number>; // 親から渡される進捗データ
}

export default function DaySelector({ activeDay, setActiveDay, itineraryData, progressData }: DaySelectorProps) {
  return (
    <div className="flex overflow-x-auto bg-gray-50 py-2 px-1 mb-4 rounded-lg shadow-sm">
      {Object.keys(itineraryData).map((dayId) => {
        const progress = progressData[dayId] || 0; // 親から渡された進捗データを使用
        const isActive = activeDay === dayId;
        
        return (
          <button
            key={dayId}
            onClick={() => setActiveDay(dayId)}
            className={`flex-shrink-0 px-4 py-2 mr-2 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center">
              <span>{dayId.replace('day', 'Day ')}</span>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-1.5 rounded-full ${
                    isActive ? 'bg-white bg-opacity-60' : 'bg-primary'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {progress}%
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}