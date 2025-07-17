import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [token]);

  // Calculate total balance
  const total = transactions.reduce((sum, tx) =>
    tx.type === 'income' ? sum + tx.amount : sum - tx.amount, 0
  );

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]"><div className="text-primary animate-pulse text-lg font-semibold">Loading dashboard...</div></div>;
  if (error) return <div className="text-expense text-center mt-8">{error}</div>;

  return (
    <div className="space-y-8">
      {/* Total Balance Card */}
      <div className="bg-surface rounded-lg shadow-md p-6 flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold text-on-surface mb-2">Total Balance</h2>
        <div className={`text-3xl font-bold ${total >= 0 ? 'text-income' : 'text-expense'}`}>{total >= 0 ? '+' : '-'}₹{Math.abs(total)}</div>
      </div>
      {/* Transactions Section */}
      <div>
        <h3 className="text-xl font-bold text-on-surface mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="text-on-surface-secondary text-center">No transactions yet.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className={`bg-surface rounded-lg shadow-md p-4 flex flex-col hover:scale-105 transition-transform border-l-4 ${tx.type === 'income' ? 'border-income' : 'border-expense'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold text-on-surface">{tx.title}</h4>
                  <span className={`font-semibold ${tx.type === 'income' ? 'text-income' : 'text-expense'}`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-secondary text-sm">
                  <span>{tx.category}</span>
                  <span>{new Date(tx.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

