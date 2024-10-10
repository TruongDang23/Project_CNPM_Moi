//import some library
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import mongo from './connMongo.js'
const connMongo = mongo()

// Import routes
import adminRoutes from './routes/admin.js'
import systemRoutes from './routes/system.js'

const admin = adminRoutes(connMongo) //Truyền các connection cần thiết vào các Route
const system = systemRoutes(connMongo)

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use routes
app.use('/ad', admin) // All admin routes will have a prefix of /ad
app.use('/', system)

// Cấu hình CORS
app.use(cors())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
