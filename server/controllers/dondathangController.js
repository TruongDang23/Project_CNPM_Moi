import DatDichVu from '../models/datdichvu.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
// Get all orders
const getAllDonDatHang = catchAsync(async (req, res, next) => {
  const dondathang = await DatDichVu.find().sort({ MaDDV: 1 })
  res.status(200).json({
    dondathang
  })
})

// Get order by ID
const getDonDatHangByID = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const dondathang = await DatDichVu.findOne({ MaDDV: req.params.id })
    if (!dondathang) {
      return next(new AppError('Không tìm thấy đơn đặt hàng với mã này', 404))
    }
    res.status(200).json({
      status: 'success',
      data: { dondathang }
    })
  }
})


// Update an order by ID
const updateDonDatHang = catchAsync(async (req, res, next) => {
  const dondathang = await DatDichVu.findOneAndUpdate(
    { MaDDV: req.params.id },
    { TrangThai: true },
    { new: true, runValidators: true }
  )

  if (!dondathang) {
    return next(new AppError('Không tìm thấy đơn đặt hàng với mã này', 404))
  }

  res.status(204).json({ status: 'success', data: null })
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

// Accept or Reject an order by ID
const acceptOrRejectDonDatHang = catchAsync(async (req, res, next) => {
  const { action } = req.body; // Lấy `action` từ `req.body`

  // Kiểm tra giá trị của action, nếu là "accept" thì cập nhật `Active: true`, nếu là "reject" thì cập nhật `Active: false`
  const updateData = action === 'accept' ? { Active: true } : { Active: false };

  const dondathang = await DatDichVu.findOneAndUpdate(
    { MaDDV: req.params.id },
    updateData,
    { new: true, runValidators: true }
  );

  if (!dondathang) {
    return next(new AppError('Không tìm thấy đơn đặt hàng với mã này', 404));
  }

  const message = action === 'accept' ? 'Đơn đặt hàng đã được chấp nhận' : 'Đơn đặt hàng đã bị từ chối';
  res.status(200).json({
    status: 'success',
    message,
    data: { dondathang }
  });
});

export default {
  create,
  getAllDonDatHang,
  getDonDatHangByID,
  updateDonDatHang,
  acceptOrRejectDonDatHang
}