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
  const dondathang = await DatDichVu.findOne({ MaDDV: req.params.id })
  if (!dondathang) {
    return next(new AppError('Không tìm thấy đơn đặt hàng với mã này', 404))
  }
  res.status(200).json({
    status: 'success',
    data: { dondathang }
  })
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
  getAllDonDatHang,
  getDonDatHangByID,
  updateDonDatHang,
  acceptOrRejectDonDatHang
}