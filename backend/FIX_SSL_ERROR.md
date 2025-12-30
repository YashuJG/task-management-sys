# 🔒 Fixing SSL/TLS Error with MongoDB Atlas

## Error Message
```
{"error":"30900000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error"}
```

This is a **MongoDB Atlas SSL/TLS connection error**.

## ✅ Solution 1: Update Connection String Format

Make sure your connection string in `.env` is in the correct format:

### Correct Format:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

### Important Points:
1. **Database name** (`taskmanagement`) must be in the path: `/taskmanagement?`
2. **No spaces** in the connection string
3. **Special characters in password** need URL encoding:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - `&` → `%26`
   - `+` → `%2B`

### Example:
If your password is `My@Pass#123`, the connection string should be:
```
mongodb+srv://user:My%40Pass%23123@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

## ✅ Solution 2: Check MongoDB Atlas Settings

### Step 1: Verify Network Access
1. Go to MongoDB Atlas Dashboard
2. Click **"Network Access"** (left sidebar)
3. Make sure one of these is added:
   - `0.0.0.0/0` (allows all IPs - good for development)
   - OR your specific IP address

### Step 2: Verify Database User
1. Go to **"Database Access"** (left sidebar)
2. Make sure your database user exists
3. User should have **"Atlas Admin"** or **"Read and write to any database"** role

### Step 3: Get Fresh Connection String
1. Click **"Connect"** on your cluster
2. Select **"Connect your application"**
3. Choose **"Node.js"** driver
4. Version: **5.5 or later**
5. Copy the connection string
6. **Important**: Add `/taskmanagement` before `?retryWrites`:
   ```
   mongodb+srv://...@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
   ```

## ✅ Solution 3: Update .env File

1. Open `backend/.env` file
2. Replace the entire `MONGODB_URI` line with your correct connection string
3. Make sure it's all on ONE line (no line breaks)
4. Save the file
5. **Restart backend server**:
   ```bash
   # Stop backend (Ctrl+C)
   npm run dev
   ```

## ✅ Solution 4: Test Connection

Run the test script:
```bash
cd backend
node test-db.js
```

**Expected output if successful**:
```
✅ SUCCESS: MongoDB Connected!
✅ Connection State: Connected
```

**If still getting error**, check:
1. Connection string format
2. Username/password are correct
3. Network Access in MongoDB Atlas
4. Cluster is running (not paused)

## ✅ Solution 5: Alternative Connection String (If SSL still fails)

If SSL errors persist, try adding SSL options to connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority&tls=true
```

Or try without SSL (only for testing, not recommended for production):
```env
MONGODB_URI=mongodb://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?ssl=true&authSource=admin
```

**Note**: MongoDB Atlas requires SSL, so this might not work. Use Solution 1-4 first.

## 🔍 Common Mistakes

### ❌ Wrong:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
# Missing database name!
```

### ✅ Correct:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
# Database name included: /taskmanagement?
```

---

## 🎯 Quick Fix Checklist

- [ ] Connection string has database name (`/taskmanagement?`)
- [ ] No spaces in connection string
- [ ] Special characters in password are URL encoded
- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0` or your IP
- [ ] Backend `.env` file is updated
- [ ] Backend server is restarted after changing `.env`
- [ ] `test-db.js` shows success

---

**After fixing, restart your backend server and try creating a task again!**

