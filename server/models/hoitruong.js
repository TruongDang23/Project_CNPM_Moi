const mongoose = require('mongoose');

const hoiTruongSchema = new mongoose.Schema({
  MaHoiTruong: {
    type: String,
    required: [true, 'Mã hội trường không được để trống'],
    maxlength: [4, 'Mã hội trường không được vượt quá 4 ký tự'],
    minlength: [2, 'Mã hội trường phải có ít nhất 2 ký tự']
  },
  TenHoiTruong: {
    type: String,
    required: [true, 'Tên hội trường không được để trống'],
    maxlength: [100, 'Tên hội trường không được vượt quá 100 ký tự']
  },
  MoTa: {
    type: String,
    required: [true, 'Mô tả không được để trống'],
    maxlength: [100, 'Mô tả không được vượt quá 100 ký tự']
  },
  SucChua: {
    type: Number,
    required: [true, 'Sức chứa không được để trống'],
    min: [1, 'Sức chứa phải lớn hơn 0']
  },
  Wifi: {
    type: Boolean,
    required: [true, 'Phải xác định có wifi hay không']
  },
  MayLanh: {
    type: Boolean,
    required: [true, 'Phải xác định có máy lạnh hay không']
  },
  PhongKin: {
    type: Boolean,
    required: [true, 'Phải xác định hội trường là phòng kín hay ngoài trời']
  },
  DienTich: {
    type: Number,
    required: [true, 'Diện tích không được để trống'],
    min: [10, 'Diện tích phải lớn hơn hoặc bằng 10 m²']
  },
  SoPhong: {
    type: String,
    required: [true, 'Số phòng không được để trống'],
    maxlength: [4, 'Số phòng không được vượt quá 4 ký tự']
  },
  ViTriLau: {
    type: String,
    required: [true, 'Vị trí lầu không được để trống'],
    enum: {
      values: ['G', 'A1'],
      message: 'Vị trí lầu chỉ có thể là "G" hoặc "A1"'
    }
  },
  Gia: {
    type: Number,
    required: [true, 'Giá thuê không được để trống'],
    min: [0, 'Giá thuê phải là số dương hoặc bằng 0']
  },
  TinhTrang: {
    type: Boolean,
    required: [true, 'Tình trạng hoạt động không được để trống']
  },
  HinhAnh: {
    type: [String], // Mảng các URL hình ảnh
    required: [true, 'Phải cung cấp ít nhất một hình ảnh']
  }
});

// Tạo model cho HoiTruong
const HoiTruong = mongoose.model('HoiTruong', hoiTruongSchema, 'HoiTruong');

// Xuất model để sử dụng ở nơi khác
module.exports = HoiTruong;
