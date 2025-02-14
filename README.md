# To-Do List API

## Overview
The To-Do List API is a RESTful API built with NestJS and MySQL for managing to-do lists and tasks for different users. This API allows users to create, update, delete, and retrieve to-do lists and tasks efficiently.

Every user can create one/more to-do lists and each of these lists can have one/more tasks which can be updated or deleted based on the user's preference.

## Features
- Create, retrieve, update, and delete to-do lists.
- Create, retrieve, update, and soft delete tasks.
- Uses MySQL as the relational database.
- Structured and scalable NestJS framework.
- API documentation via Swagger.
- Implements best practices for maintainability and readability.

## Technologies Used
- **Framework:** NestJS
- **Database:** MySQL
- **ORM:** TypeORM
- **Validation:** class-validator
- **Documentation:** Swagger

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) (for API testing)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Danie-O/to-do-list-api.git
   cd to-do-list-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following details:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=todolist_db
   ```
4. Ensure database schema is updated: If synchronize: true is set in your TypeORM configuration, the database schema will be updated automatically when the application starts. Otherwise, define migrations and run them manually.
5. Start the application:
   ```sh
   npm run start:dev
   ```

## API Documentation
Swagger documentation is available at:
```
http://localhost:3000/api/docs
```

## API Endpoints

### To-Do Lists
| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/todos`            | Create a new to-do list        |
| GET    | `/todos/user/:userId` | Get all to-do lists for a user |
| GET    | `/todos/:id`        | Get a to-do list by ID         |
| PATCH  | `/todos/:id`        | Update a to-do list            |
| DELETE | `/todos/:id`        | Delete a to-do list            |

### Tasks
| Method | Endpoint                 | Description                      |
|--------|--------------------------|----------------------------------|
| POST   | `/todos/:todoListId/tasks` | Add a new task to a to-do list |
| GET    | `/todos/:todoListId/tasks` | Get all tasks for a to-do list |
| GET    | `/todos/tasks/:id`         | Get a task by ID               |
| PATCH  | `/todos/tasks/:id`         | Update a task                  |
| DELETE | `/todos/tasks/:id`         | Soft delete a task             |

## Future Improvements
- Implement JWT authentication for secure access.
- Add pagination, filtering, and sorting.
- Introduce user roles and permissions.

## How to Contribute
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Make your changes and commit them.
4. Push to your branch and create a pull request.

## License
This project is licensed under the MIT License.

