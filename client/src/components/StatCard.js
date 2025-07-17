import React from 'react';

function StatCard({ label, amount, colorClass = '', icon = null }) {
  return (
    <div className={`bg-surface rounded-lg shadow-md p-6 flex flex-col items-center ${colorClass}`}>
      {icon && <div className="mb-2">{icon}</div>}
      <h2 className="text-lg font-semibold mb-1">{label}</h2>
      <div className="text-2xl font-bold">₹{amount}</div>
    </div>
  );
}

export default StatCard; 