import styled from 'styled-components'
import { useState, useEffect } from 'react'

function HoiTruongDetail({ selectedData }) {
  const [formData, setFormData] = useState({})

  // Sử dụng useEffect để cập nhật formData khi selectedData thay đổi
  useEffect(() => {
    setFormData(selectedData || {}) // Cập nhật formData với selectedData mới
  }, [selectedData]) // Chạy lại khi selectedData thay đổi

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý submit ở đây
    console.log(formData)
  }

  if (!selectedData)
    return (
      <HoiTruongDetailWrapper>
        <h1>Chọn một dòng để xem chi tiết.</h1>
      </HoiTruongDetailWrapper>
    )

  return (
    <HoiTruongDetailWrapper>
      <h3>Chi tiết hội trường</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã hội trường:</label>
            <input
              className="input"
              name="MaHoiTruong"
              value={formData.MaHoiTruong || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Tên hội trường:</label>
            <input
              className="input"
              name="TenHoiTruong"
              value={formData.TenHoiTruong || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Sức chứa:</label>
            <input
              className="input"
              name="SucChua"
              value={formData.SucChua || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Wifi:</label>
            <select
              className="select"
              name="Wifi"
              value={formData.Wifi}
              onChange={handleInputChange}
            >
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Máy lạnh:</label>
            <select
              className="select"
              name="MayLanh"
              value={formData.MayLanh}
              onChange={handleInputChange}
            >
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Phòng kín:</label>
            <select
              className="select"
              name="PhongKin"
              value={formData.PhongKin}
              onChange={handleInputChange}
            >
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Diện tích (m2):</label>
            <input
              className="input"
              name="DienTich"
              value={formData.DienTich || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Số phòng:</label>
            <input
              className="input"
              name="SoPhong"
              value={formData.SoPhong || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Vị trí lầu:</label>
            <input
              className="input"
              name="ViTriLau"
              value={formData.ViTriLau || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Tình trạng:</label>
            <select
              className="select"
              name="TinhTrang"
              value={formData.TinhTrang}
              onChange={handleInputChange}
            >
              <option value="Sẵn có">Sẵn có</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Giá:</label>
            <input
              className="input"
              name="Gia"
              value={formData.Gia || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label">Mô tả:</label>
          <textarea
            className="textarea"
            name="MoTa"
            value={formData.MoTa || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="label">Hình ảnh:</label>
          <input
            className="input"
            type="text"
            name="HinhAnh"
            placeholder="Link ảnh"
            value={formData.HinhAnh || ''}
            onChange={handleInputChange}
          />
          <button className="button" type="button">
            Chèn
          </button>
        </div>
        <div className="image-preview-wrapper">
          {formData.HinhAnh &&
            Array.isArray(formData.HinhAnh) &&
            formData.HinhAnh.map((img, index) => (
              <img key={index} src={img} alt="Hội trường" />
            ))}
        </div>
        <div className="button-row">
          <button className="button" type="submit">
            Thêm
          </button>
          <button className="button update" type="submit">
            Cập nhật
          </button>
          <button
            className="button delete"
            type="button"
            onClick={() => setFormData({})}
          >
            Xóa
          </button>
        </div>
      </form>
    </HoiTruongDetailWrapper>
  )
}

const HoiTruongDetailWrapper = styled.div`
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.4s;
  h3 {
    color: var(--primary-color);
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
  .form-group {
    margin-bottom: 15px;
    button {
      float: right;
    }
  }

  .form-row {
    display: flex;
    gap: 10px;
  }

  .label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  .input,
  .select,
  .textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
  }

  .textarea {
    min-height: 100px;
  }

  .button {
    padding: 10px 30px;
    background-color: var(--primary-color);
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background-color: var(--hover-color-1);
      transition: all 0.4s;
    }
  }

  .button.update {
    background-color: var(--hover-color-2);
    color: var(--primary-color);

    &:hover {
      color: #fff;
      background-color: var(--bold-color);
    }
  }

  .button.delete {
    background-color: #f44336;

    &:hover {
      background-color: #d32f2f;
    }
  }

  .button-row {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
  }

  .image-preview-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`

export default HoiTruongDetail
