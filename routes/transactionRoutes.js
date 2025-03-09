const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middleware/auth');

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Endpoint to create a new transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the transaction
 *               description:
 *                 type: string
 *                 description: A description of the transaction
 *     responses:
 *       '201':
 *         description: Transaction created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
// Create a new transaction
router.post('/', authenticate, transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get a transaction by ID
 *     description: Endpoint to retrieve a transaction by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the transaction to retrieve
 *     responses:
 *       '200':
 *         description: Transaction retrieved successfully
 *       '404':
 *         description: Transaction not found
 *       '401':
 *         description: Unauthorized
 */
router.get('/', authenticate,transactionController.getTransactionById);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     description: Endpoint to update an existing transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The new amount of the transaction
 *               description:
 *                 type: string
 *                 description: The new description of the transaction
 *     responses:
 *       '200':
 *         description: Transaction updated successfully
 *       '404':
 *         description: Transaction not found
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
// Update a transaction by id
router.put('/:id', authenticate,transactionController.updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     description: Endpoint to delete a transaction by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the transaction to delete
 *     responses:
 *       '200':
 *         description: Transaction deleted successfully
 *       '404':
 *         description: Transaction not found
 *       '401':
 *         description: Unauthorized
 */
// Delete a transaction by id
router.delete('/:id',authenticate, transactionController.deleteTransaction);

module.exports = router;
