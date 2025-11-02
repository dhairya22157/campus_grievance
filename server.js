import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import grievanceRoutes from './routes/grievances.js'
import userRoutes from './routes/user.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/grievances', grievanceRoutes)
app.use('/api/user', userRoutes)

// health
app.get('/api/health', (req,res)=>res.json({ ok: true }))

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
console.log("Connecting to:", process.env.MONGO_URI); 

async function start(){
  if(!process.env.MONGO_URI){
    console.error('MONGO_URI not found in env. Please set it in .env')
    process.exit(1)
  }
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, ()=>{
    console.log(`✅ Server running on PORT ${PORT}`)
  })
}

start()
