import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import MC from '../models/mc.js'

const getAllMC = catchAsync(async (req, res, next) => {
  const mc = await MC.find().sort({ MaMC: 1 });
  res.status(200).json({
    status: 'success',
    mc
  });
});

const getMC = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const mc = await MC.findOne({ MaMC: req.params.id })
    if (!mc) {
      return next(new AppError('Không tìm thấy MC với mã này', 404))
    }
    res.status(200).json({
      mc
    })
  }
})

const createMC = catchAsync(async (req, res, next) => {
  // Get current MC count to generate new MaMC
  const mcCount = await MC.countDocuments();

  // Generate MaMC in the format "Mxxx", e.g., "M001", "M002", ...
  const newMaMC = `M${String(mcCount + 1).padStart(3, '0')}`;

  // Add MaMC to the data from req.body
  const newMC = await MC.create({
    MaMC: newMaMC, // Automatically generated ID
    HoTen: req.body.HoTen,
    SDT: req.body.SDT,
    KinhNghiem: req.body.KinhNghiem,
    TinhTrang: req.body.TinhTrang,
    Gia: req.body.Gia,
    DanhGia: req.body.DanhGia,
    HinhAnh: req.body.HinhAnh
  });

  res.status(201).json({
    status: 'success',
    data: {
      mc: newMC
    }
  });
});

const updateMC = catchAsync(async (req, res, next) => {
  const updatedMC = await MC.findOneAndUpdate(
    { MaMC: req.params.id },
    req.body,
    {
      new: true, // Return the updated document
      runValidators: true // Run validators to ensure valid data
    }
  );

  if (!updatedMC) {
    return next(new AppError('Không tìm thấy MC với ID này', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      mc: updatedMC
    }
  });
});

const deleteMC = catchAsync(async (req, res, next) => {
  // Soft delete by setting Active to false, find by MaMC
  const mc = await MC.findOneAndUpdate(
    { MaMC: req.params.id },
    { Active: false },
    {
      new: true, // Return the updated document
      runValidators: true // Run validators to ensure valid data
    }
  );

  if (!mc) {
    return next(new AppError('Không tìm thấy MC với ID này', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null // 204 No Content, no data to return
  });
});

export default {
  getAllMC,
  getMC,
  createMC,
  updateMC,
  deleteMC
};
