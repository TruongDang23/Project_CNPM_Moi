//import express framework (bắt buộc)
import express from 'express'
import authController from '../controllers/authController.js'

const adminRouter = express.Router()

adminRouter.post('/login', authController.login)

export default adminRouter
