import NhacCong from '../models/nhaccong.js'
import catchAsync from '../utils/catchAsync.js'

const getAllNhacCong = catchAsync(async (req, res, next) => {
  const nhaccong = await NhacCong.find()
  res.status(200).json({
    status: 'success',
    data: {
      nhaccong
    }
  })
})

export default { getAllNhacCong }
