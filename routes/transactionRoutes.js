const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middleware/auth');

// Create a new transaction
router.post('/', authenticate, transactionController.createTransaction);

router.get('/', authenticate,transactionController.getTransactionById);

// Update a transaction by id
router.put('/:id', authenticate,transactionController.updateTransaction);

// Delete a transaction by id
router.delete('/:id',authenticate, transactionController.deleteTransaction);

module.exports = router;
