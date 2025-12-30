# 🚀 Quick Deployment Checklist

## Step 1: Commit & Push Code to GitHub

```bash
# In your project root
git add .
git commit -m "Add authentication, forgot password, mobile navbar, and footer"
git push origin main
```

---

## Step 2: Backend Deployment (Render)

### Environment Variables to Set in Render:

Go to: **Render Dashboard → Your Backend Service → Environment**

Add/Update these variables:

```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=https://your-frontend.vercel.app

# NEW: Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-gmail-app-password
EMAIL_SERVICE=gmail
```

**Note:** `package.json` already includes `nodemailer`, so Render will auto-install it.

### Deploy:
- Render will auto-deploy when you push to GitHub
- OR manually: Deployments → Deploy latest commit
- Wait for build to complete (check Logs tab)

---

## Step 3: Frontend Deployment (Vercel)

### Environment Variable to Set in Vercel:

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add/Update:

```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

**Important:** Include `/api` at the end!

### Deploy:
- Vercel will auto-deploy when you push to GitHub
- OR manually: Deployments → ... → Redeploy
- Wait for build to complete

---

## Step 4: Setup Gmail App Password (If Not Done)

1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to: https://myaccount.google.com/apppasswords
4. Generate app password for "Mail"
5. Copy 16-character password
6. Add to Render: `EMAIL_PASSWORD`

---

## Step 5: Test Everything

### Backend Test:
```
https://your-backend.onrender.com/api/health
```
Should return: `{"status":"OK"}`

### Frontend Test:
1. Visit: `https://your-frontend.vercel.app`
2. Test Register
3. Test Login
4. Test Create Task
5. Test Forgot Password (check email)
6. Test Mobile View (navbar)

---

## ✅ Done!

If everything works, you're successfully deployed! 🎉

