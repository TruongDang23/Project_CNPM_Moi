//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

const mongo = require('mongoose')

module.exports = (connMongo) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  router.post('/updateInformation', async (req, res) => {
    
  })

  router.get('/loadMyLearning', async (req, res) => {
    
  })

  return router
}