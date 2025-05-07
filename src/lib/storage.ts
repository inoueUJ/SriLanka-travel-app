// src/lib/storage.ts
import { TouristSpot, VisitPlan } from "@/types/tourism";
import touristSpotsData from "@/data/tourism/touristSpots";

// 観光スポットデータの取得
export function getTouristSpots(): TouristSpot[] {
  return touristSpotsData;
}

// IDで観光スポットを取得
export function getTouristSpotById(id: string): TouristSpot | undefined {
  return touristSpotsData.find(spot => spot.id === id);
}

// カテゴリでフィルタリングした観光スポットを取得
export function getTouristSpotsByCategory(categoryId: string): TouristSpot[] {
  if (categoryId === 'all') {
    return touristSpotsData;
  }
  
  // カテゴリIDからカテゴリ名へのマッピング
  const categoryMapping: Record<string, string> = {
    'nature': '自然',
    'temple': '寺院',
    'history': '歴史',
    'worldheritage': '世界遺産',
    'animal': '動物',
    'beach': 'ビーチ'
  };
  
  const categoryName = categoryMapping[categoryId];
  
  if (!categoryName) {
    return [];
  }
  
  return touristSpotsData.filter(spot => {
    if (categoryId === 'worldheritage') {
      return spot.isWorldHeritage;
    }
    return spot.categories.includes(categoryName);
  });
}

// 検索クエリに一致する観光スポットを取得
export function searchTouristSpots(query: string): TouristSpot[] {
  if (!query.trim()) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase();
  
  return touristSpotsData.filter(spot => 
    spot.name.toLowerCase().includes(lowerQuery) ||
    spot.nameEn.toLowerCase().includes(lowerQuery) ||
    spot.description.toLowerCase().includes(lowerQuery) ||
    spot.location.province.toLowerCase().includes(lowerQuery) ||
    spot.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
  );
}

// ユーザーの訪問計画を取得
export function getUserVisitPlan(): VisitPlan | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const storedPlan = localStorage.getItem('sri-visit-plan');
  if (!storedPlan) {
    // デフォルトの空の計画を作成
    const defaultPlan: VisitPlan = {
      userId: 'user1', // 実際の実装ではユーザー認証に基づいたIDを使用
      plannedSpots: [],
      visitedSpots: []
    };
    
    localStorage.setItem('sri-visit-plan', JSON.stringify(defaultPlan));
    return defaultPlan;
  }
  
  return JSON.parse(storedPlan);
}

// 訪問計画に観光スポットを追加
export function addSpotToVisitPlan(spotId: string, plannedDate?: string): VisitPlan | null {
  const plan = getUserVisitPlan();
  if (!plan) {
    return null;
  }
  
  // 訪問済みから削除（ステータス変更の場合）
  plan.visitedSpots = plan.visitedSpots.filter(p => p.spotId !== spotId);
  
  // すでに計画にあるか確認
  const existingIndex = plan.plannedSpots.findIndex(p => p.spotId === spotId);
  
  if (existingIndex >= 0) {
    // 既存の計画を更新
    plan.plannedSpots[existingIndex] = {
      spotId,
      plannedDate
    };
  } else {
    // 新規追加
    plan.plannedSpots.push({
      spotId,
      plannedDate
    });
  }
  
  localStorage.setItem('sri-visit-plan', JSON.stringify(plan));
  return plan;
}

// 訪問計画から観光スポットを削除
export function removeSpotFromVisitPlan(spotId: string): VisitPlan | null {
  const plan = getUserVisitPlan();
  if (!plan) {
    return null;
  }
  
  // 訪問予定から削除
  plan.plannedSpots = plan.plannedSpots.filter(p => p.spotId !== spotId);
  
  // 訪問済みからも削除
  plan.visitedSpots = plan.visitedSpots.filter(p => p.spotId !== spotId);
  
  localStorage.setItem('sri-visit-plan', JSON.stringify(plan));
  return plan;
}

// 訪問済みに観光スポットを追加
export function markSpotAsVisited(spotId: string, notes?: string): VisitPlan | null {
  const plan = getUserVisitPlan();
  if (!plan) {
    return null;
  }
  
  // 計画から削除
  plan.plannedSpots = plan.plannedSpots.filter(p => p.spotId !== spotId);
  
  // 訪問済みに追加（既に訪問済みなら上書き）
  const existingIndex = plan.visitedSpots.findIndex(p => p.spotId === spotId);
  
  const visitDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD形式
  
  if (existingIndex >= 0) {
    plan.visitedSpots[existingIndex] = {
      spotId,
      visitDate,
      notes
    };
  } else {
    plan.visitedSpots.push({
      spotId,
      visitDate,
      notes
    });
  }
  
  localStorage.setItem('sri-visit-plan', JSON.stringify(plan));
  return plan;
}

// 通貨・予算管理関連の関数

// 予算情報の型定義
export interface Budget {
  total: number;          // 総予算（円）
  expenses: Expense[];    // 支出リスト
}

