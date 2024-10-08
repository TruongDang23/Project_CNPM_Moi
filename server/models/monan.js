import mongoose from 'mongoose'
import validator from 'validator'

const monAnSchema = new mongoose.Schema({
  MaMonAn: {
    type: String,
    required: [true, 'Mã món ăn là bắt buộc'],
    unique: true
  },
  TenMonAn: {
    type: String,
    required: [true, 'Tên món ăn là bắt buộc'],
    minlength: [2, 'Tên món ăn phải có ít nhất 2 ký tự']
  },
  LoaiMonAn: {
    type: String,
    required: [true, 'Loại món ăn là bắt buộc'],
    enum: {
      values: ['Khai vị', 'Món chính', 'Tráng miệng', 'Thức uống'], // Ví dụ về các loại món ăn
      message: '{VALUE} không phải là một loại món ăn hợp lệ'
    }
  },
  Gia: {
    type: Number,
    required: [true, 'Giá là bắt buộc'],
    min: [0, 'Giá phải lớn hơn hoặc bằng 0']
  },
  HinhAnh: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every((url) => validator.isURL(url))
      },
      message: 'Hình ảnh không hợp lệ'
    }
  }
})

const MonAn = mongoose.model('monan', monAnSchema, 'MonAn')

export default MonAn
