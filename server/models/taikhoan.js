import mongoose from 'mongoose'
import validator from 'validator'

const taikhoanSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  MaTK: {
    type: String,
    required: [true, 'Mã tài khoản là bắt buộc'],
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isAlphanumeric(v) // Chỉ cho phép ký tự chữ và số
      },
      message: 'Mã tài khoản chỉ được chứa các ký tự chữ và số'
    }
  },
  Pass: {
    type: String,
    required: [true, 'Mật khẩu là bắt buộc'],
    minlength: [8, 'Mật khẩu phải chứa ít nhất 8 ký tự'],
    validate: {
      validator: function (v) {
        return validator.isStrongPassword(v, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }) // Kiểm tra độ mạnh của mật khẩu
      },
      message:
        'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt'
    }
  },
  Username: {
    type: String,
    required: [true, 'Tên đăng nhập là bắt buộc'],
    unique: true,
    minlength: [4, 'Tên đăng nhập phải chứa ít nhất 4 ký tự'],
    validate: {
      validator: function (v) {
        return validator.isAlphanumeric(v) // Tên đăng nhập chỉ chứa chữ và số
      },
      message: 'Tên đăng nhập chỉ được chứa các ký tự chữ và số'
    }
  }
})

const TaiKhoan = mongoose.model('taikhoan', taikhoanSchema, 'TaiKhoan')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default TaiKhoan