// 支出の型定義
export interface Expense {
  id: string;             // 支出ID
  amount: number;         // 金額
  category: string;       // カテゴリ
  date: string;           // 日付
  note?: string;          // メモ
}

// スリランカの通貨情報
export const currencyInfo = {
  // 紙幣情報
  banknotes: [
    { value: 5000, jpyValue: 2350, color: "#7B2CBF", image: "/images/currency/5000lkr.jpg" },
    { value: 2000, jpyValue: 940, color: "#5390D9", image: "/images/currency/2000lkr.jpg" },
    { value: 1000, jpyValue: 470, color: "#2A9D8F", image: "/images/currency/1000lkr.jpg" },
    { value: 500, jpyValue: 235, color: "#E9C46A", image: "/images/currency/500lkr.jpg" },
    { value: 100, jpyValue: 47, color: "#F4A261", image: "/images/currency/100lkr.jpg" },
    { value: 50, jpyValue: 23, color: "#E76F51", image: "/images/currency/50lkr.jpg" },
    { value: 20, jpyValue: 9, color: "#D62828", image: "/images/currency/20lkr.jpg" }
  ],
  
  // 硬貨情報
  coins: [
    { value: 10, jpyValue: 4.7, color: "#B7B7A4", image: "/images/currency/10lkr.jpg" },
    { value: 5, jpyValue: 2.4, color: "#A5A58D", image: "/images/currency/5lkr.jpg" },
    { value: 2, jpyValue: 0.9, color: "#6B705C", image: "/images/currency/2lkr.jpg" },
    { value: 1, jpyValue: 0.5, color: "#3F4238", image: "/images/currency/1lkr.jpg" }
  ],
  
  // チップ情報
  tippingInfo: [
    {
      title: "レストラン",
      description: "高級店では10%が一般的。カジュアルな店では100〜200ルピー（約47〜94円）程度。ただし、多くの店ではサービス料が含まれているので確認が必要。",
      recommended: "10%または100〜200 LKR"
    },
    {
      title: "ホテル",
      description: "ポーターには荷物1つあたり100ルピー（約47円）程度。ハウスキーピングには1泊あたり100〜200ルピー（約47〜94円）が目安。",
      recommended: "ポーター: 荷物1つ100 LKR、ハウスキーピング: 1泊100〜200 LKR"
    },
    {
      title: "タクシー・トゥクトゥク",
      description: "料金を事前に交渉する場合は不要。メーター使用の場合は端数を切り上げるか、10%程度が目安。",
      recommended: "10%または50〜100 LKR"
    },
    {
      title: "ガイド・ドライバー",
      description: "1日のツアーで500〜1000ルピー（約235〜470円）が一般的。長期間の場合は日数に応じて調整。",
      recommended: "1日500〜1000 LKR"
    }
  ],
  
  // 支払いに関するヒント
  paymentTips: [
    "現金が広く使われており、特に地方では現金のみの場所が多い",
    "ホテルや高級レストランではクレジットカードが使えるが、手数料がかかる場合がある",
    "空港での両替よりも市内の両替所の方がレートが良いことが多い",
    "ATMは主要な観光地にあるが、引き出し手数料に注意（1回あたり200〜400ルピー程度）",
    "両替は公式の両替所を利用し、路上での両替は避ける",
    "スリランカから外国への通貨の持ち出しは制限されている場合がある"
  ]
};

// 予算情報を取得
export function getBudget(): Budget {
  if (typeof window === 'undefined') {
    return { total: 100000, expenses: [] };
  }
  
  const storedBudget = localStorage.getItem('sri-budget');
  if (!storedBudget) {
    // デフォルトの予算情報
    const defaultBudget: Budget = {
      total: 100000, // 10万円
      expenses: []
    };
    
    localStorage.setItem('sri-budget', JSON.stringify(defaultBudget));
    return defaultBudget;
  }
  
  return JSON.parse(storedBudget);
}

// 予算を設定
export function setBudget(total: number): Budget {
  const budget = getBudget();
  budget.total = total;
  
  localStorage.setItem('sri-budget', JSON.stringify(budget));
  return budget;
}

// 支出を追加
export function addExpense(expense: Omit<Expense, 'id'>): Budget {
  const budget = getBudget();
  
  const newExpense: Expense = {
    ...expense,
    id: Date.now().toString()
  };
  
  budget.expenses.push(newExpense);
  localStorage.setItem('sri-budget', JSON.stringify(budget));
  
  return budget;
}

// 支出を削除
export function removeExpense(expenseId: string): Budget {
  const budget = getBudget();
  
  budget.expenses = budget.expenses.filter(exp => exp.id !== expenseId);
  localStorage.setItem('sri-budget', JSON.stringify(budget));
  
  return budget;
}

// 使用済み予算を計算
export function getUsedBudget(): number {
  const budget = getBudget();
  
  return budget.expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
}

// 残りの予算を計算
export function getRemainingBudget(): number {
  const budget = getBudget();
  const used = getUsedBudget();
  
  return budget.total - used;
}
