# Comic Platform API

## Description
This is a RESTful API for a comic platform, designed to manage comics, chapters, user interactions, and more. It uses Node.js with Express.js for routing, Sequelize for database management, and Swagger for API documentation.

## Installation
1. Clone the repository:
   ```
   git clone [repository-url]
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the environment variables in `.env` file.
4. Run the database migrations:
   ```
   npx sequelize db:migrate
   ```

## Usage
To start the server, run:
```
npm start
```
The server will start on the port specified in the `.env` file.

## Project Structure
- `config/`: Configuration files
- `controllers/`: API controllers
- `middleware/`: Middleware functions
- `models/`: Database models
- `routes/`: API routes
- `utils/`: Utility functions

## API Endpoints
- `/auth`: Authentication routes
- `/user`: User management routes
- `/comic`: Comic management routes
- `/chapter`: Chapter management routes
- `/comment`: Comment management routes
- `/genre`: Genre management routes
- `/noti`: Notification routes
- `/home`: Home page routes
- `/author`: Author management routes

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
[MIT](https://choosealicense.com/licenses/mit/)
