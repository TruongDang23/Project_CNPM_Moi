import styled from 'styled-components'
import { useState } from 'react'
import someHallData from '../../../data/someHallData'
import DataTable from 'react-data-table-component'

// Cột cho bảng
const columns = [
  {
    name: 'Mã Hội Trường',
    selector: (row) => row.MaHoiTruong
  },
  {
    name: 'Tên Hội Trường',
    selector: (row) => row.TenHoiTruong
  },
  {
    name: 'Sức Chứa',
    selector: (row) => row.SucChua
  },
  {
    name: 'Wifi',
    selector: (row) => (row.Wifi ? 'Có' : 'Không')
  },
  {
    name: 'Mô Tả',
    selector: (row) => row.MoTa
  },
  {
    name: 'Máy Lạnh',
    selector: (row) => (row.MayLanh ? 'Có' : 'Không')
  },
  {
    name: 'Phòng Kín',
    selector: (row) => (row.PhongKin ? 'Có' : 'Không')
  },
  {
    name: 'Diện Tích (m2)',
    selector: (row) => row.DienTich
  },
  {
    name: 'Số Phòng',
    selector: (row) => row.SoPhong
  },
  {
    name: 'Vị Trí Lầu',
    selector: (row) => row.ViTriLau
  },
  {
    name: 'Giá (VND)',
    selector: (row) => row.Gia.toLocaleString() // Format số
  },
  {
    name: 'Tình Trạng',
    selector: (row) => (row.TinhTrang ? 'Đang sử dụng' : 'Không sử dụng')
  }
]

const HoiTruongDetails = ({ selectedData }) => {
  if (!selectedData) return <div>Chọn một dòng để xem chi tiết.</div>

  return (
    <div>
      <h3>Chi tiết Hội trường</h3>
      <p>
        <strong>Mã Hội Trường:</strong> {selectedData.MaHoiTruong}
      </p>
      <p>
        <strong>Tên Hội Trường:</strong> {selectedData.TenHoiTruong}
      </p>
      <p>
        <strong>Sức Chứa:</strong> {selectedData.SucChua}
      </p>
      <p>
        <strong>Wifi:</strong> {selectedData.Wifi ? 'Có' : 'Không'}
      </p>
      <p>
        <strong>Mô Tả:</strong> {selectedData.MoTa}
      </p>
      <p>
        <strong>Máy Lạnh:</strong> {selectedData.MayLanh ? 'Có' : 'Không'}
      </p>
      <p>
        <strong>Phòng Kín:</strong> {selectedData.PhongKin ? 'Có' : 'Không'}
      </p>
      <p>
        <strong>Diện Tích:</strong> {selectedData.DienTich} m²
      </p>
      <p>
        <strong>Giá:</strong> {selectedData.Gia.toLocaleString()} VND
      </p>
      <p>
        <strong>Hình Ảnh:</strong>
      </p>
      <div>
        {selectedData.HinhAnh.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Hội trường"
            width="100"
            style={{ marginRight: '5px' }}
          />
        ))}
      </div>
    </div>
  )
}

function HoiTruong() {
  const [selectedRow, setSelectedRow] = useState(null)
  // Hàm xử lý khi nhấn vào dòng
  const handleRowClicked = (row) => {
    setSelectedRow(row) // Lưu dòng được chọn
  }
  return (
    <HoiTruongWrapper>
      <h2>Quản lý hội trường</h2>
      <div className="hall-content">
        <DataTable
          columns={columns}
          data={someHallData} // Dữ liệu từ JSON
          onRowClicked={handleRowClicked}
          pagination // Tính năng phân trang
        />
        <div style={{ width: '50%' }}>
          <HoiTruongDetails selectedData={selectedRow} />
        </div>
      </div>
    </HoiTruongWrapper>
  )
}

const HoiTruongWrapper = styled.section`
  h2 {
    font-size: 2.4rem;
    margin: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .hall-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
  }
`

export default HoiTruong
