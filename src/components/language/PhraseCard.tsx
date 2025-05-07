'use client';

import React, { useState } from 'react';
import { Phrase } from '@/data/languagePhrases';

interface PhraseCardProps {
  phrase: Phrase;
  categoryName?: string;
}

export default function PhraseCard({ phrase, categoryName }: PhraseCardProps) {
  const [copied, setCopied] = useState(false);
  
  // フレーズをクリップボードにコピー
  const handleCopy = () => {
    // 3言語すべてをコピー
    const textToCopy = `${phrase.japanese}\n${phrase.english}\n${phrase.sinhala}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      
      // コピー通知を3秒後に消す
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-4 relative transition-all duration-200 active:bg-gray-50 active:shadow-md"
      onClick={handleCopy}
    >
      {/* コピー通知オーバーレイ */}
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg text-white z-10">
          <div className="px-4 py-2 bg-[var(--tea-green)] rounded-md shadow-lg">
            コピーしました！
          </div>
        </div>
      )}
      
      {/* カテゴリ名（検索結果でのみ表示） */}
      {categoryName && (
        <div className="text-xs bg-[var(--tea-green)] text-white inline-block px-2 py-0.5 rounded mb-2">
          {categoryName}
        </div>
      )}
      
      {/* 日本語 */}
      <h3 className="font-bold text-lg text-[var(--textDark)]">
        {phrase.japanese}
      </h3>
      
      {/* 英語 */}
      <p className="text-gray-600 mt-1">
        {phrase.english}
      </p>
      
      {/* シンハラ語 */}
      <p className="text-gray-800 mt-2 font-medium">
        {phrase.sinhala}
      </p>
      
      {/* カタカナ発音 */}
      <p className="text-gray-500 italic text-sm mt-1">
        {phrase.pronunciation}
      </p>
      
      {/* タップヒント */}
      <div className="flex justify-center items-center mt-3 py-1 bg-gray-50 rounded text-xs text-gray-500">
        <span className="mr-1">👆</span>
        <span>タップしてコピー</span>
      </div>
    </div>
  );
}
