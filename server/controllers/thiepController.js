import ThiepMoi from '../models/thiepmoi.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAllThiep = catchAsync(async (req, res, next) => {
  const thiep = await ThiepMoi.find()
  res.status(200).json({
    status: 'success',
    thiep
  })
})

const getThiep = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const thiep = await ThiepMoi.findOne({ MaThiep: req.params.id })
    if (!thiep) {
      return next(new AppError('Không tìm thấy thiệp với mã này', 404))
    }
    res.status(200).json({
      thiep
    })
  }
})

const createThiep = catchAsync(async (req, res, next) => {
  // Lấy số lượng thiệp hiện có để sinh mã mới
  const thiepCount = await ThiepMoi.countDocuments()

  // Tạo mã MaThiep theo định dạng "Txxx", ví dụ "T001", "T002", ...
  const newMaThiep = `T${String(thiepCount + 1).padStart(3, '0')}`

  // Thêm MaThiep vào dữ liệu từ req.body
  const newThiep = await ThiepMoi.create({
    MaThiep: newMaThiep, // Mã tự động sinh
    LoaiThiep: req.body.LoaiThiep,
    Gia: req.body.Gia,
    HinhAnh: req.body.HinhAnh
  })

  res.status(201).json({
    status: 'success',
    data: {
      thiep: newThiep
    }
  })
})

const updateThiep = catchAsync(async (req, res, next) => {
  const updatedThiep = await ThiepMoi.findOneAndUpdate(
    { MaThiep: req.params.id },
    req.body,
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!updatedThiep) {
    return next(new AppError('Không tìm thấy thiệp với ID này', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      thiep: updatedThiep
    }
  })
})

const deleteThiep = catchAsync(async (req, res, next) => {
  // Xóa ở đây là chuyển Active từ true sang false, tìm theo MaThiep
  const thiep = await ThiepMoi.findOneAndUpdate(
    { MaThiep: req.params.id },
    { Active: false },
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!thiep) {
    return next(new AppError('Không tìm thấy thiệp với ID này', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null // 204 No Content, không cần trả về dữ liệu
  })
})

export default {
  getAllThiep,
  getThiep,
  createThiep,
  updateThiep,
  deleteThiep
}
