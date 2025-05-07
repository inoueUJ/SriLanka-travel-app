// components/itinerary/ItineraryList.tsx
import { useState } from 'react';
import { ItineraryItem } from '@/data/itineraryData';
import { sriLankaColors } from '@/lib/colors';

interface ItineraryListProps {
  items: ItineraryItem[];
  onToggleItem: (itemId: string) => void;
}

export default function ItineraryList({ items, onToggleItem }: ItineraryListProps) {
  // アニメーション用の状態
  const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);
  
  const handleToggle = (itemId: string) => {
    // アニメーション状態をセット
    setAnimatingItemId(itemId);
    
    // 短い遅延後にアイテムの状態を変更
    setTimeout(() => {
      onToggleItem(itemId);
      // アニメーション状態をリセット
      setAnimatingItemId(null);
    }, 300);
  };
  
  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => (
        <div 
          key={item.id}
          className={`py-3 flex items-start transition-colors duration-300 ${
            animatingItemId === item.id ? 'bg-primary bg-opacity-5' : ''
          }`}
        >
          <div
            className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ${
              item.completed 
                ? 'bg-primary border-0' 
                : 'border-2 border-gray-300 hover:border-primary'
            }`}
            onClick={() => handleToggle(item.id)}
          >
            {item.completed && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          
          <div className="ml-3 flex-1">
            <div className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {item.text}
            </div>
            
            {item.time && (
              <div className={`text-xs mt-1 ${item.completed ? 'text-gray-400' : 'text-primary'}`}>
                <span className="inline-block mr-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </span>
                {item.time}
              </div>
            )}
          </div>
          
          {/* 完了時のチェックマーク（モバイル用） */}
          <div 
            className={`ml-auto flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full transition-opacity duration-300 ${
              item.completed 
                ? 'opacity-100 bg-primary bg-opacity-10 text-primary' 
                : 'opacity-0'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}