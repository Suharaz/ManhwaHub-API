const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tài liệu API',
      version: '1.0.0',
      description: 'Tài liệu API cho các tuyến đường xác thực',
    },
    servers: [
      {
        url: 'http://localhost:3005',
      },
    ],
  },
    apis: [
      './routes/authRoutes.js',
      './routes/authorRoutes.js',
      './routes/chapterRoutes.js',
      './routes/comicRoutes.js',
      './routes/commentRoutes.js',
      './routes/homeRoutes.js',
      './routes/userRoutes.js'
    ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
