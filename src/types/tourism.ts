// src/types/tourism.ts

// 観光地情報の型定義
export interface TouristSpot {
  id: string;              // スポットID
  name: string;            // 名称
  nameEn: string;          // 英語名
  description: string;     // 概要説明
  history: string;         // 歴史的背景
  location: {              // 位置情報
    province: string;      // 州
    coordinates: {         // 座標
      lat: number;
      lng: number;
    }
  };
  images: string[];        // 画像URL配列
  thumbnail: string;       // サムネイル画像
  categories: string[];    // カテゴリ配列（自然/寺院/歴史など）
  rating: number;          // 評価（5段階）
  reviewCount: number;     // レビュー数
  details: {
    entranceFee: {         // 入場料
      amount: number;
      currency: string;
    };
    openingHours: string;  // 営業時間
    duration: string;      // 所要時間の目安
    bestTimeToVisit: string; // ベストシーズン
  };
  access: string;          // アクセス情報
  tips: string[];          // 訪問時のヒント
  isWorldHeritage: boolean; // 世界遺産かどうか
}

// ユーザーの訪問計画
export interface VisitPlan {
  userId: string;
  plannedSpots: {
    spotId: string;
    plannedDate?: string;  // 訪問予定日
  }[];
  visitedSpots: {
    spotId: string;
    visitDate: string;     // 訪問日
    notes?: string;        // メモ
  }[];
}

// カテゴリーリスト
export const CATEGORIES = [
  { id: "all", name: "すべて", icon: "🔍" },
  { id: "nature", name: "自然", icon: "🌳" },
  { id: "temple", name: "寺院", icon: "🛕" },
  { id: "history", name: "歴史", icon: "🏛️" },
  { id: "worldheritage", name: "世界遺産", icon: "🏆" },
  { id: "animal", name: "動物", icon: "🐘" },
  { id: "beach", name: "ビーチ", icon: "🏖️" }
];
