const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  MaTK: { type: String },
  GioiTinh: { type: String },
  HoTen: { type: String },
  SDT: { type: String },
  NgaySinh: { type: String },
  NoiSong: { type: String }
})

const Admin = mongoose.model('admin', adminSchema, 'Admin')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

module.exports = Admin