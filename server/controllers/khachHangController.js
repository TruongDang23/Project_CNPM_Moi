import KhachHang from '../models/khachhang.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAll = catchAsync(async (req, res, next) => {
  const khachhang = await KhachHang.find().sort({ MaTK: 1 })
  res.status(200).json({
    khachhang
  })
})

const getByID = catchAsync(async (req, res, next) => {
  const khachhang = await KhachHang.findOne({ MaTK: req.params.id })

  if (!khachhang) {
    return next(new AppError('Khách hàng không tồn tại', 404))
  }
  res.status(200).json({
    khachhang
  })
})

const update = catchAsync(async (req, res, next) => {
  const updateKhachHang = await KhachHang.findOneAndUpdate(
    { MaTK: req.params.id },
    req.body,
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!updateKhachHang) {
    return next(new AppError('Không tìm thấy khách hàng với mã này', 404))
  }
  res.status(200).json({
    updateKhachHang
  })
})

// const create = catchAsync(async (req, res, next) => {
//   // Lấy số lượng nhạc công hiện có để sinh mã mới
//   const comboCount = await Combo.countDocuments()

//   // Tạo mã MaHoiTruong theo định dạng "Hxxx", ví dụ "H001", "H002", ...
//   const newMaCombo = `C${String(comboCount + 1).padStart(3, '0')}`

//   // Thêm MaHoiTruong vào dữ liệu từ req.body
//   const newCombo = await Combo.create({
//     MaCombo: newMaCombo, // Mã tự động sinh
//     TenCombo: req.body.TenCombo,
//     LoaiCombo: req.body.LoaiCombo,
//     Gia: req.body.Gia,
//     DanhSachMonAn: req.body.DanhSachMonAn,
//     Active: req.body.Active,
//     HinhAnh: req.body.HinhAnh
//   })

//   if (!newCombo) {
//     return next(new AppError('Tạo mới combo không thành công', 404))
//   }
//   res.status(201).send()
// })

// const update = catchAsync(async (req, res, next) => {
//   const updateCombo = await Combo.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true, // Trả về document mới sau khi cập nhật
//       runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
//     }
//   )

//   if (!updateCombo) {
//     return next(new AppError('Không tìm thấy combo với mã này', 404))
//   }
//   res.status(200).send()
// })

// const deleteByID = catchAsync(async (req, res, next) => {
//   // Xóa ở đây là chuyển Active từ true sang false, tìm theo MaHoiTruong
//   const combo = await Combo.findOneAndUpdate(
//     { MaCombo: req.params.id },
//     { Active: false },
//     {
//       new: true, // Trả về document mới sau khi cập nhật
//       runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
//     }
//   )

//   if (!combo) {
//     return next(new AppError('Không tìm thấy combo với ID này', 404))
//   }

//   res.status(204).send()
// })

export default {
  getAll,
  getByID,
  // create,
  update
  // deleteByID
}
