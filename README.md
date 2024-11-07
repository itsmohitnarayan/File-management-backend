# File Management System

This is a file management system built with Node.js, Express, and MongoDB that allows users to upload, track, move, and manage files. The system supports user authentication with JWT tokens and provides endpoints to manage file operations such as uploading, requesting movement, and tracking files. It includes functionalities for file metadata management, such as status updates and department tracking.

## Features

- **User Authentication**: User registration, login, and JWT-based authentication.
- **File Upload**: Upload files along with metadata (e.g., department, status).
- **File Tracking**: Track and monitor the status and movement of files.
- **File Movement**: Request and update the status and location of files.
- **File Deletion**: Delete files from the system.
- **User Management**: Change password and view user details.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database to store user and file data.
- **Mongoose**: ODM for interacting with MongoDB.
- **JWT**: JSON Web Token for user authentication and authorization.
- **Multer**: Middleware for handling file uploads.

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (>=14.0.0)
- npm (Node Package Manager)
- MongoDB (local instance or cloud-based service like MongoDB Atlas)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsmohitnarayan/File-management-backend.git
   cd File-management-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection in the `config.js` or directly in the code (typically inside the `server.js` file). Ensure that MongoDB is running locally or use a cloud service.

4. Run the application:

   ```bash
   npm run dev
   ```

   This will start the server on `http://localhost:5000`.

## API Endpoints

Here are the key API routes provided by the system:

### User Endpoints

- **POST** `/api/users/register` - Register a new user.
  - Request body: `{ "name": "John Doe", "email": "email@example.com", "password": "password" }`
  
- **POST** `/api/users/login` - Log in a user and get a JWT token.
  - Request body: `{ "email": "email@example.com", "password": "password" }`
  
- **PUT** `/api/users/:userId/changePassword` - Change the user's password.
  - Request body: `{ "oldPassword": "oldpassword", "newPassword": "newpassword" }`
  
### File Endpoints

- **POST** `/api/files` - Upload a new file.
  - Request body: `{ "file": "file", "department": "HR", "status": "on the way" }`
  
- **GET** `/api/files` - Get all files (requires authentication).
  
- **GET** `/api/files/:fileId` - Get details of a specific file.
  
- **POST** `/api/files/:fileId/track` - Track a specific file.
  
- **POST** `/api/files/:fileId/request` - Request movement of a file.
  
- **PUT** `/api/files/:fileId/move` - Move a file to a new department or location.
  
- **DELETE** `/api/files/:fileId` - Delete a specific file.

### Authentication Middleware

All file-related endpoints (except for file upload and user registration/login) require a valid JWT token. Include the token in the request header as follows:

```bash
Authorization: Bearer <JWT_TOKEN>
```

## Testing

To run tests, use **Jest** and **Supertest**. First, install the dependencies if you haven't:

```bash
npm install --save-dev jest supertest
```

Then, run the tests using:

```bash
npm test
```

Test cases are structured to verify the key functionalities like file upload, movement, and user authentication.

## Contributing

Feel free to open an issue or make a pull request if you want to contribute to the project. Contributions, bug reports, and suggestions are always welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
