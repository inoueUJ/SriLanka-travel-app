'use client';

import React from 'react';
import { Category } from '@/data/languagePhrases';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryTabs({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryTabsProps) {
  return (
    <div className="mb-5 overflow-x-auto scrollbar-none">
      <div className="flex space-x-2 p-2 bg-white rounded-lg shadow min-w-max">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              className={`px-3 py-2 rounded-full flex items-center min-w-max transition-colors duration-200 ${
                isActive
                  ? 'bg-[var(--tea-green)] text-white font-medium'
                  : 'bg-white text-gray-700 border border-[var(--tea-green)]'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <span className="mr-1">{category.icon}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
