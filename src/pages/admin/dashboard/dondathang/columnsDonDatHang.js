export const columnsDonDatHang = [
  {
    name: 'Họ Tên',
    selector: (row) => row.HoTen
  },
  {
    name: 'Thời Điểm Đặt',
    selector: (row) => new Date(row.ThoiDiemDat).toLocaleString()
  },
  {
    name: 'Thời Điểm Bắt Đầu',
    selector: (row) => new Date(row.ThoiDiemBatDau).toLocaleString()
  },
  {
    name: 'Thời Điểm Kết Thúc',
    selector: (row) => new Date(row.ThoiDiemKetThuc).toLocaleString()
  },
  {
    name: 'Số Giờ',
    selector: (row) => row.SoGio
  },
  {
    name: 'Trạng Thái',
    selector: (row) => (row.TrangThai ? 'Hoàn tất' : 'Chưa hoàn tất')
  },
  {
    name: 'Số Lượng Bàn',
    selector: (row) => row.DichVu.SoLuongBan
  },
  {
    name: 'Số Lượng Thiệp',
    selector: (row) => row.DichVu.SoLuongThiep
  },
  {
    name: 'Mã MC',
    selector: (row) => row.DichVu.MaMC
  },
  {
    name: 'Mã Nhạc Công',
    selector: (row) => row.DichVu.MaNhacCong
  },
  {
    name: 'Mã Hội Trường',
    selector: (row) => row.DichVu.MaHoiTruong
  },
  {
    name: 'Mã Combo',
    selector: (row) => row.DichVu.MaCombo
  },
  {
    name: 'Mã Thiệp Mời',
    selector: (row) => row.DichVu.MaThiepMoi
  },
  {
    name: 'Ghi Chú',
    selector: (row) => row.Note
  }
]

export const customStyles = {
  header: {
    style: {
      fontSize: '1.4rem',
      fontWeight: '700',
      backgroundColor: '#252525',
      color: '#fff'
    }
  },
  headCells: {
    style: {
      fontSize: '1.4rem',
      fontWeight: '600',
      backgroundColor: 'var(--primary-color)',
      color: '#fff',
      padding: '12px' // padding cho các ô header
    }
  },
  rows: {
    style: {
      fontSize: '1.2rem',
      color: '#333',
      backgroundColor: '#fff', // màu nền cho các dòng
      minHeight: '45px', // chiều cao tối thiểu của dòng
      '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9' // dòng chẵn có màu nền khác
      },
      '&:hover': {
        backgroundColor: '#ddd' // thay đổi màu nền khi hover
      }
    }
  },
  cells: {
    style: {
      padding: '12px' // padding cho các ô
    }
  },
  pagination: {
    style: {
      fontSize: '1rem',
      color: '#333',
      backgroundColor: '#f8f8f8',
      borderTop: '1px solid #ddd'
    }
  }
}