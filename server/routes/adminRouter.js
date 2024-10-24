//import express framework (bắt buộc)
import express from 'express'
import cors from 'cors'
import authController from '../controllers/authController.js'

const adminRouter = express.Router()
adminRouter.use(cors())

adminRouter.post('/login', authController.login)

export default adminRouter
