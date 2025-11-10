# Complete Render Deployment Guide

Deploy your entire Todo List app (Frontend + Backend) on Render for FREE!

---

## Step 1: Setup MongoDB Atlas (Free Database) - 5 minutes

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email
3. Choose the FREE tier (M0)

### 1.2 Create Cluster
1. Click "Build a Database"
2. Choose "M0 FREE" tier
3. Select a region close to you
4. Click "Create Cluster"

### 1.3 Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `todouser` (or any name)
5. Password: Create a strong password (SAVE THIS!)
6. User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Allow Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://todouser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name at the end: `/todo`
   ```
   mongodb+srv://todouser:yourpassword@cluster0.xxxxx.mongodb.net/todo?retryWrites=true&w=majority
   ```
7. **SAVE THIS CONNECTION STRING!**

---

## Step 2: Deploy Backend on Render - 10 minutes

### 2.1 Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### 2.2 Create Backend Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `Todolist_FullStack_Project`
3. Configure the service:

   **Basic Settings:**
   - Name: `todolist-backend`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `server`
   - Runtime: `Node`
   
   **Build & Deploy:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   
   **Plan:**
   - Select "Free" plan

4. Click "Advanced" → "Add Environment Variable"
   - Key: `MONGODB_URI`
   - Value: Paste your MongoDB Atlas connection string
   
5. Click "Create Web Service"

### 2.3 Wait for Deployment
- Render will build and deploy (takes 5-10 minutes)
- Watch the logs for any errors
- When you see "Server is Running on port 3001" → Success! ✅

### 2.4 Copy Backend URL
- After deployment, you'll see a URL like:
  ```
  https://todolist-backend-xyz.onrender.com
  ```
- **COPY THIS URL!** You'll need it for the frontend

---

## Step 3: Update Frontend Configuration - 2 minutes

### 3.1 Update Environment Variable
1. Open `todolist/.env.production` in your project
2. Replace with your backend URL:
   ```
   VITE_API_URL=https://todolist-backend-xyz.onrender.com
   ```
3. Save the file

### 3.2 Push to GitHub
```bash
git add todolist/.env.production
git commit -m "Update backend URL for production"
git push
```

---

## Step 4: Deploy Frontend on Render - 5 minutes

### 4.1 Create Static Site
1. Go back to Render dashboard
2. Click "New +" → "Static Site"
3. Select your GitHub repository: `Todolist_FullStack_Project`
4. Configure:

   **Basic Settings:**
   - Name: `todolist-frontend`
   - Branch: `main`
   - Root Directory: `todolist`
   
   **Build Settings:**
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   
   **Plan:**
   - Select "Free" plan

5. Click "Create Static Site"

### 4.2 Wait for Deployment
- Takes 3-5 minutes
- Watch build logs
- When complete, you'll get a URL like:
  ```
  https://todolist-frontend-xyz.onrender.com
  ```

---

## Step 5: Test Your App! 🎉

1. Open your frontend URL: `https://todolist-frontend-xyz.onrender.com`
2. Try adding a task
3. Mark it as complete
4. Delete it
5. Refresh the page - tasks should persist!

**If everything works → Congratulations! Your app is live! 🚀**

---

## Troubleshooting

### Backend Issues

**Problem: "Cannot connect to MongoDB"**
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify MONGODB_URI in Render environment variables
- Check MongoDB user has correct permissions

**Problem: "Application failed to respond"**
- Check Render logs for errors
- Verify `npm start` command works locally
- Check PORT environment variable

### Frontend Issues

**Problem: "Cannot fetch todos"**
- Check VITE_API_URL in .env.production
- Verify backend is running (visit backend URL)
- Check browser console for CORS errors

**Problem: "Build failed"**
- Check build logs in Render
- Verify `npm run build` works locally
- Check all dependencies are in package.json

### CORS Issues
If you see CORS errors, verify `server/index.js` has:
```javascript
app.use(cors())
```

---

## Important Notes

### Free Tier Limitations
- Backend spins down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds (cold start)
- 750 hours/month free (enough for one service 24/7)

### Keeping Backend Awake (Optional)
Use a service like UptimeRobot to ping your backend every 10 minutes:
1. Go to https://uptimerobot.com
2. Add monitor with your backend URL
3. Set interval to 10 minutes

### Custom Domain (Optional)
Both frontend and backend support custom domains on Render's free tier!

---

## Summary

✅ **Database:** MongoDB Atlas (Free)
✅ **Backend:** Render Web Service (Free)
✅ **Frontend:** Render Static Site (Free)

**Your URLs:**
- Frontend: `https://todolist-frontend-xyz.onrender.com`
- Backend: `https://todolist-backend-xyz.onrender.com`
- Database: MongoDB Atlas Cloud

**Total Cost:** $0.00 🎉

---

## Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Check Render logs for detailed error messages
- Verify all environment variables are set correctly
