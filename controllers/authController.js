const User = require('../models/user');
const bcrypt = require('bcryptjs'); // Sửa thành bcryptjs theo package.json
const jwt = require('jsonwebtoken'); // Thêm import jwt
const crypto = require('crypto'); // Thêm import crypto

const register = async (req, res) => {
  try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
          return res.status(400).json({ error: "All fields (name, email, password) are required." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Invalid email format." });
      }

      if (password.length < 6) {
          return res.status(400).json({ error: "Password must be at least 6 characters long." });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ error: "Email already exists. Please use another email." });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      // ✅ Tạo người dùng mới
      const user = await User.create({
          name,
          email,
          password: hashedPassword,
          role_id: 0, // Người dùng thường
      });
      res.status(201).json({message: "User registered successfully!"});

  } catch (error) {
      console.error("Error in register:", error);
      res.status(500).json({ error: "Internal server error." });
  }
};

const login = async (req, res) => {
  try {
      const { email, password, remember } = req.body;

      // Tìm người dùng theo email
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "User not found" });

      // Kiểm tra mật khẩu (không đồng bộ)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      // Tạo JWT token
      const jwt_token = jwt.sign({ id: user.id,role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Xử lý remember token
      const rememberToken = crypto.randomBytes(48).toString('hex');
      res.cookie("remember_token", rememberToken, {
          httpOnly: true,
          secure: true,
          maxAge: 365 * 24 * 60 * 60 * 1000 // 1 năm
      });
      if (remember === true) {
          await User.update(
              { remember_token: rememberToken },
              { where: { id: user.id } }
          );
      }

      // Trả về kết quả
      res.json({
        message: "Login successful",
        jwt_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role_id,
          exp: user.exp,
          avatar: user.avatar,
          total_point: user.total_point
        }
      });
  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
      const rememberToken = req.cookies.remember_token;

      if (rememberToken) {
          // Tìm user dựa trên remember token
          const user = await User.findOne({ where: { remember_token: rememberToken } });

          if (user) {
              // Xóa remember token khỏi database
            await User.update({ remember_token: null }, { where: { id: user.id } });
          }

          // Xóa cookie chứa remember token
          res.clearCookie('remember_token');
      }

res.status(200).json({ message: "Logged out successfully" });
return;
  } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  try {
      const token = req.cookies.refresh_token; // Lấy Refresh Token từ cookie
      if (!token) return res.status(401).json({ message: "No refresh token provided" });

      const user = await User.findOne({ where: { refresh_token: token } });
      if (!user) return res.status(401).json({ message: "Invalid refresh token" });

      // 🔹 Tạo JWT mới (hạn 1h)
      const new_jwt = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ new_jwt: new_jwt });
  } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
