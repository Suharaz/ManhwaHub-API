const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Thêm import User
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        req.user = null;  
        return next();  
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
  } catch (err) {
      if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authenticate ;
