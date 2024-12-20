import NhacCong from '../models/nhaccong.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAllNhacCong = catchAsync(async (req, res) => {
  const {
    searchTerm,
    instrument,
    price,
    status,
    page = 1,
    limit = 10
  } = req.query

  let query = {}
  if (req.user.MaTK[0] === 'U')
    query.Active = "true"

  if (searchTerm) {
    query.HoTen = { $regex: searchTerm, $options: 'i' }
  }

  if (instrument) {
    query.LoaiNhacCu = instrument
  }

  if (status) {
    query.TinhTrang = status === 'true'
  }

  let nhaccongQuery = NhacCong.find(query)
  nhaccongQuery = nhaccongQuery.sort({ MaNhacCong: 1 })
  // Chuyển đổi giá trị của `price` thành số nguyên và đảm bảo là 1 hoặc -1
  const sortPrice = price === '1' ? 1 : price === '-1' ? -1 : null;
  if (sortPrice !== null) {
    nhaccongQuery = nhaccongQuery.sort({ Gia: sortPrice });
  }

  const totalNhacCong = await NhacCong.countDocuments(query)
  const totalPages = Math.ceil(totalNhacCong / limit)

  nhaccongQuery = nhaccongQuery.skip((page - 1) * limit).limit(limit)

  const nhaccong = await nhaccongQuery

  res.status(200).json({
    status: 'success',
    nhaccong,
    totalNhacCong,
    totalPages
  })
})

const getNhacCong = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const nhaccong = await NhacCong.findOne({ MaNhacCong: req.params.id })
    if (!nhaccong) {
      return next(new AppError('Không tìm thấy nhạc công với mã này', 404))
    }
    res.status(200).json({
      nhaccong
    })
  }
})

const createNhacCong = catchAsync(async (req, res) => {
  // Lấy số lượng nhạc công hiện có để sinh mã mới
  const nhacCongCount = await NhacCong.countDocuments()

  // Tạo mã MaNhacCong theo định dạng "Nxxx", ví dụ "N001", "N002", ...
  const newMaNhacCong = `N${String(nhacCongCount + 1).padStart(3, '0')}`

  // Thêm MaNhacCong vào dữ liệu từ req.body
  const newNhacCong = await NhacCong.create({
    MaNhacCong: newMaNhacCong, // Mã tự động sinh
    HoTen: req.body.HoTen,
    SDT: req.body.SDT,
    KinhNghiem: req.body.KinhNghiem,
    LoaiNhacCu: req.body.LoaiNhacCu,
    TinhTrang: req.body.TinhTrang,
    Gia: req.body.Gia,
    DanhGia: req.body.DanhGia,
    HinhAnh: req.body.HinhAnh
  })

  res.status(201).json({
    status: 'success',
    data: {
      nhaccong: newNhacCong
    }
  })
})

const updateNhacCong = catchAsync(async (req, res, next) => {
  const updatedNhacCong = await NhacCong.findOneAndUpdate(
    { MaNhacCong: req.params.id },
    req.body,
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!updatedNhacCong) {
    return next(new AppError('Không tìm thấy nhạc công với ID này', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      nhaccong: updatedNhacCong
    }
  })
})

const deleteNhacCong = catchAsync(async (req, res, next) => {
  // Xóa ở đây là chuyển Active từ true sang false, tìm theo MaNhacCong
  const nhaccong = await NhacCong.findOneAndUpdate(
    { MaNhacCong: req.params.id },
    { Active: false, TinhTrang: false },
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!nhaccong) {
    return next(new AppError('Không tìm thấy nhạc công với ID này', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null // 204 No Content, không cần trả về dữ liệu
  })
})

const rating = catchAsync(async (req, res, next) => {
  const nc = await NhacCong.findOne(
    { MaNhacCong: req.params.id }
  );

  const content = req.body

  if (!nc) {
    return next(new AppError('Không tìm thấy Nhạc công với ID này', 404));
  }

  nc.DanhGia.push(content)
  await nc.save()
  res.status(200).send()
});
export default {
  getAllNhacCong,
  getNhacCong,
  createNhacCong,
  updateNhacCong,
  deleteNhacCong,
  rating
}
