import React, { useState } from 'react';
import api from '../config/axios';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function AddTransactionModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [type, setType] = useState('Expense');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !amount || !category) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const formattedCategory = toTitleCase(category.trim());
      await api.post('/api/transactions', {
        title: title.trim(),
        amount: Number(amount),
        category: formattedCategory,
        type,
        paymentMode,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      if (onAdd) onAdd();
      onClose();
    } catch (err) {
      setLoading(false);
      setError('Failed to save transaction.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#19202A] rounded-2xl shadow-2xl p-8 min-w-[340px] w-full max-w-md relative">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">Add New Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Title</label>
            <input
              type="text"
              className="w-full bg-[#232B39] border border-[#2D3748] rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Zomato Order"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Amount</label>
            <input
              type="number"
              className="w-full bg-[#232B39] border border-[#2D3748] rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., 500"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={loading}
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Category</label>
            <input
              type="text"
              className="w-full bg-[#232B39] border border-[#2D3748] rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Food"
              value={category}
              onChange={e => setCategory(e.target.value)}
              disabled={loading}
            />
          </div>
                <div>
        <label className="block text-sm font-semibold mb-1 text-gray-200">Payment Mode</label>
        <select
          className="w-full bg-[#232B39] border border-[#2D3748] rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          value={paymentMode}
          onChange={e => setPaymentMode(e.target.value)}
          disabled={loading}
        >
          <option value="">Select Payment Mode</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  type === 'Expense'
                    ? 'bg-primary text-white'
                    : 'bg-[#232B39] text-gray-300'
                }`}
                onClick={() => setType('Expense')}
                disabled={loading}
              >
                Expense
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  type === 'Income'
                    ? 'bg-primary text-white'
                    : 'bg-[#232B39] text-gray-300'
                }`}
                onClick={() => setType('Income')}
                disabled={loading}
              >
                Income
              </button>
            </div>
          </div>
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          <div className="flex justify-end items-center gap-4 pt-2">
            <button
              type="button"
              className="text-gray-300 hover:text-white font-semibold"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal; 