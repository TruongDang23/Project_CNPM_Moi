const mongoose = require('mongoose');

const danhGiaSchema = new mongoose.Schema({
  HoTen: {
    type: String,
    required: [true, 'Họ tên người đánh giá không được để trống'],
    maxlength: [50, 'Họ tên không được vượt quá 50 ký tự']
  },
  SDT: {
    type: String,
    required: [true, 'Số điện thoại người đánh giá không được để trống'],
    match: [/^\d{10,11}$/, 'Số điện thoại phải gồm 10 đến 11 chữ số']
  },
  SoSao: {
    type: Number,
    required: [true, 'Số sao đánh giá không được để trống'],
    min: [1, 'Số sao phải ít nhất là 1'],
    max: [5, 'Số sao tối đa là 5']
  },
  BinhLuan: {
    type: String,
    maxlength: [200, 'Bình luận không được vượt quá 200 ký tự']
  }
});

const nhacCongSchema = new mongoose.Schema({
  MaNhacCong: {
    type: String,
    required: [true, 'Mã nhạc công không được để trống'],
    maxlength: [4, 'Mã nhạc công không được vượt quá 4 ký tự'],
    minlength: [2, 'Mã nhạc công phải có ít nhất 2 ký tự']
  },
  HoTen: {
    type: String,
    required: [true, 'Họ tên không được để trống'],
    maxlength: [50, 'Họ tên không được vượt quá 50 ký tự']
  },
  SDT: {
    type: String,
    required: [true, 'Số điện thoại không được để trống'],
    match: [/^\d{10,11}$/, 'Số điện thoại phải gồm 10 đến 11 chữ số']
  },
  KinhNghiem: {
    type: Number,
    required: [true, 'Kinh nghiệm không được để trống'],
    min: [0, 'Kinh nghiệm phải là số dương hoặc bằng 0']
  },
  LoaiNhacCu: {
    type: String,
    required: [true, 'Loại nhạc cụ không được để trống'],
    maxlength: [30, 'Loại nhạc cụ không được vượt quá 30 ký tự']
  },
  TinhTrang: {
    type: Boolean,
    required: [true, 'Tình trạng hoạt động không được để trống']
  },
  Gia: {
    type: Number,
    required: [true, 'Giá thuê không được để trống'],
    min: [0, 'Giá thuê phải là số dương hoặc bằng 0']
  },
  DanhGia: {
    type: [danhGiaSchema],
    required: false // DanhGia là một mảng và không bắt buộc phải có
  }
});

// Tạo model cho NhacCong
const NhacCong = mongoose.model('NhacCong', nhacCongSchema, 'NhacCong');

// Xuất model để sử dụng ở nơi khác
module.exports = NhacCong;
