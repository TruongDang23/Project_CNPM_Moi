const mongoose = require('mongoose');

const thiepSchema = new mongoose.Schema({
  MaThiep: {
    type: String,
    required: [true, 'Mã thiệp không được để trống'],
    maxlength: [4, 'Mã thiệp không được vượt quá 4 ký tự']
  },
  LoaiThiep: {
    type: String,
    required: [true, 'Loại thiệp không được để trống'],
    maxlength: [20, 'Loại thiệp không được vượt quá 20 ký tự']
  },
  Gia: {
    type: Number,
    required: [true, 'Giá không được để trống'],
    min: [0, 'Giá phải là số dương hoặc bằng 0']
  },
  HinhAnh: {
    type: [String], // Mảng các URL hình ảnh
    required: [true, 'Phải cung cấp ít nhất một hình ảnh']
  }
});

// Tạo model cho Thiep
const Thiep = mongoose.model('Thiep', thiepSchema, 'Thiep');

// Xuất model để sử dụng ở nơi khác
module.exports = Thiep;
