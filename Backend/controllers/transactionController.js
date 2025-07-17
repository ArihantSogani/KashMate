const Transaction = require('../models/Transaction');

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
      type,
      date: date || Date.now(),
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add transaction', error });
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
    // Calculate percentages for each category
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