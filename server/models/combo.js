const mongoose = require('mongoose');

// Schema cho từng món ăn trong combo (chỉ cần tên món ăn và hình ảnh)
const monAnSchema = new mongoose.Schema({
  TenMonAn: {
    type: String,
    required: [true, 'Tên món ăn không được để trống'],
    maxlength: [100, 'Tên món ăn không được vượt quá 100 ký tự']
  },
  HinhAnh: {
    type: String,
    match: [/^https?:\/\/.*\.(jpg|jpeg|png)$/, 'Hình ảnh phải là một URL hợp lệ'] // Đảm bảo là URL hợp lệ
  }
});

// Schema cho combo món ăn
const comboSchema = new mongoose.Schema({
  MaCombo: {
    type: String,
    required: [true, 'Mã combo không được để trống'],
    unique: true,
    maxlength: [10, 'Mã combo không được vượt quá 10 ký tự']
  },
  TenCombo: {
    type: String,
    required: [true, 'Tên combo không được để trống'],
    maxlength: [100, 'Tên combo không được vượt quá 100 ký tự']
  },
  MoTa: {
    type: String,
    maxlength: [200, 'Mô tả không được vượt quá 200 ký tự'],
    default: ''
  },
  GiaCombo: {
    type: Number,
    required: [true, 'Giá combo không được để trống'],
    min: [0, 'Giá combo phải là số dương hoặc bằng 0']
  },
  MonAn: {
    type: [monAnSchema], // Mảng các món ăn chỉ bao gồm tên và hình ảnh
    required: [true, 'Phải có ít nhất một món ăn trong combo']
  },
  TinhTrang: {
    type: Boolean,
    required: [true, 'Tình trạng combo không được để trống'],
    default: true // Combo đang hoạt động hoặc không
  },
  Note: {
    type: String,
    maxlength: [200, 'Ghi chú không được vượt quá 200 ký tự'],
    default: '' // Trường ghi chú thêm cho combo
  }
});

// Tạo model cho Combo
const Combo = mongoose.model('Combo', comboSchema, 'Combo');

// Xuất model để sử dụng ở nơi khác
module.exports = Combo;
