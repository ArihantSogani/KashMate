const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addTransaction,
  getTransactions,
  getTodayTransactions,
  getTransactionsByDate,
  getSummary,
  deleteTransaction,
  updateTransaction,
} = require('../controllers/transactionController');
const { getPaymentModeSummary } = require('../controllers/transactionController');

// Add a new transaction
router.post('/', auth, addTransaction);

// Get all transactions for the user
router.get('/', auth, getTransactions);

// Get today's transactions for dashboard
router.get('/today', auth, getTodayTransactions);

// Get transactions by date range
router.get('/by-date', auth, getTransactionsByDate);

// Update a transaction
router.put('/:id', auth, updateTransaction);

// Delete a transaction
router.delete('/:id', auth, deleteTransaction);

// Get dashboard summary
router.get('/summary', auth, getSummary);

// Get payment mode summary
router.get('/summary/paymentMode', auth, getPaymentModeSummary);

module.exports = router; 