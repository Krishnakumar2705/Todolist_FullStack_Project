# Deployment Guide

## Step 1: Setup MongoDB Atlas (Free Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/todo`)
6. Replace `<password>` with your actual password

## Step 2: Deploy Backend to Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** todo-backend (or any name)
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `PORT` = 3001 (optional, Render sets this automatically)
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://todo-backend-xyz.onrender.com`)

## Step 3: Update Frontend Environment Variable

1. Open `todolist/.env.production`
2. Replace with your Render backend URL:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
3. Save the file

## Step 4: Deploy Frontend to Netlify

### Option A: Netlify CLI
```bash
cd todolist
npm run build
netlify deploy --prod --dir=dist
```

### Option B: Netlify Dashboard
1. Go to https://app.netlify.com
2. Drag and drop the `todolist/dist` folder
3. Or connect GitHub repo:
   - Base directory: `todolist`
   - Build command: `npm run build`
   - Publish directory: `todolist/dist`

## Step 5: Test Your App

1. Open your Netlify URL
2. Try adding, completing, and deleting tasks
3. Refresh the page - tasks should persist

## Troubleshooting

**Backend not connecting:**
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for all IPs)
- Verify MONGODB_URI in Render environment variables

**Frontend can't reach backend:**
- Check CORS is enabled in server/index.js
- Verify VITE_API_URL in .env.production
- Check Render backend logs for errors

**Build fails:**
- Make sure all dependencies are in package.json
- Check build logs for specific errors

## Environment Variables Summary

### Local Development:
- `todolist/.env`: `VITE_API_URL=http://localhost:3001`
- `server/.env`: `MONGODB_URI=mongodb://localhost:27017/todo`

### Production:
- **Netlify**: Uses `todolist/.env.production`
- **Render**: Set `MONGODB_URI` in dashboard
