import React from 'react';

function StatCard({ label, amount, colorClass = '', icon = null }) {
  return (
    <div className={`bg-surface rounded-lg shadow-md p-3 flex flex-col items-center ${colorClass}`}>
      {icon && <div className="mb-1">{icon}</div>}
      <h2 className="text-sm font-semibold mb-1">{label}</h2>
      <div className="text-lg font-bold">₹{amount}</div>
    </div>
  );
}

export default StatCard; 