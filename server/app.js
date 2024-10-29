//import some library
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

// Import routes
import adminRouter from './routes/adminRouter.js'
import nhacCongRouter from './routes/nhacCongRouter.js'

const app = express()

// Cấu hình CORS
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware log thời gian xử lý request
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`Request to ${req.originalUrl} took ${duration}ms`)
  })
  next()
})

// Use routes
app.use('/api/admin', adminRouter) // All admin routes will have a prefix of /ad
app.use('/api/nhaccong', nhacCongRouter) // All nhaccong routes will have a prefix of /nhaccong

export default app
