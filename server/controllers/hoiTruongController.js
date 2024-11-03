import HoiTruong from '../models/hoitruong.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAll = catchAsync(async (req, res, next) => {
  const hoitruong = await HoiTruong.find().sort({ MaHoiTruong: 1 })
  res.status(200).json({
    hoitruong
  })
})

const getByID = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const hoitruong = await HoiTruong.findOne({ MaHoiTruong: req.params.id })
    if (!hoitruong) {
      return next(new AppError('Không tìm thấy hội trường với mã này', 404))
    }
    res.status(200).json({
      hoitruong
    })
  }
})

const create = catchAsync(async (req, res, next) => {
  // Lấy số lượng nhạc công hiện có để sinh mã mới
  const hoitruongCount = await HoiTruong.countDocuments()

  // Tạo mã MaHoiTruong theo định dạng "Hxxx", ví dụ "H001", "H002", ...
  const newMaNhacCong = `H${String(hoitruongCount + 1).padStart(3, '0')}`

  // Thêm MaHoiTruong vào dữ liệu từ req.body
  const newHoiTruong = await HoiTruong.create({
    MaHoiTruong:  newMaNhacCong, // Mã tự động sinh
    TenHoiTruong: req.body.TenHoiTruong,
    SucChua:      req.body.SucChua,
    Wifi:         req.body.Wifi,
    MoTa:         req.body.MoTa,
    MayLanh:      req.body.MayLanh,
    PhongKin:     req.body.PhongKin,
    DienTich:     req.body.DienTich,
    SoPhong:      req.body.SoPhong,
    ViTriLau:     req.body.ViTriLau,
    Gia:          req.body.Gia,
    TinhTrang:    req.body.TinhTrang,
    HinhAnh:      req.body.HinhAnh
  })

  if (!newHoiTruong) {
    return next(new AppError('Tạo mới hội trường không thành công', 404))
  }
  res.status(201).send()
})

const update = catchAsync(async (req, res, next) => {
  const updateHoiTruong = await HoiTruong.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!updateHoiTruong) {
    return next(new AppError('Không tìm thấy hội trường với mã này', 404))
  }
  res.status(200).send()
})

const deleteByID = catchAsync(async (req, res, next) => {
  // Xóa ở đây là chuyển Active từ true sang false, tìm theo MaHoiTruong
  const hoitruong = await HoiTruong.findOneAndUpdate(
    { MaHoiTruong: req.params.id },
    { Active: false },
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!hoitruong) {
    return next(new AppError('Không tìm thấy hội trường với ID này', 404))
  }

  res.status(204).send()
})

export default {
  getAll,
  getByID,
  create,
  update,
  deleteByID
}
