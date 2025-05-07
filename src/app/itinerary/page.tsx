'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import DaySelector from '@/components/itinerary/DaySelector';
import ItineraryList from '@/components/itinerary/ItineraryList';
import { itineraryData } from '@/data/itineraryData';

export default function ItineraryPage() {
  const [activeDay, setActiveDay] = useState('day1');
  const [dayData, setDayData] = useState(itineraryData.day1);
  const [showFullScreen, setShowFullScreen] = useState(false);
  
  // アクティブな日付が変更されたとき、対応するデータをセット
  useEffect(() => {
    // ローカルストレージからデータをロード
    const savedData = localStorage.getItem('srilankaItinerary');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setDayData(parsedData[activeDay] || itineraryData[activeDay as keyof typeof itineraryData]);
    } else {
      setDayData(itineraryData[activeDay as keyof typeof itineraryData]);
    }
  }, [activeDay]);
  
  // データの更新関数
  const handleToggleItem = (itemId: string) => {
    const updatedItems = dayData.items.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    const updatedDayData = { ...dayData, items: updatedItems };
    setDayData(updatedDayData);
    
    // ローカルストレージに保存
    const savedData = localStorage.getItem('srilankaItinerary');
    const parsedData = savedData ? JSON.parse(savedData) : { ...itineraryData };
    const updatedItineraryData = { ...parsedData, [activeDay]: updatedDayData };
    localStorage.setItem('srilankaItinerary', JSON.stringify(updatedItineraryData));
  };
  
  // 進行中または次のタスクを取得
  const getNextTask = () => {
    const incompleteItems = dayData.items.filter(item => !item.completed);
    return incompleteItems.length > 0 ? incompleteItems[0] : null;
  };
  
  // シンハラ語の翻訳（簡易版）
  const getTranslation = (text: string) => {
    // シンプルな翻訳マッピング
    const translations: Record<string, string> = {
      'シギリアロック観光': 'Sigiriya Gala balanna',
      'ローカルレストランでランチ': 'Local Restaurant eke dahawala kanna',
      'カンダラマホテルに戻る': 'Kandalama Hotel ekata yanna',
      '紅茶畑散策': 'Tea waththa balanna',
      'ナヌオヤ駅へ移動': 'Nanu Oya station ekata yanna',
      '高原列車でエッラへ': 'Ella yanna hill train eken',
      'ナインアーチブリッジ見学': 'Nine Arch Bridge balanna',
      // 他の訳も必要に応じて追加
    };
    
    return translations[text] || 'Meheta yanna one. (ここに行きたいです)';
  };
  
  // 現在の進捗率を計算
  const calculateProgress = () => {
    const totalItems = dayData.items.length;
    if (totalItems === 0) return 0;
    
    const completedItems = dayData.items.filter(item => item.completed).length;
    return Math.round((completedItems / totalItems) * 100);
  };
  
  const nextTask = getNextTask();
  const progress = calculateProgress();
  
  return (
    <MainLayout title="旅程管理" subtitle="4泊5日のスケジュール">
      <div className="p-4">
        {/* Day選択タブ - デザイン改善 */}
        <DaySelector 
          activeDay={activeDay} 
          setActiveDay={setActiveDay}
          itineraryData={itineraryData}
        />
        
        {/* 旅程カード */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          {/* カードヘッダー - スリランカテーマカラー */}
          <div className="bg-gradient-to-r from-primary to-ocean p-4 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-full opacity-20 bg-sri-pattern"></div>
            <div className="flex justify-between items-center text-gray-800">
              <h2 className="text-lg font-bold">{dayData.title}</h2>
              <div className="bg-white bg-opacity-30 text-white px-2 py-1 rounded-full text-xs">
                <h2 className='text-gray-800'></h2>
                {progress}% 完了
              </div>
            </div>
            
          </div>
          
          {/* 旅程リスト - チェックボックス付き */}
          <div className="p-4">
            <ItineraryList 
              items={dayData.items} 
              onToggleItem={handleToggleItem} 
            />
          </div>
        </div>
        
        {/* 現地の人に見せるカード - 改善版 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="bg-accent p-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <h3 className="font-bold text-gray-900">現地の人に見せる</h3>
          </div>
          
          <div className="p-4">
            {nextTask ? (
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-3 border-b">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">次の予定：</span>
                    {nextTask.time && (
                      <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                        {nextTask.time}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-medium mt-1">{nextTask.text}</p>
                </div>
                
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700">シンハラ語:</p>
                  <p className="text-lg mt-1">{getTranslation(nextTask.text)}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-lg">今日の予定はすべて完了しました！</p>
                <p className="text-sm text-gray-500 mt-1">Ada siyalu welawa iwara!</p>
              </div>
            )}
            
            <button 
              onClick={() => setShowFullScreen(true)}
              className="mt-4 w-full bg-accent hover:bg-accent-light transition-colors duration-200 text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center"
            >
              <span className="mr-2">現地の人に見せる</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6"></path>
                <path d="M10 14L21 3"></path>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* 進捗サマリー */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-secondary to-accent p-3 text-gray-900">
            <h3 className="font-bold">旅程の進捗状況</h3>
          </div>
          
          <div className="p-4">
            {Object.keys(itineraryData).map((dayId) => {
              // 進捗率計算
              const savedData = localStorage.getItem('srilankaItinerary');
              let dayProgress = 0;
              
              if (savedData) {
                const parsedData = JSON.parse(savedData);
                if (parsedData[dayId]) {
                  const dayItems = parsedData[dayId].items;
                  const totalItems = dayItems.length;
                  const completedItems = dayItems.filter((item: any) => item.completed).length;
                  dayProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
                }
              }
              
              const isActiveDay = activeDay === dayId;
              
              return (
                <div key={dayId} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span className={`font-medium ${isActiveDay ? 'text-primary' : ''}`}>
                      {dayId.replace('day', 'Day ')}
                    </span>
                    <span>{dayProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${dayProgress}%`,
                        backgroundColor: 
                          dayProgress >= 100 ? '#0D7340' :
                          dayProgress >= 75 ? '#1A9DAB' :
                          dayProgress >= 50 ? '#F18F01' :
                          dayProgress >= 25 ? '#FFC40C' : '#F18F01'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* フルスクリーン表示モード */}
      {showFullScreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-8"
          onClick={() => setShowFullScreen(false)}
        >
          <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden">
            <div className="bg-accent p-4 text-center">
              <h3 className="text-xl font-bold text-gray-900">次の予定</h3>
              <p className="text-sm text-gray-800">Next Destination</p>
            </div>
            
            <div className="p-6 text-center">
              {nextTask ? (
                <>
                  <p className="text-2xl font-bold mb-3 text-gray-900">{nextTask.text}</p>
                  <p className="text-lg mb-6 text-gray-700">{getTranslation(nextTask.text)}</p>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500">
                      これを運転手やガイドに見せてください
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Please show this to your driver or guide
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-xl text-gray-700 py-8">
                  今日の予定はすべて完了しました！
                </p>
              )}
            </div>
          </div>
          
          <button 
            className="mt-8 bg-white bg-opacity-20 text-white px-6 py-2 rounded-full"
            onClick={() => setShowFullScreen(false)}
          >
            閉じる (Close)
          </button>
        </div>
      )}
    </MainLayout>
  );
}