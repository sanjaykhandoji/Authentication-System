# -Authentication Backend

**yt-auth** is a backend authentication system built using Node.js, Express.js, MongoDB, and JWT. It provides a secure and complete authentication workflow with user registration, email verification using OTP, login, access token and refresh token management, and session-based logout.

## 🚀 Features

- **User Registration:** Register users with unique usernames and email addresses.
- **Password Hashing:** SHA-256 hashing for password storage.
- **Email Verification:** OTP-based email verification using Nodemailer.
- **JWT Authentication:** Access token and refresh token generation.
- **Token Refresh:** Refresh access tokens using HTTP-only cookies.
- **Token Rotation:** Manage refresh token rotation for improved session security.
- **Session Management:** Track user sessions and revoke individual sessions.
- **Logout:** Revoke the current user's session.
- **Logout All:** Revoke all active sessions for a user.
- **Protected Routes:** Authenticate users before granting access to protected resources.
- **MongoDB Integration:** Store user information, OTPs, and session details using Mongoose.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JSON Web Token | Authentication |
| Nodemailer | Email and OTP delivery |
| dotenv | Environment configuration |
| cookie-parser | Cookie management |
| morgan | HTTP request logging |

## 📁 Project Structure

```text
yt-auth/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
│
└── src/
    ├── app.js
    │
    ├── config/
    │   ├── config.js
    │   └── database.js
    │
    ├── controllers/
    │   └── auth.controller.js
    │
    ├── models/
    │   ├── otp.model.js
    │   ├── session.model.js
    │   └── user.model.js
    │
    ├── routes/
    │   └── auth.routes.js
    │
    ├── services/
    │   └── email.service.js
    │
    └── utils/
        └── utils.js
```

## 📋 Prerequisites

Make sure you have installed:

- Node.js 18 or later
- MongoDB or MongoDB Atlas
- Gmail SMTP configuration or another supported email SMTP setup
- Postman (for API testing)

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd yt-auth
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_email@example.com
```

Replace the placeholder values with your actual configuration.

**Important:** Never upload your `.env` file or expose your credentials on GitHub.

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

The application runs on:

```text
http://localhost:3000
```

## 📡 API Endpoints

Base URL: `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user and send OTP |
| POST | `/verify-email` | Verify email using OTP |
| POST | `/login` | Authenticate a verified user |
| GET | `/get-me` | Retrieve authenticated user details |
| GET | `/refresh-token` | Generate a new access token |
| GET | `/logout` | Revoke the current session |
| GET | `/logout-all` | Revoke all active sessions |

## 📝 Example API Requests

### 1. User Registration

**POST** `/api/auth/register`

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### 2. Email Verification

**POST** `/api/auth/verify-email`

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### 3. User Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

After successful authentication, the server provides:

- Access token
- User information
- Refresh token stored in an HTTP-only cookie

## 🔐 Authentication Workflow

1. User registers with a username, email, and password.
2. The server checks username and email uniqueness.
3. The password is hashed before being stored in MongoDB.
4. An OTP is generated and sent to the registered email address.
5. The user verifies their email using the OTP.
6. The verified user logs in using their email and password.
7. The server generates an access token and refresh token.
8. The refresh token is stored securely in an HTTP-only cookie, with its hashed representation stored in the database.
9. The access token is used to access protected API routes.
10. When the access token expires, the refresh token can be used to generate a new access token.
11. Users can log out from the current session or revoke all active sessions.

## 🛡️ Security Practices

- Password hashing before database storage.
- Refresh token hashing before database storage.
- HTTP-only and secure cookie configuration.
- JWT-based authentication.
- Session tracking and revocation.
- Environment variables for sensitive credentials.

## 🧪 API Testing

All authentication endpoints can be tested using Postman.

Important test scenarios:

- Register a new user.
- Attempt registration with an existing email.
- Verify email using a valid and invalid OTP.
- Login with correct and incorrect credentials.
- Access protected routes without authentication.
- Refresh an expired access token.
- Logout from the current session.
- Logout from all active sessions.

## 📚 Key Learning Outcomes

Through this project, I gained practical experience in:

- Building REST APIs using Node.js and Express.js.
- Implementing authentication and authorization.
- Understanding JWT access and refresh token mechanisms.
- Implementing OTP-based email verification.
- Managing secure cookies.
- Understanding token rotation and session revocation.
- Integrating MongoDB with Mongoose.
- Testing backend authentication workflows using Postman.

## 📌 Future Improvements

- Implement stronger password hashing using bcrypt or Argon2.
- Add request rate limiting.
- Implement comprehensive input validation.
- Improve OTP expiration and retry handling.
- Add automated unit and integration tests.
- Improve production monitoring and logging.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sanjay KR**

GitHub: YOUR_GITHUB_PROFILE_URL
