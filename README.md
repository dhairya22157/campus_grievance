# Campus Grievance Portal (Full-stack)

This repository contains a frontend and backend for a Campus Grievance Redressal Portal prototype.

Structure
```
/campus_portal
	/frontend    # React + Vite + Tailwind frontend
	/backend     # Node.js + Express + MongoDB backend
```

Quick start

1. Backend
```powershell
cd backend
cp .env.example .env
# edit .env to set MONGO_URI and JWT_SECRET
npm install
npm run dev
```

2. Frontend
```powershell
cd frontend
# copy example env if needed and edit VITE_API_BASE_URL
npm install
npm run dev
```

Deployment
- Frontend can be deployed to Vercel using the `build` output and setting `VITE_API_BASE_URL`.
- Backend can be deployed to Render/Railway using environment variables.

Notes
- Backend uses JWT auth; frontend stores JWT in localStorage under `token` and sends it in Authorization header.
- This is a prototype; secure storage and refresh tokens are recommended for production.

