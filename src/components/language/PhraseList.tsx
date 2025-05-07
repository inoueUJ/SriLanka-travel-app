'use client';

import React from 'react';
import { Phrase } from '@/data/languagePhrases';
import PhraseCard from './PhraseCard';

interface PhraseListProps {
  title: string;
  phrases: Phrase[];
  icon?: string;
  showCategory?: boolean;
}

export default function PhraseList({ 
  title, 
  phrases,
  icon,
  showCategory = false
}: PhraseListProps) {
  return (
    <div>
      <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-4 shadow-sm">
        {icon && <span className="text-xl mr-2 flex-shrink-0">{icon}</span>}
        <h2 className="text-xl font-bold truncate flex-1">{title}</h2>
        <span className="text-gray-500 text-sm ml-2 flex-shrink-0">
          {phrases.length}フレーズ
        </span>
      </div>
      
      <div>
        {phrases.map(phrase => (
          <PhraseCard 
            key={phrase.id} 
            phrase={phrase} 
            categoryName={showCategory ? (phrase as any).categoryName : undefined}
          />
        ))}
      </div>
      
      {phrases.length === 0 && (
        <div className="sri-card py-8 text-center">
          <p className="text-gray-500">フレーズが見つかりません</p>
        </div>
      )}
    </div>
  );
}
