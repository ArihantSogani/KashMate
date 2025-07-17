import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Define a color palette for categories
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

function ExpenseChart({ data = [], total = 0 }) {
  // Assign a color to each category
  const chartData = data.map((item, idx) => ({ ...item, color: COLORS[idx % COLORS.length] }));

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
      {/* Donut Chart */}
      <ResponsiveContainer width={220} height={220}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
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
      {/* Center label for total spent */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-center">
        <div className="text-lg font-semibold text-on-surface-secondary">Total Spent</div>
        <div className="text-2xl font-bold text-red-400">₹{total}</div>
      </div>
      {/* Legend */}
      <div className="flex flex-col gap-2">
        {chartData.map((item, idx) => (
          <div key={item.category} className="flex items-center gap-3">
            <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className="font-medium text-on-surface">{item.category}</span>
            <span className="text-on-surface-secondary text-sm">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseChart; 