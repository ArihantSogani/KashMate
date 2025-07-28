import React, { useState, useEffect } from 'react';

function EditTransactionModal({ isOpen, onClose, onUpdate, transaction }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'Expense',
    category: '',
    paymentMode: 'Cash',
    date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Healthcare', 'Education', 'Bills & Utilities', 'Travel', 
    'Salary', 'Freelance', 'Investment', 'Other'
  ];

  const paymentModes = ['Cash', 'Card', 'UPI'];

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title || '',
        amount: transaction.amount || '',
        type: transaction.type || 'Expense',
        category: transaction.category || '',
        paymentMode: transaction.paymentMode || 'Cash',
        date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : ''
      });
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onUpdate(transaction._id, formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 border border-surface/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
            <span className="text-blue-400 text-xl">✏️</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface">Edit Transaction</h3>
            <p className="text-sm text-on-surface-secondary">Update transaction details</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
              placeholder="Transaction title"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">
              Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
              required
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Payment Mode */}
          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">
              Payment Mode *
            </label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
              required
            >
              {paymentModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-on-surface-secondary mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface/60 text-on-surface py-3 rounded-xl font-semibold hover:bg-surface/80 transition-all duration-200 border border-surface/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal; 