# Blog REST API

This repository contains the RESTful API for the Blog project, providing endpoints for managing blog posts, comments, and user authentication.

## Features

- **CRUD Operations**: Create, read, update, and delete blog posts and comments.
- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Role-Based Access**: Differentiate between regular users and admin users for access control.
- **Data Validation**: Ensure data integrity with robust validation mechanisms.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: SQL database for data storage.
- **PrismaORM**: Object Relational Mapper for Node.js.
- **Passport.js and jsonwebtoken**: For secure user authentication.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/devashishchakraborty/blog-api.git
   cd blog-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=
   ACCESS_TOKEN_SECRET=
   ```

4. **Start the server**:

   ```bash
   npm start
   ```

   The API will be accessible at `http://localhost:3000`.

## API Endpoints

- **Authentication**:

  - `POST /sign-up`: Register a new user.
  - `POST /login`: Authenticate a user and retrieve a token.

- **Posts**:

  - `GET /posts`: Retrieve all published posts.
  - `GET /posts/:postId`: Retrieve a specific post by ID.
  - `POST /posts`: Create a new post.
  - `PUT /posts/:postId`: Update a post by ID.
  - `DELETE /posts/:postId`: Delete a post by ID.

- **Comments**:
  - `GET /posts/:postId/comments`: Retrieve comments for a specific post.
  - `POST /posts/:postId/comments`: Add a comment to a post.
  - `DELETE /comments/:commentId`: Delete a comment by ID.
