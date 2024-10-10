import mongoose from 'mongoose'
import validator from 'validator'

const datDichVuSchema = new mongoose.Schema({
  MaTK: {
    type: String,
    required: [true, 'Phải có MaTK'],
    validate: {
      validator: (value) => validator.isAlphanumeric(value), // Kiểm tra xem MaTK có phải là chuỗi ký tự và số không
      message: 'MaTK chỉ được chứa ký tự chữ và số'
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
    default: false
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
    MaThiepMoi: {
      type: String
    },
    MaHoiTruong: {
      type: String
    },
    MonCombo: {
      type: String
    }
  },
  Note: {
    type: String
  }
})

const DatDichVu = mongoose.model('datdichvu', datDichVuSchema, 'DatDichVu')

export default DatDichVu
