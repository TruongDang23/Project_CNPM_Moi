//import express framework (bắt buộc)
import express from 'express'
import cors from 'cors'
import taikhoan from '../models/taikhoan.js'

const adminRoutes = (connMongo) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  router.post('/login', async (req, res) => {
    const data = req.body
    try {
      await connMongo
      const result = await taikhoan.find({
        UserName: data.username,
        Pass: data.pass
      })
      if (result.length != 0) res.send(result[0].MaTK)
      else res.send('not found')
    } catch (err) {
      console.log(err)
      res.send('error')
    }
  })

  return router
}

export default adminRoutes
