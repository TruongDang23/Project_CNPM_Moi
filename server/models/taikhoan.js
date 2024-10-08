const mongoose = require('mongoose');

const taikhoanSchema = new mongoose.Schema({
  MaTK: {
    type: String,
    required: [true, 'Mã tài khoản không được để trống'],
    unique: true, // Đảm bảo mã tài khoản là duy nhất
    maxlength: [5, 'Mã tài khoản không được vượt quá 5 ký tự'],
    minlength: [2, 'Mã tài khoản phải có ít nhất 2 ký tự']
  },
  Pass: {
    type: String,
    required: [true, 'Mật khẩu không được để trống'],
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'] // Đảm bảo mật khẩu có độ dài tối thiểu
  },
  Username: {
    type: String,
    required: [true, 'Tên người dùng không được để trống'],
    maxlength: [50, 'Tên người dùng không được vượt quá 50 ký tự'],
    minlength: [3, 'Tên người dùng phải có ít nhất 3 ký tự']
  }
});

const TaiKhoan = mongoose.model('taikhoan', taikhoanSchema, 'TaiKhoan');

module.exports = TaiKhoan;

//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

