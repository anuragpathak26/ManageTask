import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'

import userRouter from './routers/userRoute.js'
import taskRouter from './routers/taskRoute.js'

const app = express()
const port = process.env.PORT || 4000


app.use(cors({
  origin: "http://localhost:5173",  // React dev server (Vite)
  credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


connectDB()


app.use("/api/user", userRouter)
app.use("/api/tasks", taskRouter)

app.get('/', (req, res) => {
  res.send('API WORKING ')
})


app.listen(port, () => {
  console.log(` Server Started on http://localhost:${port}`)
})
