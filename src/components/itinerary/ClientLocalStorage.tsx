'use client';

import { useState, useEffect } from 'react';
import { itineraryData } from '@/data/itineraryData';

// 型定義
type ItineraryItem = {
  id: string;
  text: string;
  time?: string;
  completed: boolean;
};

type DayData = {
  title: string;
  items: ItineraryItem[];
};

type ItineraryDataType = {
  [key: string]: DayData;
};

interface ClientLocalStorageProps {
  activeDay: string;
  onDataLoaded: (data: DayData) => void;
  onProgressUpdate: (dayId: string, progress: number) => void;
  onSaveData: (newData: ItineraryDataType) => void;
}

// localStorage操作をすべて担当する専用コンポーネント
export default function ClientLocalStorage({ 
  activeDay, 
  onDataLoaded, 
  onProgressUpdate,
  onSaveData
}: ClientLocalStorageProps) {
  // 初期データの読み込み
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('srilankaItinerary');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // アクティブな日のデータをロード
        if (parsedData[activeDay]) {
          onDataLoaded(parsedData[activeDay]);
        } else {
          onDataLoaded(itineraryData[activeDay as keyof typeof itineraryData]);
        }
        
        // すべての日の進捗状況を計算して親コンポーネントに通知
        Object.keys(itineraryData).forEach(dayId => {
          if (parsedData[dayId]) {
            const dayItems = parsedData[dayId].items;
            const totalItems = dayItems.length;
            const completedItems = dayItems.filter((item: any) => item.completed).length;
            const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
            onProgressUpdate(dayId, progress);
          } else {
            onProgressUpdate(dayId, 0);
          }
        });
        
        // 全データを親コンポーネントに通知
        onSaveData(parsedData);
      } else {
        // ローカルストレージにデータがない場合はデフォルト値
        onDataLoaded(itineraryData[activeDay as keyof typeof itineraryData]);
        // すべての日の進捗を0%に設定
        Object.keys(itineraryData).forEach(dayId => {
          onProgressUpdate(dayId, 0);
        });
        onSaveData(itineraryData);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
      // エラー時はデフォルト値を使用
      onDataLoaded(itineraryData[activeDay as keyof typeof itineraryData]);
    }
  }, [activeDay, onDataLoaded, onProgressUpdate, onSaveData]);

  // 空のDIVを返す（表示要素なし）
  return null;
}

// データを保存するための専用フック
export function useSaveToLocalStorage() {
  const saveData = (data: ItineraryDataType) => {
    try {
      localStorage.setItem('srilankaItinerary', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  };
  
  return saveData;
}
