//import some library
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

// Import routes
import adminRouter from './routes/adminRouter.js'

const app = express()

// Cấu hình CORS
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use routes
app.use('/admin', adminRouter) // All admin routes will have a prefix of /ad

export default app
