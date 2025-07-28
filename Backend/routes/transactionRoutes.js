const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
  updateTransaction,
} = require('../controllers/transactionController');
const { getPaymentModeSummary } = require('../controllers/transactionController');

// Add a new transaction
router.post('/', auth, addTransaction);

// Get all transactions for the user
router.get('/', auth, getTransactions);

// Update a transaction
router.put('/:id', auth, updateTransaction);

// Delete a transaction
router.delete('/:id', auth, deleteTransaction);

// Get dashboard summary
router.get('/summary', auth, getSummary);

// Get payment mode summary
router.get('/summary/paymentMode', auth, getPaymentModeSummary);

module.exports = router; 