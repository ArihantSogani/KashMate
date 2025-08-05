import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import TransactionRow from '../components/TransactionRow';
import PortalDatePicker from '../components/PortalDatePicker';

function MonthlyExpenses() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAllTransactions, setShowAllTransactions] = useState(true);

  const [monthlySummary, setMonthlySummary] = useState({ income: 0, expense: 0 });
  const [transactionFilter, setTransactionFilter] = useState('all'); // 'all', 'income', 'expense'
  const token = localStorage.getItem('token');



  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Apply filters (date + transaction type)
  const applyFilters = useCallback((transactionsToFilter, typeFilter = transactionFilter) => {
    let filtered = transactionsToFilter;
    
    // Apply transaction type filter
    if (typeFilter === 'income') {
      filtered = filtered.filter(tx => tx.type === 'Income');
    } else if (typeFilter === 'expense') {
      filtered = filtered.filter(tx => tx.type === 'Expense');
    }
    
    setFilteredTransactions(filtered);
    setMonthlySummary(calculateSummary(filtered));
  }, [transactionFilter]);

  // Fetch all transactions
  const fetchTransactions = useCallback(async () => {
    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await api.get('/api/transactions');
      setTransactions(response.data);
      applyFilters(response.data);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [token, applyFilters]);

  // Calculate summary for transactions
  const calculateSummary = (transactions) => {
    return transactions.reduce((summary, tx) => {
      if (tx.type === 'Income') {
        summary.income += tx.amount;
      } else {
        summary.expense += tx.amount;
      }
      return summary;
    }, { income: 0, expense: 0 });
  };

  // Filter transactions by selected date
  const filterByDate = (date) => {
    if (!date) {
      applyFilters(transactions);
      setShowAllTransactions(true);
      return;
    }

    // Check if it's a range date (for Last 3 Months)
    if (date.startsWith('range:')) {
      const [startDate, endDate] = date.replace('range:', '').split(':');
      
      // Parse start and end dates
      const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
      const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
      
      const startOfRange = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
      const endOfRange = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);
      
      const dateFiltered = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate >= startOfRange && txDate <= endOfRange;
      });
      
      applyFilters(dateFiltered);
      setShowAllTransactions(false);
      return;
    }

    // Single date filtering (existing logic)
    const [year, month, day] = date.split('-').map(Number);
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
    
    const dateFiltered = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate >= startOfDay && txDate <= endOfDay;
    });
    
    applyFilters(dateFiltered);
    setShowAllTransactions(false);
  };

  // Apply transaction type filter
  const applyTransactionFilter = (filterType) => {
    setTransactionFilter(filterType);
    if (selectedDate) {
      // If date is selected, filter by both date and type
      const [year, month, day] = selectedDate.split('-').map(Number);
      const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
      
      const dateFiltered = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate >= startOfDay && txDate <= endOfDay;
      });
      
      applyFilters(dateFiltered, filterType);
    } else {
      // If no date selected, filter only by type
      applyFilters(transactions, filterType);
    }
  };



  // Handle date selection
  const handleDateChange = (date) => {
    // Check if it's already a formatted date string (for range dates)
    if (typeof date === 'string' && date.startsWith('range:')) {
      setSelectedDate(date);
      filterByDate(date);
      return;
    }
    
    // Create date in local timezone to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    setSelectedDate(formattedDate);
    filterByDate(formattedDate);
  };

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedDate('');
    applyFilters(transactions);
    setShowAllTransactions(true);
  };



  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (loading) return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-surface/20">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-primary animate-pulse text-lg font-semibold">Loading transactions...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-surface/20">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-expense text-center">{error}</div>
      </div>
    </div>
  );

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
              <h2 className="font-semibold text-on-surface">Transaction</h2>
              <p className="text-xs text-on-surface-secondary">History</p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="p-4 space-y-4">
          <div className="bg-background/50 rounded-lg p-3">
             <p className="text-xs text-on-surface-secondary mb-1">Total Transactions</p>
             <p className="text-lg font-bold text-primary">{transactions.length}</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
             <p className="text-xs text-on-surface-secondary mb-1">Filtered</p>
             <p className="text-lg font-bold text-green-400">{filteredTransactions.length}</p>
           </div>
         </div>

         {/* Filter Options */}
         <div className="p-4 border-t border-surface/30">
           <h3 className="text-sm font-semibold text-on-surface mb-3">Filter by Type</h3>
           <div className="space-y-2">
             <button
               onClick={() => applyTransactionFilter('all')}
               className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                 transactionFilter === 'all'
                   ? 'bg-primary text-background shadow-lg'
                   : 'bg-surface/50 text-on-surface hover:bg-surface/70'
               }`}
             >
               📊 All Transactions
             </button>
             <button
               onClick={() => applyTransactionFilter('income')}
               className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                 transactionFilter === 'income'
                   ? 'bg-green-500 text-background shadow-lg'
                   : 'bg-surface/50 text-green-400 hover:bg-green-500/20'
               }`}
             >
               💰 Income Only
             </button>
             <button
               onClick={() => applyTransactionFilter('expense')}
               className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                 transactionFilter === 'expense'
                   ? 'bg-red-500 text-background shadow-lg'
                   : 'bg-surface/50 text-red-400 hover:bg-red-500/20'
               }`}
             >
               💸 Expense Only
             </button>
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
              <h1 className="text-2xl font-bold text-on-surface">Transaction History</h1>
              <p className="text-sm text-on-surface-secondary">View and filter all your transactions</p>
            </div>
            <div className="flex items-center space-x-4">
                             {/* Custom Date Filter */}
               <div className="flex items-center space-x-3">
                 <label className="text-sm text-on-surface-secondary">Filter by date:</label>
                 <PortalDatePicker
                   value={selectedDate}
                   onChange={(date) => {
                     if (date) {
                       handleDateChange(new Date(date));
                     } else {
                       clearDateFilter();
                     }
                   }}
                   placeholder="Select Date"
                 />
               </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
           <div className="max-w-6xl mx-auto">
                         {/* Summary Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
               {/* Total Income */}
               <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm text-green-400 mb-1">Total Income</p>
                     <p className="text-2xl font-bold text-green-400">₹{monthlySummary.income}</p>
                   </div>
                   <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                     <span className="text-green-400 text-lg">↑</span>
              </div>
              </div>
            </div>

               {/* Total Expense */}
               <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                 <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm text-red-400 mb-1">Total Expense</p>
                     <p className="text-2xl font-bold text-red-400">₹{monthlySummary.expense}</p>
                  </div>
                   <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                     <span className="text-red-400 text-lg">↓</span>
                  </div>
                </div>
              </div>

               {/* Net Balance */}
               <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                 <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm text-blue-400 mb-1">Net Balance</p>
                     <p className={`text-2xl font-bold ${monthlySummary.income - monthlySummary.expense >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                       ₹{monthlySummary.income - monthlySummary.expense}
                     </p>
                  </div>
                   <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                     <span className="text-blue-400 text-lg">💰</span>
                  </div>
                </div>
              </div>
            </div>

                           {/* Filter Status */}
              <div className="mb-6">
                <div className={`rounded-xl p-4 border ${
                  showAllTransactions 
                    ? 'bg-blue-500/20 border-blue-500/30' 
                    : 'bg-green-500/20 border-green-500/30'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${
                        showAllTransactions ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        {showAllTransactions ? '📊 All Transactions' : `📅 ${new Date(selectedDate).toLocaleDateString()}`}
                      </p>
                      <p className="text-xs text-on-surface-secondary mt-1">
                        {transactionFilter === 'all' && 'All types'}
                        {transactionFilter === 'income' && 'Income only'}
                        {transactionFilter === 'expense' && 'Expense only'}
                      </p>
                  </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        showAllTransactions ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        {filteredTransactions.length} found
                      </p>
                      <p className="text-xs text-on-surface-secondary">
                        of {transactions.length} total
                      </p>
                  </div>
                  </div>
                </div>
              </div>

            {/* Transactions List */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 border border-surface/30">
              <h3 className="text-lg font-semibold text-on-surface mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                {showAllTransactions ? 'All Transactions' : 'Filtered Transactions'}
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-on-surface-secondary">
                      {showAllTransactions ? 'No transactions yet' : 'No transactions for selected date'}
                    </p>
                    <p className="text-xs text-on-surface-secondary">
                      {showAllTransactions ? 'Add your first transaction to get started' : 'Try selecting a different date'}
                    </p>
                  </div>
                ) : (
                  <>
                    {filteredTransactions.map(tx => (
                      <TransactionRow key={tx._id} tx={tx} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyExpenses; 