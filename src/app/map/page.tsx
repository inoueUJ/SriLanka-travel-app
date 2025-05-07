'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import SpotList from '@/components/map/SpotList';
import SpotDetail from '@/components/map/SpotDetail';
import CategoryFilter from '@/components/map/CategoryFilter';
import SearchBar from '@/components/map/SearchBar';
import FeaturedSpots from '@/components/map/FeaturedSpots';
import VisitPlanList from '@/components/map/VisitPlanList';
import { 
  getTouristSpots, 
  getTouristSpotsByCategory, 
  searchTouristSpots, 
  getUserVisitPlan 
} from '@/lib/storage';
import { TouristSpot } from '@/types/tourism';

export default function MapPage() {
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [visitPlan, setVisitPlan] = useState(getUserVisitPlan());
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<TouristSpot[]>([]);
  const [showVisitPlan, setShowVisitPlan] = useState(false);
  
  // 初期データロード
  useEffect(() => {
    setSpots(getTouristSpots());
  }, []);
  
  // カテゴリー変更時の処理
  useEffect(() => {
    if (isSearching) return;
    
    setSpots(getTouristSpotsByCategory(selectedCategory));
  }, [selectedCategory, isSearching]);
  
  // 検索処理
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSpots(getTouristSpotsByCategory(selectedCategory));
      return;
    }
    
    const results = searchTouristSpots(query);
    setSearchResults(results);
    setIsSearching(true);
  };
  
  // 検索クリア
  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSpots(getTouristSpotsByCategory(selectedCategory));
  };
  
  // スポットが追加/削除された時に訪問計画を更新
  const handleUpdatePlan = () => {
    setVisitPlan(getUserVisitPlan());
  };
  
  // 訪問予定一覧の表示切替
  const toggleVisitPlan = () => {
    setShowVisitPlan(!showVisitPlan);
  };
  
  // 注目スポット（評価が高いもの）
  const featuredSpots = spots.filter(spot => spot.rating >= 4.8).slice(0, 3);
  
  // 表示するスポットリスト
  const displaySpots = isSearching ? searchResults : spots;
  
  return (
    <MainLayout title="観光地情報" subtitle="スリランカの魅力的なスポット">
      <div className="p-4 pb-20">
        {/* 検索バー */}
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          onSearch={handleSearch} 
        />
        
        {/* 訪問プラン切替ボタン */}
        <div className="mb-4">
          <button
            className={`w-full py-2 rounded-lg flex items-center justify-center ${
              showVisitPlan 
                ? 'bg-[var(--tea-green)] text-white' 
                : 'bg-white text-[var(--tea-green)] border border-[var(--tea-green)]'
            }`}
            onClick={toggleVisitPlan}
          >
            <span className="mr-2">{showVisitPlan ? '観光スポット一覧に戻る' : '訪問予定リストを表示'}</span>
            <span>{showVisitPlan ? '🗺️' : '📋'}</span>
          </button>
        </div>
        
        {/* 訪問プラン表示 */}
        {showVisitPlan && (
          <VisitPlanList
            visitPlan={visitPlan}
            onSelectSpot={setSelectedSpot}
            onUpdatePlan={handleUpdatePlan}
          />
        )}
        
        {/* スポット詳細表示時は他の要素を非表示 */}
        {selectedSpot ? (
          <SpotDetail 
            spot={selectedSpot}
            visitPlan={visitPlan}
            onBack={() => setSelectedSpot(null)}
            onAddToPlan={handleUpdatePlan}
          />
        ) : (
          !showVisitPlan && (
            <>
              {/* 検索中はカテゴリーフィルターを非表示 */}
              {!isSearching && (
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              )}
              
              {/* 検索中は検索結果、それ以外は通常表示 */}
              {isSearching ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">検索結果: {searchResults.length}件</h2>
                    <button 
                      className="text-sm bg-gray-200 px-3 py-1 rounded-full"
                      onClick={handleClearSearch}
                    >
                      検索をクリア
                    </button>
                  </div>
                  
                  <SpotList 
                    spots={searchResults}
                    onSelect={setSelectedSpot}
                  />
                </>
              ) : (
                <>
                  {/* 注目スポット（カルーセル） */}
                  {featuredSpots.length > 0 && (
                    <FeaturedSpots 
                      spots={featuredSpots}
                      onSelect={setSelectedSpot}
                    />
                  )}
                  
                  {/* スポットリスト */}
                  <SpotList 
                    spots={displaySpots}
                    onSelect={setSelectedSpot}
                  />
                </>
              )}
            </>
          )
        )}
      </div>
    </MainLayout>
  );
}
