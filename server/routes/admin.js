//import express framework (bắt buộc)
import express from 'express'
import cors from 'cors'

const adminRoutes = (connMongo) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  router.get('/', async (req, res) => {
    res.send('admin routes')
  })

  return router
}

export default adminRoutes
