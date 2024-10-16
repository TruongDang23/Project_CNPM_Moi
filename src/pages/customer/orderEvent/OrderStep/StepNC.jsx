import styled from 'styled-components'
import { useState } from 'react'

// LuuNhacCong: [
//     {
//       MaNhacCong: 'N001',
//       HoTen: 'Nguyễn Văn A',
//       SDT: '0912345678',
//       KinhNghiem: 5,
//       LoaiNhacCu: 'Guitar',
//       TinhTrang: true,
//       Gia: 2000000,
//       HinhAnh:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRapo-IFhBNQMfIiJNcZCFQe2W8WS8FoUdvEg&s'
//     },
//     {
//       MaNhacCong: 'N002',
//       HoTen: 'Trần Văn B',
//       SDT: '0912345678',
//       KinhNghiem: 3,
//       LoaiNhacCu: 'Piano',
//       TinhTrang: true,
//       Gia: 2000000,
//       HinhAnh:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0zAwlwlbN9_tV_K5VKf2BzK6Jq6-XynBEA&s'
//     }
//   ],

function StepNC({ luuNhacCong }) {
  const [selectedNC, setSelectedNC] = useState(null)
  const handleNCChange = (e) => {
    const ncID = e.target.value
    const nc = luuNhacCong.find((nc) => nc.MaNhacCong === ncID)
    setSelectedNC(nc)
  }

  return (
    <StepNCWrapper>
      <h3>Chọn Nhạc Công</h3>
      <div className="step-content">
        <p>
          Hãy chọn các Nhạc Công mà bạn đã lưu, nếu bạn chưa có thì hãy xem danh
          sách Nhạc Công và lưu chúng lại nha
        </p>
        <div className="step-content-action">
          <select defaultValue="" onChange={handleNCChange}>
            <option value="" disabled hidden>
              Chọn Nhạc Công
            </option>
            {luuNhacCong.map((nc) => (
              <option key={nc.MaNhacCong} value={nc.MaNhacCong}>
                {nc.HoTen}
              </option>
            ))}
          </select>
          <button id="btn-primary">Danh sách</button>
        </div>
      </div>

      <div className="step-preview">
        <h3>Xem trước:</h3>
        {selectedNC ? (
          <div className="nc-info">
            <div className="nc-info-left">
              <img src={selectedNC.HinhAnh} alt={selectedNC.HoTen} />
            </div>
            <div className="nc-info-right">
              <h4>{selectedNC.HoTen}</h4>
              <p>Số điện thoại: {selectedNC.SDT}</p>
              <p>Kinh nghiệm: {selectedNC.KinhNghiem} năm</p>
              <p>Loại nhạc cụ: {selectedNC.LoaiNhacCu}</p>
              <p>Giá: {selectedNC.Gia.toLocaleString()} VND</p>
              <p>Tình trạng: {selectedNC.TinhTrang ? 'Còn' : 'Hết'}</p>
            </div>
          </div>
        ) : (
          <p>Chưa chọn Nhạc Công</p>
        )}
      </div>
    </StepNCWrapper>
  )
}

const StepNCWrapper = styled.div`
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
      padding-left: 2rem;
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
    .nc-info {
      display: flex;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
      .nc-info-left {
        width: 40%;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .nc-info-right {
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

export default StepNC
