import React from 'react';
import CategoryIcon from './CategoryIcon';

function TransactionRow({ tx }) {
  if (!tx) return null;
  const { title, date, category, amount, type, paymentMode } = tx;
  const isIncome = type === 'Income';
  const formattedDate = new Date(date).toLocaleDateString('en-GB');
  
  return (
    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-surface/30 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-surface/80 rounded-lg flex items-center justify-center">
            <CategoryIcon category={category} size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-on-surface text-sm">{title}</h4>
            <div className="flex items-center space-x-2 text-xs text-on-surface-secondary">
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="capitalize">{category}</span>
              {paymentMode && (
                <>
                  <span>•</span>
                  <span className="capitalize">{paymentMode}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-bold text-lg ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
            {isIncome ? '+' : '-'}₹{amount}
          </div>
          <div className="text-xs text-on-surface-secondary capitalize">
            {isIncome ? 'Income' : 'Expense'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionRow; 