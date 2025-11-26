# Password Reset Testing Guide

## Prerequisites
1. MongoDB running (localhost:27017 ya aapki configured port)
2. RabbitMQ running (agar microservices ke liye use ho raha hai)
3. Node.js aur dependencies installed

---

## Step 1: Servers Start Karein

### Terminal 1 - Auth Service Start Karein:
```bash
nx serve auth
```
Ya agar direct command:
```bash
cd apps/auth
npm run serve
```

### Terminal 2 - Gateway Service Start Karein:
```bash
nx serve gateway
```
Ya:
```bash
cd apps/gateway
npm run serve
```

**Note:** Gateway port: `8000` par chalega
**Swagger UI:** `http://localhost:8000/api`

---

## Step 2: Testing Methods

### Method 1: Swagger UI (Easiest) 🌟

1. Browser mein jao: `http://localhost:8000/api`
2. **Authentication** section mein 4 endpoints dikhenge:
   - `POST /auth/signup`
   - `POST /auth/signin`
   - `POST /auth/forget-password` ⭐
   - `POST /auth/reset-password` ⭐

#### Test Forget Password:
1. **POST /auth/forget-password** click karein
2. **Try it out** button click karein
3. Request body mein:
```json
{
  "email": "user@example.com"
}
```
4. **Execute** click karein
5. Response aayega:
```json
{
  "message": "If the email exists, a password reset link has been sent."
}
```
6. **Console check karein** (Auth service terminal) - wahan token print hoga

#### Test Reset Password:
1. Pehle forget password se token lein (console se)
2. **POST /auth/reset-password** click karein
3. **Try it out** button click karein
4. Request body mein:
```json
{
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```
5. **Execute** click karein
6. Success response aayega:
```json
{
  "message": "Password has been reset successfully"
}
```

---

### Method 2: Postman/Thunder Client

#### Setup:
1. Postman ya VS Code Thunder Client extension install karein
2. Base URL: `http://localhost:8000`

#### Test 1: Forget Password
```
POST http://localhost:8000/auth/forget-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Expected Response:**
```json
{
  "message": "If the email exists, a password reset link has been sent."
}
```

**Check Console:** Auth service terminal mein token print hoga

#### Test 2: Reset Password
```
POST http://localhost:8000/auth/reset-password
Content-Type: application/json

{
  "token": "YOUR_TOKEN_FROM_CONSOLE",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

**Expected Response:**
```json
{
  "message": "Password has been reset successfully"
}
```

---

### Method 3: cURL Commands

#### Forget Password:
```bash
curl -X POST http://localhost:8000/auth/forget-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

#### Reset Password:
```bash
curl -X POST http://localhost:8000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_TOKEN_HERE",
    "newPassword": "newPassword123",
    "confirmPassword": "newPassword123"
  }'
```

---

## Step 3: Complete Flow Test

### Full Scenario Test:

1. **Pehle User Signup Karein** (agar nahi hai):
```json
POST /auth/signup
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "oldPassword123",
  "role": "student"
}
```

2. **Forget Password Request:**
```json
POST /auth/forget-password
{
  "email": "test@example.com"
}
```
- Console mein token check karein

3. **Reset Password:**
```json
POST /auth/reset-password
{
  "token": "CONSOLE_SE_TOKEN",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

4. **New Password Se Signin Test:**
```json
POST /auth/signin
{
  "email": "test@example.com",
  "password": "newPassword123"
}
```
- Success hona chahiye ✅

---

## Error Scenarios Test

### 1. Invalid Email Format:
```json
POST /auth/forget-password
{
  "email": "invalid-email"
}
```
**Expected:** 400 Bad Request

### 2. Passwords Don't Match:
```json
POST /auth/reset-password
{
  "token": "valid-token",
  "newPassword": "password123",
  "confirmPassword": "differentPassword"
}
```
**Expected:** 400 - "Passwords do not match"

### 3. Invalid/Expired Token:
```json
POST /auth/reset-password
{
  "token": "invalid-token-123",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```
**Expected:** 400 - "Invalid or expired reset token"

### 4. Short Password:
```json
POST /auth/reset-password
{
  "token": "valid-token",
  "newPassword": "123",
  "confirmPassword": "123"
}
```
**Expected:** 400 - Validation error (minimum 6 characters)

---

## Console Output Check

### Auth Service Terminal Mein Ye Dikhega:

**Forget Password Success:**
```
========================================
Password Reset Email
========================================
To: test@example.com
Subject: Password Reset Request
Reset Link: http://localhost:3000/reset-password?token=abc123...
Token: abc123...
========================================
```

**Reset Password Success:**
```
GATEWAY RESET PASSWORD RESULT >>> { message: 'Password has been reset successfully' }
```

---

## Quick Test Checklist

- [ ] Gateway server running on port 8000
- [ ] Auth service running
- [ ] Swagger UI accessible: http://localhost:8000/api
- [ ] Forget password endpoint working
- [ ] Token console mein print ho raha hai
- [ ] Reset password endpoint working
- [ ] Password successfully reset ho raha hai
- [ ] New password se signin ho raha hai
- [ ] Error cases properly handle ho rahe hain

---

## Troubleshooting

### Issue: "Connection refused"
- **Solution:** Check karein ke Gateway aur Auth dono services running hain

### Issue: "Token not found"
- **Solution:** Console se exact token copy karein (spaces nahi hone chahiye)

### Issue: "Token expired"
- **Solution:** Token 1 hour ke baad expire hota hai. Naya token generate karein

### Issue: Swagger UI nahi khul raha
- **Solution:** Check karein ke Gateway service properly start hua hai aur port 8000 available hai

---

## Notes

1. **Email Service:** Abhi console mein log ho raha hai. Production mein actual email service integrate karna hoga
2. **Token Expiry:** Tokens 1 hour ke liye valid hain
3. **Security:** Email existence reveal nahi hota (security best practice)
4. **Database:** PasswordReset collection automatically create hogi MongoDB mein

---

Happy Testing! 🚀

