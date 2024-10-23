//import express framework (bắt buộc)
import express from 'express'
import cors from 'cors'
import { findMany, createHall, deleteHall, updateHall } from '../controller/hoitruong.js'

const hoitruongRoutes = () => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  //get list halls
  router.get('/', async(req, res) => {
    const data = await findMany()
    res.send(data)
  })

  //create one hall
  router.post('/', async(req, res) => {
    const { hallInf } = req.body
    const result = await createHall(hallInf)
    res.send(result)
  })

  //delete one hall
  router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const filter = { MaHoiTruong: id }
    const result = await deleteHall(filter)
    res.send(result)
  })

  //update one hall
  router.put('/:id', async(req, res) => {
    const id = req.params.id
    const filter = { MaHoiTruong: id }
    const { hallInf } = req.body
    const result = await updateHall(filter, hallInf)
    res.send(result)
  })
  return router
}

export default hoitruongRoutes
