import React from 'react';
import CategoryIcon from './CategoryIcon';

function TransactionRow({ tx }) {
  if (!tx) return null;
  const { title, date, category, amount, type } = tx;
  const isIncome = type === 'Income';
  const formattedDate = new Date(date).toLocaleDateString('en-GB');
  return (
    <div className={`bg-surface rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between border-l-4 mb-2 ${isIncome ? 'border-green-400' : 'border-red-400'}`}>
      <div className="flex items-center gap-3">
        <CategoryIcon category={category} size={28} />
        <span className="font-bold text-on-surface">{title}</span>
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <span className={isIncome ? 'text-green-400' : 'text-red-400'}>
          {isIncome ? '+' : '-'}₹{amount}
        </span>
        <span className="text-on-surface-secondary text-sm">{formattedDate}</span>
        <span className="text-on-surface-secondary text-sm">{category}</span>
      </div>
    </div>
  );
}

export default TransactionRow; 