import DatDichVu from '../models/datdichvu.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAll = catchAsync(async (req, res, next) => {
  const dichvu = await DatDichVu.find().sort({ MaDDV: 1 })
  res.status(200).json({
    dichvu
  })
})

const getByID = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const dichvu = await DatDichVu.findOne({ MaDDV: req.params.id })
    if (!dichvu) {
      return next(new AppError('Không tìm thấy đơn đặt hàng với mã này', 404))
    }
    res.status(200).json({
      dichvu
    })
  }
})

const create = catchAsync(async (req, res, next) => {
  // Lấy số lượng nhạc công hiện có để sinh mã mới
  const datdichvuCount = await DatDichVu.countDocuments()

  // Tạo mã MaHoiTruong theo định dạng "Hxxx", ví dụ "H001", "H002", ...
  const newMaDatDichVu = `D${String(datdichvuCount + 1).padStart(3, '0')}`

  // Thêm MaHoiTruong vào dữ liệu từ req.body
  const newDatDichVu = await DatDichVu.create({
    MaDDV: newMaDatDichVu, // Mã tự động sinh
    MaTK: req.body.MaTK,
    ThoiDiemDat: req.body.ThoiDiemDat,
    ThoiDiemBatDau: req.body.ThoiDiemBatDau,
    ThoiDiemKetThuc: req.body.ThoiDiemKetThuc,
    SoGio: req.body.SoGio,
    TrangThai: req.body.TrangThai,
    DichVu: req.body.DichVu,
    Note: req.body.Note
  })

  if (!newDatDichVu) {
    return next(new AppError('Tạo mới đơn đặt hàng không thành công', 404))
  }
  res.status(201).send()
})

// const update = catchAsync(async (req, res, next) => {
//   const updateHoiTruong = await HoiTruong.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true, // Trả về document mới sau khi cập nhật
//       runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
//     }
//   )

//   if (!updateHoiTruong) {
//     return next(new AppError('Không tìm thấy hội trường với mã này', 404))
//   }
//   res.status(200).send()
// })

// const deleteByID = catchAsync(async (req, res, next) => {
//   // Xóa ở đây là chuyển Active từ true sang false, tìm theo MaHoiTruong
//   const hoitruong = await HoiTruong.findOneAndUpdate(
//     { MaHoiTruong: req.params.id },
//     { Active: false },
//     {
//       new: true, // Trả về document mới sau khi cập nhật
//       runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
//     }
//   )

//   if (!hoitruong) {
//     return next(new AppError('Không tìm thấy hội trường với ID này', 404))
//   }

//   res.status(204).send()
// })

export default {
  getAll,
  getByID,
  create
  // update,
  // deleteByID
}
