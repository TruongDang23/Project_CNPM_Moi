const mongoose = require('mongoose');

const dichVuSchema = new mongoose.Schema({
  SoLuongBan: {
    type: Number,
    required: [true, 'Số lượng bàn không được để trống'],
    min: [0, 'Số lượng bàn phải là số dương hoặc bằng 0']
  },
  SoLuongThiep: {
    type: Number,
    required: [true, 'Số lượng thiệp không được để trống'],
    min: [0, 'Số lượng thiệp phải là số dương hoặc bằng 0']
  },
  MaMC: {
    type: String,
    required: [true, 'Mã MC không được để trống'],
    maxlength: [4, 'Mã MC không được vượt quá 4 ký tự']
  },
  MaHoiTruong: {
    type: String,
    required: [true, 'Mã hội trường không được để trống'],
    maxlength: [4, 'Mã hội trường không được vượt quá 4 ký tự']
  },
  MaCombo: {
    type: String, 
    required: [true, 'Mã combo không được để trống'],
    maxlength: [4, 'Mã combo không được vượt quá 4 ký tự']
  }
});

const datDichVuSchema = new mongoose.Schema({
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
  ThoiDiemDat: {
    type: Date,
    required: [true, 'Thời điểm đặt không được để trống'],
    default: Date.now
  },
  ThoiDiemBatDau: {
    type: Date,
    required: [true, 'Thời điểm bắt đầu không được để trống']
  },
  ThoiDiemKetThuc: {
    type: Date,
    required: [true, 'Thời điểm kết thúc không được để trống'],
    validate: {
      validator: function(value) {
        return value > this.ThoiDiemBatDau;
      },
      message: 'Thời điểm kết thúc phải sau thời điểm bắt đầu'
    }
  },
  SoGio: {
    type: Number,
    required: [true, 'Số giờ không được để trống'],
    min: [1, 'Số giờ phải là số dương']
  },
  TrangThai: {
    type: Boolean,
    required: [true, 'Tình trạng không được để trống'],
    default: false
  },
  DichVu: {
    type: dichVuSchema,
    required: [true, 'Thông tin dịch vụ không được để trống']
  }
});

// Tạo model cho DatDichVu
const DatDichVu = mongoose.model('DatDichVu', datDichVuSchema, 'DatDichVu');

// Xuất model để sử dụng ở nơi khác
module.exports = DatDichVu;
