import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

function HallSearchCard({ hall }) {
  const { TenHoiTruong, SucChua, Gia, TinhTrang, HinhAnh } = hall
  const [fadeTransition, setFadeTransition] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const handleViewClick = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  // Hàm để tự động chuyển hình ảnh và thêm hiệu ứng fade-in
  useEffect(() => {
    if (isPopupOpen) {
      const interval = setInterval(() => {
        setFadeTransition(true) // Bắt đầu hiệu ứng fade-in

        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HinhAnh.length)
          setFadeTransition(false) // Kết thúc hiệu ứng fade-in
        }, 500) // Hiệu ứng fade trong 500ms
      }, 1000) // Chuyển hình mỗi 1 giây

      return () => clearInterval(interval) // Clear interval khi popup đóng
    }
  }, [isPopupOpen, HinhAnh.length])

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
        <Popup onClose={handleClosePopup}>
          <h2>{TenHoiTruong}</h2>
          <div className={`image-slider ${fadeTransition ? 'fade' : ''}`}>
            <img
              src={HinhAnh[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
            />
          </div>
          <ul>
            <li>Sức chứa: {SucChua}</li>
            <li>Tình trạng: {TinhTrang ? 'Còn trống' : 'Đã đặt'}</li>
            <li>Giá: {Gia}đ</li>
          </ul>
          <button id="btn-cancel" onClick={handleClosePopup}>
            Đóng
          </button>
        </Popup>
      )}
    </HallSearchCardWrapper>
  )
}

const Popup = ({ children }) => {
  return (
    <PopupWrapper>
      <div className="popup-content">{children}</div>
    </PopupWrapper>
  )
}

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  h2 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;

    li {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
  }

  .popup-content {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .image-slider {
      width: 100%;
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 20px;
      }
    }
  }
`

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
