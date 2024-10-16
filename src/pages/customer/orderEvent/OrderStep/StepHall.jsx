import styled from 'styled-components'
import someHallData from '../../../../data/someHallData'

// const someHallData = [
//   {
//     MaHoiTruong: 'H001',
//     TenHoiTruong: 'Hội trường A',
//     SucChua: 150,
//     Wifi: true,
//     MoTa: 'Hội trường sang trọng, thích hợp cho sự kiện lớn.',
//     MayLanh: true,
//     PhongKin: true,
//     DienTich: 200.5,
//     SoPhong: 'A100',
//     ViTriLau: 'A1',
//     Gia: 1000000,
//     TinhTrang: true,
//     HinhAnh: [
//       'https://img.freepik.com/premium-photo/empty-auditorium-with-rows-chairs-wooden-ceiling_926058-19665.jpg?w=1060',
//       'https://img.freepik.com/premium-photo/empty-auditorium-rows-with-overhead-lights_926058-12219.jpg?w=1060'
//     ]
//   },
//   {
//     MaHoiTruong: 'H002',
//     TenHoiTruong: 'Hội trường B',
//     SucChua: 80,
//     Wifi: true,
//     MoTa: 'Hội trường nhỏ, phù hợp cho các buổi họp.',
//     MayLanh: true,
//     PhongKin: true,
//     DienTich: 120,
//     SoPhong: 'G000',
//     ViTriLau: 'G',
//     Gia: 1000000,
//     TinhTrang: true,
//     HinhAnh: [
//       'https://img.freepik.com/premium-photo/empty-conference-room-with-projection-screen-rows-chairs_926058-20245.jpg?w=1060',
//       'https://img.freepik.com/premium-photo/empty-auditorium-with-red-chairs-projection-screen_926058-19682.jpg?w=1060'
//     ]
//   },
//   {
//     MaHoiTruong: 'H003',
//     TenHoiTruong: 'Hội trường C',
//     SucChua: 200,
//     Wifi: false,
//     MoTa: 'Hội trường rộng, thích hợp cho sự kiện ngoài trời.',
//     MayLanh: true,
//     PhongKin: true,
//     DienTich: 120,
//     SoPhong: 'G000',
//     ViTriLau: 'G',
//     Gia: 1000000,
//     TinhTrang: true,
//     HinhAnh: [
//       'https://img.freepik.com/premium-photo/seminar-executive-room-hotel_105762-1679.jpg?w=1060',
//       'https://img.freepik.com/premium-photo/seminar-executive-room-hotel_105762-1860.jpg?w=996'
//     ]
//   },
//   {
//     MaHoiTruong: 'H004',
//     TenHoiTruong: 'Hội trường D',
//     SucChua: 200,
//     Wifi: false,
//     MoTa: 'Hội trường rộng, thích hợp cho sự kiện ngoài trời.',
//     MayLanh: true,
//     PhongKin: true,
//     DienTich: 120,
//     SoPhong: 'G000',
//     ViTriLau: 'G',
//     Gia: 1000000,
//     TinhTrang: true,
//     HinhAnh: [
//       'https://img.freepik.com/premium-photo/3d-rendering-business-meeting-room-high-rise-office-building_105762-1106.jpg?w=996',
//       'https://img.freepik.com/free-photo/gym-with-indoor-cycling-equipment_23-2149270209.jpg?t=st=1727192710~exp=1727196310~hmac=e90be71227d90f16a7b8442ae15173be81636e0db501f472201015e7f569c3ba&w=996'
//     ]
//   }
// ]

import { useState } from 'react'

function StepHall() {
  const [selectedHall, setSelectedHall] = useState(null)
  const handleHallChange = (e) => {
    const hallId = e.target.value
    const hall = someHallData.find((h) => h.MaHoiTruong === hallId)
    setSelectedHall(hall)
  }
  return (
    <StepHallWrapper>
      <h3>Chọn Hội Trường</h3>
      <div className="step-content">
        <p>
          Hãy chọn các hội trường mà bạn đã lưu, nếu bạn chưa có thì hãy xem
          danh sách hội trường và lưu chúng lại nha
        </p>
        <div className="step-content-action">
          <select defaultValue="" onChange={handleHallChange}>
            <option value="" disabled hidden>
              Chọn hội trường
            </option>
            {someHallData.map((hall) => (
              <option value={hall.MaHoiTruong} key={hall.MaHoiTruong}>
                {hall.TenHoiTruong}
              </option>
            ))}
          </select>
          <button id="btn-primary">Danh sách</button>
        </div>
      </div>

      <div className="step-preview">
        <h3>Xem trước:</h3>
        {selectedHall ? (
          <div className="hall-info">
            <div className="hall-info-left">
              <img
                src={selectedHall.HinhAnh[0]}
                alt={selectedHall.TenHoiTruong}
              />
            </div>
            <div className="hall-info-right">
              <h4>{selectedHall.TenHoiTruong}</h4>
              <p>Sức chứa: {selectedHall.SucChua}</p>
              <div className="inline">
                <p>Wifi: {selectedHall.Wifi ? 'Có' : 'Không'}</p>
                <p>Máy lạnh: {selectedHall.MayLanh ? 'Có' : 'Không'}</p>
                <p>Phòng kín: {selectedHall.PhongKin ? 'Có' : 'Không'}</p>
              </div>
              <div className="inline">
                <p>Diện tích: {selectedHall.DienTich} m²</p>
                <p>Số phòng: {selectedHall.SoPhong}</p>
                <p>Vị trí lầu: {selectedHall.ViTriLau}</p>
              </div>
              <p>Mô tả: {selectedHall.MoTa}</p>
              <p>Giá: {selectedHall.Gia.toLocaleString()} VND</p>
              <p>
                Tình trạng: {selectedHall.TinhTrang ? 'Còn trống' : 'Đã đặt'}
              </p>
            </div>
          </div>
        ) : (
          <p>Vui lòng chọn một hội trường để xem chi tiết.</p>
        )}
      </div>
    </StepHallWrapper>
  )
}

const StepHallWrapper = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  p {
    font-size: 1.6rem;
    font-style: italic;
  }
  .step-content {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    p {
      font-size: 1.6rem;
    }

    .step-content-action {
      align-self: flex-end;
      margin-left: auto;
      display: flex;
      gap: 1rem;
      align-items: center;

      button {
        width: 200px;
      }
    }
  }

  .step-preview {
    .hall-info {
      display: flex;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
      .hall-info-left {
        width: 40%;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .hall-info-right {
        width: 60%;
        p {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
        h4 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .inline {
          display: flex;
          gap: 2rem;
        }
      }
    }
  }
`

export default StepHall
