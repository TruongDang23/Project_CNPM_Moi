import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import ServiceDetailPopUp from '../../../../components/ServiceDetailPopUp'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

function HallSearchCard({ hall }) {
  const {
    TenHoiTruong,
    SucChua,
    Wifi,
    MoTa,
    MayLanh,
    PhongKin,
    DienTich,
    SoPhong,
    ViTriLau,
    Gia,
    TinhTrang,
    HinhAnh
  } = hall
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const handleViewClick = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <HallSearchCardWrapper>
      <div className="hall-img">
        <img src={HinhAnh[0]} alt={TenHoiTruong} />
      </div>
      <div className="hall-info">
        <h3>{TenHoiTruong}</h3>
        <ul>
          <li>Sức chứa: {SucChua}</li>
          <li>Tình trạng: {TinhTrang ? 'Còn trống' : 'Đã đặt'}</li>

          <li>
            <strong>Giá: {Gia}đ</strong>
          </li>
        </ul>
      </div>
      <div className="hall-button">
        <button id="btn-primary">Lưu</button>
        <button id="btn-secoundary" onClick={handleViewClick}>
          Xem
        </button>
      </div>
      {isPopupOpen && (
        <ServiceDetailPopUp onClose={handleClosePopup}>
          <h2>{TenHoiTruong}</h2>
          <div className="popup-content">
            <div className="popup-img">
              <Carousel autoPlay interval={3000}>
                {HinhAnh.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={TenHoiTruong} />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="popup-info">
              <ul>
                <li>
                  <strong>Tên hội trường:</strong> {TenHoiTruong}
                </li>
                <li>
                  <strong>Giá:</strong> {Gia}đ
                </li>
                <li>
                  <strong>Tình trạng:</strong>{' '}
                  {TinhTrang ? 'Còn trống' : 'Đã đặt'}
                </li>
                <li>
                  <strong>Sức chứa:</strong> {SucChua}
                </li>
                <li>
                  <strong>Wifi:</strong> {Wifi ? 'Có' : 'Không'}
                </li>
                <li>
                  <strong>Mô tả:</strong> {MoTa}
                </li>
                <li>
                  <strong>Máy lạnh:</strong> {MayLanh ? 'Có' : 'Không'}
                </li>
                <li>
                  <strong>Phòng kín:</strong> {PhongKin ? 'Có' : 'Không'}
                </li>
                <li>
                  <strong>Diện tích:</strong> {DienTich} m²
                </li>
                <li>
                  <strong>Số phòng:</strong> {SoPhong}
                </li>
                <li>
                  <strong>Vị trí lầu:</strong> {ViTriLau}
                </li>
              </ul>
            </div>
          </div>

          <button id="btn-cancel" onClick={handleClosePopup}>
            Đóng
          </button>
        </ServiceDetailPopUp>
      )}
    </HallSearchCardWrapper>
  )
}

const HallSearchCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  .hall-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .hall-info {
    padding: 20px;

    h3 {
      color: var(--primary-color);
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: 1.6rem;
        margin-bottom: 10px;

        strong {
          font-weight: 700;
        }
      }
    }
  }

  .hall-button {
    display: flex;
    padding: 20px;
    gap: 10px;

    button {
      width: 100%;
      display: flex; /* Sử dụng flexbox để căn giữa nội dung */
      justify-content: center; /* Căn giữa theo chiều ngang */
      align-items: center; /* Căn giữa theo chiều dọc */
      text-align: center;
    }
  }
`

export default HallSearchCard
