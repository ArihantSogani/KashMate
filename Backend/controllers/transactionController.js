const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;
    const userId = req.user.id;
    const transaction = new Transaction({
      userId,
      title,
      amount,
      category,
      paymentMode: req.body.paymentMode || 'Cash', 
      type,
      date: date || Date.now(),
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add transaction', error });
  }
};

exports.getPaymentModeSummary = async (req, res) => {
  try {
    console.log('Fetching payment mode summary for user:', req.user.id);
    const summary = await Transaction.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(req.user.id), 
          type: 'Expense',
          paymentMode: { $in: ['Cash', 'Card', 'UPI'] } 
        } 
      },
      { $group: { _id: '$paymentMode', totalAmount: { $sum: '$amount' } } }
    ]);
    console.log('Payment mode summary result:', summary);
    const result = summary.map(item => ({
      paymentMode: item._id,
      amount: item.totalAmount
    }));
    console.log('Formatted payment mode data:', result);
    res.json(result);
  } catch (err) {
    console.error('Payment mode summary error:', err);
    res.status(500).json({ error: 'Failed to fetch payment mode summary' });
  }
};

// Get all transactions for the logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error });
  }
};

// Get today's transactions for dashboard
exports.getTodayTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    }).sort({ date: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch today\'s transactions', error });
  }
};

// Get transactions by date range
exports.getTransactionsByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end date
    
    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: start,
        $lte: end
      }
    }).sort({ date: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions by date', error });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transaction', error });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, amount, type, category, paymentMode, date } = req.body;

    // Validate required fields
    if (!title || !amount || !type || !category || !paymentMode || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    // Validate type
    if (!['Income', 'Expense'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either Income or Expense' });
    }

    // Validate payment mode
    if (!['Cash', 'Card', 'UPI'].includes(paymentMode)) {
      return res.status(400).json({ message: 'Payment mode must be Cash, Card, or UPI' });
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      { title, amount, type, category, paymentMode, date },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ message: 'Failed to update transaction', error: error.message });
  }
};

// Get summary stats for the dashboard
exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId });

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryMap = {};

    transactions.forEach(tx => {
      if (tx.type === 'Income') {
        totalIncome += tx.amount;
      } else if (tx.type === 'Expense') {
        totalExpense += tx.amount;
        // Case-insensitive grouping
        const cat = tx.category.trim().toLowerCase();
        if (!categoryMap[cat]) {
          categoryMap[cat] = { amount: 0, label: tx.category };
        }
        categoryMap[cat].amount += tx.amount;
      }
    });

    const totalBalance = totalIncome - totalExpense;
    const categoryBreakdown = Object.values(categoryMap).map(cat => ({
      category: cat.label,
      amount: cat.amount,
    }));
    const totalSpent = totalExpense;
    const categoryWithPercent = categoryBreakdown.map(cat => ({
      ...cat,
      percent: totalSpent ? ((cat.amount / totalSpent) * 100).toFixed(1) : '0.0',
    }));

    res.json({
      totalBalance,
      totalIncome,
      totalExpense,
      categoryBreakdown: categoryWithPercent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch summary', error });
  }
}; 