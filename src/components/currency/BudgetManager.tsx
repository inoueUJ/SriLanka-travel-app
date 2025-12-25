'use client';

import React, { useState, useEffect } from 'react';
import { getBudget, setBudget, addExpense, removeExpense, getUsedBudget, getRemainingBudget } from '@/lib/storage';

// 為替レート: 1 LKR = 約0.47円
const LKR_TO_JPY = 0.47;

export default function BudgetManager() {
  const [budget, setBudgetState] = useState(getBudget());
  const [usedBudget, setUsedBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);
  const [newBudget, setNewBudget] = useState('');

  // 支出記録用の状態
  const [expenseAmount, setExpenseAmount] = useState('');
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
  };

  // 支出を削除
  const handleRemoveExpense = (expenseId: string) => {
    const updatedBudget = removeExpense(expenseId);
    setBudgetState(updatedBudget);
    setUsedBudget(getUsedBudget());
    setRemainingBudget(getRemainingBudget());
  };

  // LKRを円に換算
  const lkrToJpy = (lkr: number) => Math.round(lkr * LKR_TO_JPY);

  // 円をLKRに換算
  const jpyToLkr = (jpy: number) => Math.round(jpy / LKR_TO_JPY);

  // 予算使用率の計算（パーセント）- LKRを円換算して計算
  const usedInJpy = lkrToJpy(usedBudget);
  const budgetUsagePercent = budget.total > 0
    ? Math.min(Math.round((usedInJpy / budget.total) * 100), 100)
    : 0;

  // 残り予算（円）
  const remainingInJpy = budget.total - usedInJpy;

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
              <div className="text-right">
                <span className="font-medium text-[var(--spice-orange)]">{usedBudget.toLocaleString()} LKR</span>
                <span className="text-xs text-gray-500 ml-1">(約{usedInJpy.toLocaleString()}円)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">残り予算:</span>
              <div className="text-right">
                <span className={`font-medium ${remainingInJpy < 0 ? 'text-red-500' : 'text-[var(--tea-green)]'}`}>
                  {remainingInJpy.toLocaleString()} 円
                </span>
                <span className="text-xs text-gray-500 ml-1">(約{jpyToLkr(Math.max(0, remainingInJpy)).toLocaleString()} LKR)</span>
              </div>
            </div>
          </>
        )}

        {/* 予算プログレスバー */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${remainingInJpy < 0 ? 'bg-red-500' : 'bg-[var(--tea-green)]'}`}
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

      {/* 支出入力フォーム */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-3">支出を記録</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">金額 (LKR)</label>
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="0"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">日付</label>
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--tea-green)]"
            />
          </div>

          <div>
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
            追加
          </button>
        </div>
      </div>

      {/* 最近の支出 */}
      {budget.expenses.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3">支出履歴</h2>

          <div className="space-y-3">
            {[...budget.expenses]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map(expense => (
                <div key={expense.id} className="flex items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span>💰</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {expense.note || '支出'}
                      </span>
                      <span className="text-[var(--spice-orange)] font-medium">
                        {expense.amount.toLocaleString()} LKR
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{expense.date}</span>
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveExpense(expense.id)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {budget.expenses.length > 10 && (
            <div className="text-center mt-3 text-sm text-gray-500">
              他 {budget.expenses.length - 10} 件の支出があります
            </div>
          )}
        </div>
      )}
    </div>
  );
}
