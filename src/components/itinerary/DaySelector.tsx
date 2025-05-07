// components/itinerary/DaySelector.tsx
import React from 'react';
import { ItineraryDataType } from '@/data/itineraryData';

// 進捗率計算の関数
const calculateProgress = (dayData: any) => {
  const totalItems = dayData.items.length;
  if (totalItems === 0) return 0;
  
  const completedItems = dayData.items.filter((item: any) => item.completed).length;
  return Math.round((completedItems / totalItems) * 100);
};

interface DaySelectorProps {
  activeDay: string;
  setActiveDay: (day: string) => void;
  itineraryData: ItineraryDataType;
}

export default function DaySelector({ activeDay, setActiveDay, itineraryData }: DaySelectorProps) {
  // ローカルストレージからデータをロード
  const getSavedProgress = (dayId: string) => {
    try {
      const savedData = localStorage.getItem('srilankaItinerary');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData[dayId]) {
          return calculateProgress(parsedData[dayId]);
        }
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
    return calculateProgress(itineraryData[dayId]);
  };
  
  return (
    <div className="flex overflow-x-auto bg-gray-50 py-2 px-1 mb-4 rounded-lg shadow-sm">
      {Object.keys(itineraryData).map((dayId) => {
        const progress = getSavedProgress(dayId);
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