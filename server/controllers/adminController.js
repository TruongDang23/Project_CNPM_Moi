import Admin from '../models/admin.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import HoiTruong from '../models/hoitruong.js'
import DatDichVu from '../models/datdichvu.js'
import MC from '../models/mc.js'
import Combo from '../models/combo.js'
import NhacCong from '../models/nhaccong.js'
import Thiep from '../models/thiepmoi.js'

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

const getCount = catchAsync(async (req, res, next) => {
  const count = {
    hoiTruongActive: await HoiTruong.countDocuments({ Active: true }),
    hoiTruongUnactive: await HoiTruong.countDocuments({ Active: false }),
    datDichVu: await DatDichVu.countDocuments(),
    mc: await MC.countDocuments({ Active: true }),
    combo: await Combo.countDocuments({ Active: true }),
    nhacCong: await NhacCong.countDocuments({ Active: true }),
    thiep: await Thiep.countDocuments({ Active: true })
  }

  res.status(200).json({
    count
  })
})

export default { getByID, getCount }
