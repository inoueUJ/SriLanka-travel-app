'use client';

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
}

export default function SearchBar({ 
  value, 
  onChange, 
  onSearch 
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-2">フレーズを検索</h2>
        
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="日本語、英語、シンハラ語で検索..."
            className="w-full py-2 px-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--tea-green)]"
          />
          
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[var(--tea-green)] text-white rounded-full"
            aria-label="検索"
          >
            <span className="text-sm">🔍</span>
          </button>
        </div>
      </div>
    </form>
  );
}
