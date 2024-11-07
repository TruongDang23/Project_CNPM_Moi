//import express framework (bắt buộc)
import express from 'express'
import authController from '../controllers/authController.js'
import adminController from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.getByID
  )

export default adminRouter
