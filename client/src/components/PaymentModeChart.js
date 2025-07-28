import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Define a color palette for payment modes
const COLORS = [
  '#34d399', // green
  '#f87171', // red
  '#60a5fa', // blue
  '#fbbf24', // yellow
  '#a78bfa', // purple
  '#f472b6', // pink
  '#38bdf8', // sky
  '#fb7185', // rose
  '#facc15', // amber
  '#4ade80', // emerald
];

function PaymentModeChart({ data = [], total = 0 }) {
  // Clean and assign colors to payment modes
  const chartData = data.map((item, idx) => ({
    ...item,
    paymentMode: item.paymentMode || 'Cash', // Handle null/undefined values
    color: COLORS[idx % COLORS.length]
  }));

  if (!total || total <= 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-4xl mb-2">💳</div>
          <p className="text-on-surface-secondary text-sm">No payment data yet</p>
          <p className="text-xs text-on-surface-secondary">Add transactions to see payment breakdown</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Left Side - Chart */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="paymentMode"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                isAnimationActive={true}
                label={false}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Total Display */}
        <div className="text-center mt-2">
          <p className="text-xs text-on-surface-secondary">Total Spent</p>
          <p className="text-lg font-bold text-red-400">₹{total}</p>
        </div>
      </div>
      
      {/* Right Side - Legend */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="space-y-1 max-h-full overflow-y-auto pr-1">
          {chartData.map((item, idx) => (
            <div key={item.paymentMode} className="flex items-center justify-between p-1.5 bg-background/30 rounded text-xs">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="font-medium text-on-surface truncate">{item.paymentMode}</span>
              </div>
              <span className="text-on-surface-secondary font-semibold ml-1 flex-shrink-0">{item.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentModeChart;
