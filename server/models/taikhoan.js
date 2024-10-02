const mongoose = require('mongoose')

const taikhoanSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  MaTK: { type: String },
  Pass: { type: String },
  Username: { type: String }
})

const TaiKhoan = mongoose.model('taikhoan', taikhoanSchema, 'TaiKhoan')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

module.exports = TaiKhoan