import express from 'express'
import khachhangController from '../controllers/khachHangController.js'
import authController from '../controllers/authController.js'

const khachhangRouter = express.Router()

khachhangRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    khachhangController.getAll
  )
// .post(
//   authController.protect,
//   authController.restrictTo('admin'),
//   khachhangController.create
// )

khachhangRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    khachhangController.getByID
  )

  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    khachhangController.update
  )


// .delete(
//   authController.protect,
//   authController.restrictTo('admin'),
//   khachhangController.deleteByID
// )

export default khachhangRouter
