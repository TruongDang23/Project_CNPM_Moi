import express from 'express'
import datDichVuController from '../controllers/datDichVuController.js'
import authController from '../controllers/authController.js'

const datDichVuRouter = express.Router()

datDichVuRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    datDichVuController.getAll
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    datDichVuController.create
  )

datDichVuRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    datDichVuController.getByID
  )

// .patch(
//   authController.protect,
//   authController.restrictTo('admin'),
//   datDichVuController.update
// )
// .delete(
//   authController.protect,
//   authController.restrictTo('admin'),
//   datDichVuController.deleteByID
// )

export default datDichVuRouter
