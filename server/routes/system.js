//API route system
//import express framework (bắt buộc)
import express from 'express'
import cors from 'cors'
import { findOne } from '../controller/taikhoan.js'

const systemRoutes = () => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  router.post('/login', async (req, res) => {
    const data = req.body
    const filter = {
      UserName: data.username,
      Pass: data.pass
    }
    const account = await findOne(filter)
    res.send(account)
  })

  return router
}

export default systemRoutes
