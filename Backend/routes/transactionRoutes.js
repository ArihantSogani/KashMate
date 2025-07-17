const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addTransaction,
  getTransactions,
  getSummary,
} = require('../controllers/transactionController');

// Add a new transaction
router.post('/', auth, addTransaction);

// Get all transactions for the user
router.get('/', auth, getTransactions);

// Get dashboard summary
router.get('/summary', auth, getSummary);

module.exports = router; 