import Admin from '../models/admin.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getByID = catchAsync(async (req, res, next) => {
  const admin = await Admin.findOne({ MaTK: req.params.id })

  if (!admin) {
    // trả về lỗi nếu không tìm thấy admin
    return next(new AppError('Admin không tồn tại', 404))
  }
  res.status(200).json({
    admin
  })
})

export default { getByID }
