const express = require('express');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser'); 
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // URL của frontend
  credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); 

// Kết nối database
sequelize.sync().then(() => {
  console.log('Database connected');
}).catch(err => {
console.error('Kết nối cơ sở dữ liệu thất bại:', err);
});

// Định nghĩa routes
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/comics', require('./routes/comicRoutes'));
app.use('/api/chapters', require('./routes/chapterRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/notifications', require('./routes/notiRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});
const PORT = process.env.PORT || 3005;
require('./swagger')(app); 
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
