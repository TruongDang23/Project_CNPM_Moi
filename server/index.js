//import some library
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const mongo = require('./connMongo')
const connMongo = mongo()

// Import routes
const adminRoutes = require('./routes/admin')(connMongo) //Truyền các connection cần thiết vào các Route

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