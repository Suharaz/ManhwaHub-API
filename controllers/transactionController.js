const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res) => {
  const {  type, amount, status=null, description=null } = req.body;

  if (!type || !amount || !status) {
    return res.status(400).json({ error: 'Missing required fields:type, amount, status' });
  }

  if (!['deposit', 'withdraw', 'purchase'].includes(type)) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount. Must be a positive number' });
  }
  try {
    const transaction = await Transaction.create({
      user_id:req.user.id,
      type,
      amount,
      status,
      description
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { role_id, id: user_id } = req.user; // Lấy thông tin từ token


    let transactions;
    if (role_id === 2) {
      transactions = await Transaction.findAll(); // Admin xem tất cả
    } else {
      transactions = await Transaction.findAll({ where: { user_id } }); // User chỉ xem của họ
    }

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found' });
    }

    return res.status(200).json({ transactions, user: req.user });
  } catch (error) {
    return res.status(500).json({ error: error.message, user: req.user });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    if (req.user.role_id !== 2) {
      return res.status(403).json({ error: 'Bạn không phải admin' });
    }
    await transaction.update({ status });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (req.user.role_id !== 2) {
      return res.status(403).json({ error: 'Bạn không có quyền' });
    }
    await transaction.destroy();
    res.status(204).json({ message: 'Xoá thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
