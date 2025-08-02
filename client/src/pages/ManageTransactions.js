import React, { useEffect, useState, useCallback } from 'react';
import api from '../config/axios';
import { useNavigate } from 'react-router-dom';
import TransactionRow from '../components/TransactionRow';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EditTransactionModal from '../components/EditTransactionModal';

function ManageTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); 
  const [filterCategory, setFilterCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, transactionId: null, transactionTitle: '' });
  const [editModal, setEditModal] = useState({ isOpen: false, transaction: null });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(tx => tx.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDeleteClick = (transactionId, transactionTitle) => {
    setDeleteModal({
      isOpen: true,
      transactionId,
      transactionTitle
    });
  };

  const handleEditClick = (transaction) => {
    setEditModal({
      isOpen: true,
      transaction
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/transactions/${deleteModal.transactionId}`);
      fetchTransactions(); // Refresh the list
      setDeleteModal({ isOpen: false, transactionId: null, transactionTitle: '' });
    } catch (err) {
      setError('Failed to delete transaction');
      setDeleteModal({ isOpen: false, transactionId: null, transactionTitle: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, transactionId: null, transactionTitle: '' });
  };

  const handleEditUpdate = async (transactionId, updatedData) => {
    try {
      await api.put(`/api/transactions/${transactionId}`, updatedData);
      fetchTransactions(); 
      setEditModal({ isOpen: false, transaction: null });
    } catch (err) {
      throw err; 
    }
  };

  const handleEditClose = () => {
    setEditModal({ isOpen: false, transaction: null });
  };

  useEffect(() => {
    fetchTransactions();
  }, [token, fetchTransactions]);

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesCategory = filterCategory === 'all' || tx.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  if (loading) return <div className="flex justify-center items-center h-full"><div className="text-primary animate-pulse text-lg font-semibold">Loading transactions...</div></div>;
  if (error) return <div className="text-expense text-center h-full flex items-center justify-center">{error}</div>;

  return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-surface/20">
      {/* Left Sidebar */}
      <div className="w-64 bg-surface/80 backdrop-blur-sm border-r border-surface/30 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-surface/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">📊</span>
            </div>
            <div>
              <h2 className="font-semibold text-on-surface">Manage</h2>
              <p className="text-xs text-on-surface-secondary">Transactions</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">Search</label>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface text-sm"
            >
              <option value="all">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-xs text-on-surface-secondary mb-1">Total Transactions</p>
            <p className="text-lg font-bold text-primary">{filteredTransactions.length}</p>
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
              <h1 className="text-2xl font-bold text-on-surface">Manage Transactions</h1>
              <p className="text-sm text-on-surface-secondary">View, edit, and delete your transactions</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-on-surface-secondary">Active</span>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-on-surface mb-2">No transactions found</h3>
                <p className="text-on-surface-secondary">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredTransactions.map(tx => (
                <div key={tx._id} className="bg-surface/80 backdrop-blur-sm rounded-xl p-4 border border-surface/30 hover:border-primary/30 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <TransactionRow tx={tx} />
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleDeleteClick(tx._id, tx.title)}
                        className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/30 transition-colors"
                        title="Delete transaction"
                      >
                        🗑️
                      </button>
                      <button
                        onClick={() => handleEditClick(tx)}
                        className="bg-blue-500/20 text-blue-400 p-2 rounded-lg hover:bg-blue-500/30 transition-colors"
                        title="Edit transaction"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        transactionTitle={deleteModal.transactionTitle}
      />

      {/* Edit Transaction Modal */}
      <EditTransactionModal
        isOpen={editModal.isOpen}
        onClose={handleEditClose}
        onUpdate={handleEditUpdate}
        transaction={editModal.transaction}
      />
    </div>
  );
}

export default ManageTransactions; 