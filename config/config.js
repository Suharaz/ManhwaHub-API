
const config = {
    app: {
        port: process.env.PORT || 3005,
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'mydatabase',
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
};

module.exports = config;