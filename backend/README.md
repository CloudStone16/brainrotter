# 🧠💀 Brainrot Generator - Backend API

MERN Stack backend for the Brainrot Generator with user authentication.

## 🚀 Features

- ✅ User Registration (Signup)
- ✅ User Login
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Token Verification
- ✅ Protected Routes
- ✅ MongoDB Integration
- ✅ Input Validation
- ✅ Error Handling

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── authController.js     # Auth logic
├── middleware/
│   └── auth.js              # JWT verification
├── models/
│   └── User.js              # User schema
├── routes/
│   └── authRoutes.js        # Auth endpoints
├── utils/
│   └── jwt.js               # JWT utilities
├── .env                      # Environment variables
├── .env.example             # Example env file
├── .gitignore               # Git ignore
├── package.json             # Dependencies
└── server.js                # Main server file
```

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and update:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/brainrotter
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Install MongoDB

**Option A: Local MongoDB**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 📡 API Endpoints

### Authentication Routes

Base URL: `http://localhost:5000/api/auth`

#### 1. **Signup** (Register New User)

```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "skibidi_user",
  "email": "user@brainrot.io",
  "password": "password123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123...",
    "username": "skibidi_user",
    "email": "user@brainrot.io",
    "createdAt": "2025-11-13T..."
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

#### 2. **Login**

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@brainrot.io",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123...",
    "username": "skibidi_user",
    "email": "user@brainrot.io",
    "createdAt": "2025-11-13T..."
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### 3. **Verify Token** (Protected)

```http
GET /api/auth/verify
Authorization: Bearer <your_token_here>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "65abc123...",
    "username": "skibidi_user",
    "email": "user@brainrot.io",
    "createdAt": "2025-11-13T..."
  }
}
```

#### 4. **Get Profile** (Protected)

```http
GET /api/auth/me
Authorization: Bearer <your_token_here>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "65abc123...",
    "username": "skibidi_user",
    "email": "user@brainrot.io",
    "createdAt": "2025-11-13T..."
  }
}
```

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "🧠 Brainrot Generator API is running!",
  "timestamp": "2025-11-13T..."
}
```

## 🔐 Authentication Flow

1. **User Signs Up:**
   - Send POST to `/api/auth/signup`
   - Receive JWT token
   - Store token in localStorage/sessionStorage

2. **User Logs In:**
   - Send POST to `/api/auth/login`
   - Receive JWT token
   - Store token

3. **Access Protected Routes:**
   - Include token in Authorization header:
   - `Authorization: Bearer <token>`

4. **Token Verification:**
   - Backend verifies token on protected routes
   - Returns user data if valid

## 🗄️ Database Schema

### User Model

```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🧪 Testing the API

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Verify (replace TOKEN):**
```bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman/Thunder Client

1. Import the endpoints
2. Create requests for signup, login, verify
3. Use variables for token storage
4. Test all endpoints

## 🔧 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/brainrotter` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key_123` |
| `JWT_EXPIRE` | Token expiration time | `7d` (7 days) |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication
- ✅ Token expiration
- ✅ Protected routes middleware
- ✅ Input validation
- ✅ CORS configuration
- ✅ Password not returned in responses

## 📝 Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Solution:**
- Check if MongoDB is running: `mongod --version`
- Verify connection string in `.env`
- For Windows: Start MongoDB service

### Issue: Port Already in Use

**Solution:**
- Change `PORT` in `.env` to different number
- Kill process using port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:5000 | xargs kill`

### Issue: CORS Error from Frontend

**Solution:**
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Ensure frontend is running on correct port

## 🚀 Next Steps

1. ✅ User authentication working
2. ⏳ Add video generation endpoints
3. ⏳ Integrate Gemini API
4. ⏳ Add generation history
5. ⏳ Add user video library

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin requests
- **express-validator**: Input validation
- **nodemon**: Auto-reload (dev)

## 🤝 Integration with Frontend

Update your frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend is already configured to use these endpoints!

---

**Backend is ready! Start the server and test the authentication endpoints.** 🧠💀🚽
