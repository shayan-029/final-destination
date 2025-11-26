# JWT Authentication Guide (Urdu/Hindi)

## 🔐 JWT Token Authentication Kaise Kaam Karta Hai

### 1. Sign In Se Token Lena

**Endpoint:** `POST /auth/signin`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "Signin successful",
  "data": {
    "user": {
      "_id": "user-id",
      "email": "user@example.com",
      "name": "User Name",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ Important:** Yahan se mile `token` ko copy kar lo, ye aapko protected APIs access karne ke liye chahiye.

---

### 2. Token Ko Use Karna

#### Method 1: Swagger UI Mein (Easiest)

1. Browser mein jao: `http://localhost:8000/api`
2. Top right corner mein **"Authorize"** 🔓 button click karo
3. Dialog box mein:
   - `Value` field mein apna token paste karo (pehle "Bearer " likhne ki zarurat nahi)
   - Ya phir direct: `Bearer your-token-here`
4. **Authorize** button click karo
5. Ab aap protected APIs use kar sakte ho!

#### Method 2: Postman/Thunder Client Mein

**Headers mein add karo:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Ya Postman mein:
1. Authorization tab select karo
2. Type: "Bearer Token" select karo
3. Token field mein apna token paste karo

---

### 3. Ab Kaun Se APIs Protected Hain? (Token Chahiye)

#### ✅ Protected Endpoints (Token Required):

1. **Student:**
   - `PUT /student/:id` - Update student
   - `DELETE /student/:id` - Delete student

2. **Class:**
   - `PUT /class/:id` - Update class section
   - `DELETE /class/:id` - Delete class section

#### 🔓 Public Endpoints (Token Ki Zarurat Nahin):

1. **Auth:**
   - `POST /auth/signup`
   - `POST /auth/signin`
   - `POST /auth/forget-password`
   - `POST /auth/reset-password`

2. **Student:**
   - `POST /student` - Create student
   - `GET /student` - Get all students
   - `GET /student/:id` - Get one student

3. **Class:**
   - `POST /class` - Create class section
   - `GET /class` - Get all class sections
   - `GET /class/:id` - Get one class section

---

### 4. Testing - Step by Step

#### Test 1: Sign In Karo
```bash
POST http://localhost:8000/auth/signin
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response se token copy karo**

#### Test 2: Protected API Call Karo (WITHOUT Token - Should Fail)
```bash
PUT http://localhost:8000/student/123456789
Content-Type: application/json

{
  "name": "Updated Name"
}
```

**Expected Error:** `401 Unauthorized` ❌

#### Test 3: Protected API Call Karo (WITH Token - Should Work)
```bash
PUT http://localhost:8000/student/123456789
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Updated Name"
}
```

**Expected:** Success response ✅

---

### 5. Token Ka Andar Kya Hai?

Token decode karne ke liye: https://jwt.io

**Token Structure:**
```json
{
  "sub": "user-id-from-database",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,  // Issued at (time)
  "exp": 1234654290   // Expires at (24 hours later)
}
```

**Token Expire Time:** 1 day (24 hours)

---

### 6. Common Issues & Solutions

#### Issue 1: "401 Unauthorized" Error
**Solution:**
- Check karo token sahi hai ya nahi
- Check karo token expire nahi hua (24 hours baad)
- Check karo header format sahi hai: `Authorization: Bearer <token>`

#### Issue 2: "Invalid token payload" Error
**Solution:**
- Sign in karke naya token lo
- Purana token delete karo, naya use karo

#### Issue 3: Public API Bhi Token Maang Rahi Hai
**Solution:**
- Public APIs mein `@Public()` decorator check karo
- Agar nahi hai to add karo

---

### 7. Current System Status

✅ **Working:**
- Token generation (Sign in se)
- Token validation
- Protected endpoints authentication
- Swagger UI mein Bearer Auth setup

⚠️ **Note:**
- Zyadatar endpoints abhi `@Public()` hain
- Agar saare endpoints protect karna hai, to `@Public()` decorators remove karne honge

---

### 8. Agar Saare APIs Ko Protected Banana Hai

Agar aap chahte ho ke CREATE, READ operations bhi protected hon, to:

1. Controllers se `@Public()` decorator hata do
2. Phir har request mein token chahiye hoga

**Example:**
```typescript
// BEFORE (Public)
@Public()
@Post()
async create(@Body() dto: CreateStudentDto) {
  return this.studentService.create(dto);
}

// AFTER (Protected - Token Required)
@Post()
async create(@Body() dto: CreateStudentDto) {
  return this.studentService.create(dto);
}
```

---

## 📝 Quick Reference

| Action | Endpoint | Token Required? |
|--------|----------|----------------|
| Sign Up | POST /auth/signup | ❌ No |
| Sign In | POST /auth/signin | ❌ No |
| Create Student | POST /student | ❌ No (Public) |
| Get Students | GET /student | ❌ No (Public) |
| Update Student | PUT /student/:id | ✅ Yes |
| Delete Student | DELETE /student/:id | ✅ Yes |
| Create Class | POST /class | ❌ No (Public) |
| Get Classes | GET /class | ❌ No (Public) |
| Update Class | PUT /class/:id | ✅ Yes |
| Delete Class | DELETE /class/:id | ✅ Yes |

---

**Swagger UI:** http://localhost:8000/api  
**Gateway Port:** 8000

