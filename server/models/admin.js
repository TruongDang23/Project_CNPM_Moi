const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  MaTK: {
    type: String,
    required: [true, 'Mã tài khoản không được để trống'],
    unique: true, // Mã tài khoản phải là duy nhất
    minlength: [5, 'Mã tài khoản phải có ít nhất 5 ký tự'],
    maxlength: [20, 'Mã tài khoản không được vượt quá 20 ký tự']
  },
  GioiTinh: {
    type: String,
    required: [true, 'Giới tính không được để trống'],
    enum: ['Nam', 'Nữ', 'Khác'], // Chỉ cho phép một số giá trị nhất định
  },
  HoTen: {
    type: String,
    required: [true, 'Họ tên không được để trống'],
    minlength: [3, 'Họ tên phải có ít nhất 3 ký tự'],
    maxlength: [50, 'Họ tên không được vượt quá 50 ký tự']
  },
  SDT: {
    type: String,
    required: [true, 'Số điện thoại không được để trống'],
    match: [/^\d{10,11}$/, 'Số điện thoại phải gồm 10 đến 11 chữ số']// Validation cho số điện thoại
  },
  NgaySinh: {
    type: String,
    required: [true, 'Ngày sinh không được để trống'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Ngày sinh phải có định dạng YYYY-MM-DD'] // Định dạng ngày sinh
  },
  NoiSong: {
    type: String,
    required: [true, 'Nơi sống không được để trống'],
    minlength: [2, 'Nơi sống phải có ít nhất 2 ký tự'],
    maxlength: [100, 'Nơi sống không được vượt quá 100 ký tự']
  }
})

const Admin = mongoose.model('admin', adminSchema, 'Admin')

module.exports = Admin
