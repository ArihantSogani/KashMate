import React, { useState } from 'react';
import axios from 'axios';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function AddTransactionModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
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
      await axios.post('/api/transactions', {
        title: title.trim(),
        amount: Number(amount),
        category: formattedCategory,
        type,
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
      <div className="bg-white rounded-lg p-8 shadow-lg min-w-[320px] w-full max-w-sm relative text-gray-800">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring placeholder-gray-500"
              placeholder="e.g. Grocery shopping"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">Amount</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring placeholder-gray-500"
              placeholder="e.g. 500"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={loading}
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">Category</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring placeholder-gray-500"
              placeholder="e.g. Food, Shopping"
              value={category}
              onChange={e => setCategory(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex-1 px-3 py-2 rounded ${type === 'Expense' ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setType('Expense')}
                disabled={loading}
              >
                Expense
              </button>
              <button
                type="button"
                className={`flex-1 px-3 py-2 rounded ${type === 'Income' ? 'bg-green-400 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setType('Income')}
                disabled={loading}
              >
                Income
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal; 