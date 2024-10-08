import mongoose from 'mongoose'
import validator from 'validator'

const datDichVuSchema = new mongoose.Schema({
  HoTen: {
    type: String,
    required: [true, 'Họ tên là bắt buộc'],
    minlength: [2, 'Họ tên phải có ít nhất 2 ký tự']
  },
  SDT: {
    type: String,
    required: [true, 'Số điện thoại là bắt buộc'],
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, 'vi-VN')
      },
      message: 'Số điện thoại không hợp lệ'
    }
  },
  ThoiDiemDat: {
    type: Date,
    required: [true, 'Thời điểm đặt là bắt buộc']
  },
  ThoiDiemBatDau: {
    type: Date,
    required: [true, 'Thời điểm bắt đầu là bắt buộc'],
    validate: {
      validator: function (v) {
        return v > this.ThoiDiemDat
      },
      message: 'Thời điểm bắt đầu phải sau thời điểm đặt'
    }
  },
  ThoiDiemKetThuc: {
    type: Date,
    required: [true, 'Thời điểm kết thúc là bắt buộc'],
    validate: {
      validator: function (v) {
        return v > this.ThoiDiemBatDau
      },
      message: 'Thời điểm kết thúc phải sau thời điểm bắt đầu'
    }
  },
  SoGio: {
    type: Number,
    required: [true, 'Số giờ là bắt buộc'],
    min: [1, 'Số giờ phải ít nhất là 1']
  },
  TrangThai: {
    type: Boolean,
    default: true
  },
  DichVu: {
    SoLuongBan: {
      type: Number,
      min: [1, 'Số lượng bàn phải ít nhất là 1']
    },
    SoLuongThiep: {
      type: Number,
      min: [1, 'Số lượng thiệp phải ít nhất là 1']
    },
    MaMC: {
      type: String
    },
    MaNhacCong: {
      type: String
    },
    MaThiep: {
      type: String
    },
    MaHoiTruong: {
      type: String
    },
    MonAn: {
      type: [String]
    }
  }
})

const DatDichVu = mongoose.model('datdichvu', datDichVuSchema, 'DatDichVu')

export default DatDichVu
