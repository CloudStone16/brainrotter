# 🧪 API Testing Guide

## Quick Test Commands

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Signup (Register New User)
```bash
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@brainrot.io\",\"password\":\"test123\"}"
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@brainrot.io\",\"password\":\"test123\"}"
```

### 4. Verify Token (Replace YOUR_TOKEN_HERE)
```bash
curl -X GET http://localhost:5000/api/auth/verify -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## PowerShell Commands (Windows)

### Signup
```powershell
$body = @{
    username = "testuser"
    email = "test@brainrot.io"
    password = "test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method POST -Body $body -ContentType "application/json"
```

### Login
```powershell
$body = @{
    email = "test@brainrot.io"
    password = "test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

### Verify (Replace with your token)
```powershell
$token = "YOUR_TOKEN_HERE"
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/verify" -Method GET -Headers @{ Authorization = "Bearer $token" }
```

## Using VS Code REST Client Extension

Create a file `test.http`:

```http
### Health Check
GET http://localhost:5000/api/health

### Signup
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@brainrot.io",
  "password": "test123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@brainrot.io",
  "password": "test123"
}

### Verify Token
GET http://localhost:5000/api/auth/verify
Authorization: Bearer YOUR_TOKEN_HERE

### Get Profile
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```
