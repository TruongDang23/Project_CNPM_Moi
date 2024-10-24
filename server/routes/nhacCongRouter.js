import express from 'express'
import nhacCongController from '../controllers/nhacCongController.js'
import authController from '../controllers/authController.js'

const nhacCongRouter = express.Router()

nhacCongRouter.get(
  '/',
  authController.protect,
  nhacCongController.getAllNhacCong
)

export default nhacCongRouter
