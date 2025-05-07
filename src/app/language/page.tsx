'use client';

import { useState } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import CategoryTabs from '@/components/language/CategoryTabs';
import PhraseList from '@/components/language/PhraseList';
import SearchBar from '@/components/language/SearchBar';
import languagePhrases from '@/data/languagePhrases';

export default function LanguagePage() {
  const [selectedCategory, setSelectedCategory] = useState(languagePhrases.categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 選択されたカテゴリに基づいてフレーズをフィルタリングする
  const categoryData = languagePhrases.categories.find(c => c.id === selectedCategory);

  // 検索処理
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = languagePhrases.categories.flatMap(category => 
      category.phrases.filter(phrase => 
        phrase.japanese.toLowerCase().includes(lowerQuery) ||
        phrase.english.toLowerCase().includes(lowerQuery) ||
        phrase.sinhala.toLowerCase().includes(lowerQuery) ||
        phrase.pronunciation.toLowerCase().includes(lowerQuery)
      ).map(phrase => ({
        ...phrase,
        categoryId: category.id,
        categoryName: category.name
      }))
    );

    setSearchResults(results);
    setIsSearching(true);
  };

  // 検索クリア
  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <MainLayout title="言語フレーズ" subtitle="シンハラ語の便利な表現">
      <div className="p-4 pb-24">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          onSearch={handleSearch} 
        />
        
        {!isSearching && (
          <>
            <CategoryTabs 
              categories={languagePhrases.categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            
            {categoryData && (
              <PhraseList
                title={categoryData.name}
                phrases={categoryData.phrases}
                icon={categoryData.icon}
              />
            )}
          </>
        )}
        
        {isSearching && (
          <div>
            <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow">
              <h2 className="text-lg font-bold">検索結果: {searchResults.length}件</h2>
              <button 
                className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
                onClick={handleClearSearch}
              >
                検索をクリア
              </button>
            </div>
            
            {searchResults.length > 0 ? (
              <PhraseList
                title="検索結果"
                phrases={searchResults}
                showCategory={true}
              />
            ) : (
              <div className="sri-card text-center py-8">
                <p>「{searchQuery}」に一致するフレーズが見つかりませんでした。</p>
                <p className="text-sm text-gray-500 mt-2">別のキーワードで検索してみてください。</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
