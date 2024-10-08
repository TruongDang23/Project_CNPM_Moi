//import some library
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import mongo from './connMongo.js'
const connMongo = mongo()

// Import routes
import adminRoutesFunction from './routes/admin.js'
const adminRoutes = adminRoutesFunction(connMongo) //Truyền các connection cần thiết vào các Route

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use routes
app.use('/ad', adminRoutes) // All admin routes will have a prefix of /ad

// Cấu hình CORS
app.use(cors())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
