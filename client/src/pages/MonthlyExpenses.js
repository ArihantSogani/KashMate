import React from 'react';
import { useNavigate } from 'react-router-dom';

function MonthlyExpenses() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-surface/20">
      {/* Left Sidebar */}
      <div className="w-64 bg-surface/80 backdrop-blur-sm border-r border-surface/30 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-surface/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">📈</span>
            </div>
            <div>
              <h2 className="font-semibold text-on-surface">Monthly</h2>
              <p className="text-xs text-on-surface-secondary">Expenses</p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="p-4 space-y-4">
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-xs text-on-surface-secondary mb-1">Status</p>
            <p className="text-lg font-bold text-yellow-400">Coming Soon</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-xs text-on-surface-secondary mb-1">Version</p>
            <p className="text-lg font-bold text-primary">1.5.0</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 mt-auto space-y-3">
          <button
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </button>
          <button
            className="w-full bg-red-500/20 text-red-400 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-red-500/30 hover:bg-red-500/30"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-surface/60 backdrop-blur-sm border-b border-surface/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-on-surface">Monthly Expense Analysis</h1>
              <p className="text-sm text-on-surface-secondary">Comprehensive monthly financial insights and reports</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-on-surface-secondary">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center py-12">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-background text-6xl">📈</span>
              </div>
              <h2 className="text-4xl font-bold text-on-surface mb-4">Monthly Analysis Coming Soon!</h2>
              <p className="text-xl text-on-surface-secondary max-w-2xl mx-auto mb-8">
                Get detailed insights into your monthly spending patterns, trends, and financial health 
                with comprehensive reports and visualizations.
              </p>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-blue-400 font-semibold">📅 Expected Release: Few Days to Go</p>
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Monthly Reports */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-blue-400 text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Monthly Reports</h3>
                    <p className="text-sm text-on-surface-secondary">Comprehensive analysis</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Detailed expense breakdown</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Income vs expense comparison</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Category-wise analysis</span>
                  </li>
                </ul>
              </div>

              {/* Trend Analysis */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-green-400 text-2xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Trend Analysis</h3>
                    <p className="text-sm text-on-surface-secondary">Spending patterns</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Monthly spending trends</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Year-over-year comparison</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Seasonal spending insights</span>
                  </li>
                </ul>
              </div>

              {/* Budget Tracking */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-purple-400 text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Budget Tracking</h3>
                    <p className="text-sm text-on-surface-secondary">Goal monitoring</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Monthly budget vs actual</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Budget variance alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Savings goal tracking</span>
                  </li>
                </ul>
              </div>

              {/* Export & Share */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-red-400 text-2xl">📤</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Export & Share</h3>
                    <p className="text-sm text-on-surface-secondary">Report sharing</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>PDF report generation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Excel data export</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Email report sharing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sample Data Preview */}
            <div className="mt-12">
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <h3 className="text-2xl font-bold text-on-surface mb-6 flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                  Sample Monthly Report Preview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-background/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">₹45,000</div>
                    <div className="text-sm text-on-surface-secondary">Total Income</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">₹32,500</div>
                    <div className="text-sm text-on-surface-secondary">Total Expenses</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">₹12,500</div>
                    <div className="text-sm text-on-surface-secondary">Net Savings</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-on-surface-secondary text-sm">
                    This is just a preview. The actual monthly analysis will include detailed charts, 
                    category breakdowns, and trend analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-8 border border-primary/30">
                <h3 className="text-2xl font-bold text-on-surface mb-4">Get Ready for Advanced Analytics!</h3>
                <p className="text-on-surface-secondary mb-6">
                  Monthly expense analysis will provide you with deep insights into your financial patterns 
                  and help you make better financial decisions.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-primary text-background px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyExpenses; 