import React from 'react';
import { useNavigate } from 'react-router-dom';

function AISuggestions() {
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
              <span className="text-primary font-bold text-lg">🤖</span>
            </div>
            <div>
              <h2 className="font-semibold text-on-surface">AI</h2>
              <p className="text-xs text-on-surface-secondary">Suggestions</p>
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
            <p className="text-lg font-bold text-primary">2.0.0</p>
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
              <h1 className="text-2xl font-bold text-on-surface">AI-Powered Insights</h1>
              <p className="text-sm text-on-surface-secondary">Smart suggestions for better financial management</p>
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
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-background text-6xl">🤖</span>
              </div>
              <h2 className="text-4xl font-bold text-on-surface mb-4">AI Suggestions Coming Soon!</h2>
              <p className="text-xl text-on-surface-secondary max-w-2xl mx-auto mb-8">
                We're working hard to bring you intelligent insights and personalized recommendations 
                to help you make better financial decisions.
              </p>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-yellow-400 font-semibold">🚀 Expected Release: Next Month</p>
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Smart Spending Analysis */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-blue-400 text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Smart Spending Analysis</h3>
                    <p className="text-sm text-on-surface-secondary">AI-powered insights</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Identify spending patterns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Detect unusual expenses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Predict future spending</span>
                  </li>
                </ul>
              </div>

              {/* Budget Optimization */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-green-400 text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Budget Optimization</h3>
                    <p className="text-sm text-on-surface-secondary">Personalized recommendations</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Smart budget suggestions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Category-wise optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Goal-based planning</span>
                  </li>
                </ul>
              </div>

              {/* Expense Predictions */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-purple-400 text-2xl">🔮</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Expense Predictions</h3>
                    <p className="text-sm text-on-surface-secondary">Future insights</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Monthly expense forecasting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Seasonal spending patterns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Anomaly detection</span>
                  </li>
                </ul>
              </div>

              {/* Smart Notifications */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-red-400 text-2xl">🔔</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Smart Notifications</h3>
                    <p className="text-sm text-on-surface-secondary">Intelligent alerts</p>
                  </div>
                </div>
                <ul className="space-y-3 text-on-surface-secondary">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Overspending alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Budget milestone notifications</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Smart saving reminders</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-8 border border-primary/30">
                <h3 className="text-2xl font-bold text-on-surface mb-4">Stay Tuned!</h3>
                <p className="text-on-surface-secondary mb-6">
                  We're excited to bring you these AI-powered features. Follow us for updates and be the first to know when they're available!
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

export default AISuggestions; 