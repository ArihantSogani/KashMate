import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ExpenseChart from '../components/ExpenseChart';
import TransactionRow from '../components/TransactionRow';
import AddTransactionModal from '../components/AddTransactionModal';
import PaymentModeChart from '../components/PaymentModeChart';
import SettingsModal from '../components/SettingsModal';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [paymentModeData, setPaymentModeData] = useState([]);
  const [paymentModeTotal, setPaymentModeTotal] = useState(0);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Refactored data fetching for reuse
  const fetchDashboardData = async () => {
    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      // Fetch user info
      const userRes = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);
      // Fetch summary
      const summaryRes = await axios.get('/api/transactions/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(summaryRes.data);
      // Fetch payment mode summary
      const paymentModeRes = await axios.get('/api/transactions/summary/paymentMode', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Payment mode response:', paymentModeRes.data);
      const paymentData = paymentModeRes.data || [];
      console.log('Payment data array:', paymentData);
      const total = paymentData.reduce((sum, item) => sum + item.amount, 0);
      console.log('Payment mode total:', total);
      // Add percent field for chart
      const paymentDataWithPercent = paymentData.map(item => ({
        ...item,
        percent: total ? ((item.amount / total) * 100).toFixed(1) : '0.0',
      }));
      console.log('Payment data with percent:', paymentDataWithPercent);
      setPaymentModeData(paymentDataWithPercent);
      setPaymentModeTotal(total);
      // Fetch transactions
      const txRes = await axios.get('/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(txRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line
  }, [token]);

  if (loading) return <div className="flex justify-center items-center h-full"><div className="text-primary animate-pulse text-lg font-semibold">Loading dashboard...</div></div>;
  if (error) return <div className="text-expense text-center h-full flex items-center justify-center">{error}</div>;

  return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-surface/20">
      {/* Left Sidebar */}
      <div className="w-64 bg-surface/80 backdrop-blur-sm border-r border-surface/30 flex flex-col">
        {/* User Profile Section - Clickable for Settings */}
        <div 
          className="p-6 border-b border-surface/30 cursor-pointer hover:bg-surface/40 transition-all duration-200 rounded-lg mx-2 mt-2"
          onClick={() => setShowSettings(true)}
          title="Click to edit profile"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <h2 className="font-semibold text-on-surface">{user?.name || 'User'}</h2>
              <p className="text-xs text-on-surface-secondary">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 space-y-3">
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-xs text-on-surface-secondary mb-1">Total Balance</p>
            <p className={`text-lg font-bold ${summary?.totalBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{summary?.totalBalance || 0}
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-xs text-on-surface-secondary mb-1">This Month</p>
            <p className="text-lg font-bold text-red-400">₹{summary?.totalExpense || 0}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 mt-auto">
          <button
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => setShowModal(true)}
          >
            + Add Transaction
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-surface/60 backdrop-blur-sm border-b border-surface/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-on-surface">Dashboard</h1>
              {/* <p className="text-sm text-on-surface-secondary">Welcome back, {user?.name}!</p> */}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-on-surface-secondary">Live</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-4 border border-surface/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-on-surface-secondary">Total Income</p>
                    <p className="text-xl font-bold text-green-400">₹{summary?.totalIncome || 0}</p>
                  </div>
                  <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-lg">↑</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-4 border border-surface/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-on-surface-secondary">Total Expense</p>
                    <p className="text-xl font-bold text-red-400">₹{summary?.totalExpense || 0}</p>
                  </div>
                  <div className="w-10 h-10 bg-red-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-red-400 text-lg">↓</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-4 border border-surface/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-on-surface-secondary">Transactions</p>
                    <p className="text-xl font-bold text-primary">{transactions.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">📊</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Expense Breakdown Chart */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 border border-surface/30">
                <h3 className="text-lg font-semibold text-on-surface mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Expense Breakdown
                </h3>
                <div className="h-64">
                  <ExpenseChart data={summary?.categoryBreakdown || []} total={summary?.totalExpense || 0} />
                </div>
              </div>

              {/* Payment Mode Chart */}
              <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 border border-surface/30">
                <h3 className="text-lg font-semibold text-on-surface mb-4 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Payment Methods
                </h3>
                <div className="h-64">
                  <PaymentModeChart data={paymentModeData} total={paymentModeTotal} />
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 border border-surface/30">
              <h3 className="text-lg font-semibold text-on-surface mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Recent Transactions
                </div>
                <span className="text-sm text-on-surface-secondary">({transactions.length} total)</span>
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-on-surface-secondary">No transactions yet</p>
                    <p className="text-xs text-on-surface-secondary">Add your first transaction to get started</p>
                  </div>
                ) : (
                  <>
                    {console.log('Rendering transactions:', transactions.length)}
                    {transactions.map(tx => (
                      <TransactionRow key={tx._id} tx={tx} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={fetchDashboardData}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          user={user}
          onClose={() => setShowSettings(false)}
          onUpdate={fetchDashboardData}
        />
      )}
    </div>
  );
}

export default Dashboard;

