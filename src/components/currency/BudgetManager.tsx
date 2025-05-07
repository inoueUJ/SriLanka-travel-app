'use client';

import React, { useState, useEffect } from 'react';
import { getBudget, setBudget, addExpense, removeExpense, getUsedBudget, getRemainingBudget } from '@/lib/storage';

export default function BudgetManager() {
  const [budget, setBudgetState] = useState(getBudget());
  const [usedBudget, setUsedBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);
  const [newBudget, setNewBudget] = useState('');
  
  // 支出記録用の状態
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('食事');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenseNote, setExpenseNote] = useState('');
  
  // 予算情報の更新
  useEffect(() => {
    setBudgetState(getBudget());
    setUsedBudget(getUsedBudget());
    setRemainingBudget(getRemainingBudget());
  }, []);
  
  // 予算を更新
  const handleUpdateBudget = () => {
    if (!newBudget.trim() || isNaN(Number(newBudget))) {
      return;
    }
    
    const updatedBudget = setBudget(Number(newBudget));
    setBudgetState(updatedBudget);
    setRemainingBudget(getRemainingBudget());
    setShowBudgetEdit(false);
    setNewBudget('');
  };
  
  // 支出を記録
  const handleAddExpense = () => {
    if (!expenseAmount.trim() || isNaN(Number(expenseAmount))) {
      return;
    }
    
    const expense = {
      amount: Number(expenseAmount),
      category: expenseCategory,
      date: expenseDate,
      note: expenseNote || undefined
    };
    
    const updatedBudget = addExpense(expense);
    setBudgetState(updatedBudget);
    setUsedBudget(getUsedBudget());
    setRemainingBudget(getRemainingBudget());
    
    // フォームをリセット
    setExpenseAmount('');
    setExpenseNote('');
    setShowExpenseForm(false);
  };
  
  // 支出を削除
  const handleRemoveExpense = (expenseId: string) => {
    const updatedBudget = removeExpense(expenseId);
    setBudgetState(updatedBudget);
    setUsedBudget(getUsedBudget());
    setRemainingBudget(getRemainingBudget());
  };
  
  // クイック支出の追加
  const handleQuickExpense = (amount: number, category: string) => {
    const expense = {
      amount,
      category,
      date: new Date().toISOString().split('T')[0],
      note: `クイック追加: ${category}`
    };
    
    const updatedBudget = addExpense(expense);
    setBudgetState(updatedBudget);
    setUsedBudget(getUsedBudget());
    setRemainingBudget(getRemainingBudget());
  };
  
  // 予算使用率の計算（パーセント）
  const budgetUsagePercent = budget.total > 0 
    ? Math.min(Math.round((usedBudget / budget.total) * 100), 100)
    : 0;
  
  return (
    <div className="space-y-6">
      {/* 予算サマリー */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">旅行予算</h2>
          <button 
            className="text-xs bg-gray-100 px-2 py-1 rounded"
            onClick={() => setShowBudgetEdit(!showBudgetEdit)}
          >
            {showBudgetEdit ? 'キャンセル' : '編集'}
          </button>
        </div>
        
        {showBudgetEdit ? (
          <div className="bg-gray-50 p-3 rounded mb-3">
            <label className="block text-sm text-gray-700 mb-1">総予算 (円)</label>
            <div className="flex">
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder={budget.total.toString()}
                className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
              />
              <button
                className="px-3 py-2 bg-[var(--tea-green)] text-white rounded-r-md"
                onClick={handleUpdateBudget}
              >
                保存
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">総予算:</span>
              <span className="font-medium">{budget.total.toLocaleString()} 円</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">支出済み:</span>
              <span className="font-medium text-[var(--spice-orange)]">{usedBudget.toLocaleString()} 円</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">残り予算:</span>
              <span className="font-medium text-[var(--tea-green)]">{remainingBudget.toLocaleString()} 円</span>
            </div>
          </>
        )}
        
        {/* 予算プログレスバー */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${remainingBudget < 0 ? 'bg-red-500' : 'bg-[var(--tea-green)]'}`}
              style={{ width: `${budgetUsagePercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>0%</span>
            <span>{budgetUsagePercent}% 使用済み</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      
      {/* 支出記録フォーム */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">支出を記録</h2>
          <button 
            className="text-xs bg-gray-100 px-2 py-1 rounded"
            onClick={() => setShowExpenseForm(!showExpenseForm)}
          >
            {showExpenseForm ? '閉じる' : '記録する'}
          </button>
        </div>
        
        {showExpenseForm && (
          <div className="bg-gray-50 p-3 rounded">
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">金額 (円)</label>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="0"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">カテゴリ</label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
              >
                <option value="食事">食事</option>
                <option value="交通">交通</option>
                <option value="宿泊">宿泊</option>
                <option value="観光">観光</option>
                <option value="お土産">お土産</option>
                <option value="その他">その他</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">日付</label>
              <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">メモ (任意)</label>
              <input
                type="text"
                value={expenseNote}
                onChange={(e) => setExpenseNote(e.target.value)}
                placeholder="何に使ったか記録"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
              />
            </div>
            
            <button
              className="w-full bg-[var(--tea-green)] text-white font-medium py-2 rounded-md"
              onClick={handleAddExpense}
            >
              保存
            </button>
          </div>
        )}
      </div>
      
      {/* よく使う支出 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">よく使う支出</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-gray-50 border rounded-md p-3 text-center hover:bg-gray-100"
            onClick={() => handleQuickExpense(1500, '食事')}
          >
            <div className="text-lg">🍽️</div>
            <div className="text-sm font-medium">食事 (1回)</div>
            <div className="text-xs text-gray-500">1,500円</div>
          </button>
          
          <button
            className="bg-gray-50 border rounded-md p-3 text-center hover:bg-gray-100"
            onClick={() => handleQuickExpense(500, '交通')}
          >
            <div className="text-lg">🚌</div>
            <div className="text-sm font-medium">移動 (バス)</div>
            <div className="text-xs text-gray-500">500円</div>
          </button>
          
          <button
            className="bg-gray-50 border rounded-md p-3 text-center hover:bg-gray-100"
            onClick={() => handleQuickExpense(6000, '宿泊')}
          >
            <div className="text-lg">🏨</div>
            <div className="text-sm font-medium">宿泊 (1泊)</div>
            <div className="text-xs text-gray-500">6,000円</div>
          </button>
          
          <button
            className="bg-gray-50 border rounded-md p-3 text-center hover:bg-gray-100"
            onClick={() => handleQuickExpense(2000, '観光')}
          >
            <div className="text-lg">🎫</div>
            <div className="text-sm font-medium">観光 (入場料)</div>
            <div className="text-xs text-gray-500">2,000円</div>
          </button>
        </div>
      </div>
      
      {/* 最近の支出 */}
      {budget.expenses.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3">最近の支出</h2>
          
          <div className="space-y-3">
            {[...budget.expenses]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5) // 最新5件
              .map(expense => (
                <div key={expense.id} className="flex items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span>
                      {expense.category === '食事' ? '🍽️' : 
                       expense.category === '交通' ? '🚌' : 
                       expense.category === '宿泊' ? '🏨' : 
                       expense.category === '観光' ? '🎫' : 
                       expense.category === 'お土産' ? '🛍️' : '💰'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {expense.note || expense.category}
                      </span>
                      <span className="text-[var(--spice-orange)] font-medium">
                        {expense.amount.toLocaleString()} 円
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{expense.category}</span>
                      <span className="flex items-center">
                        {expense.date}
                        <button
                          className="ml-2 text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveExpense(expense.id)}
                        >
                          ✕
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          {budget.expenses.length > 5 && (
            <div className="text-center mt-3">
              <button className="text-sm text-[var(--tea-green)]">
                すべて表示 ({budget.expenses.length}件)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
