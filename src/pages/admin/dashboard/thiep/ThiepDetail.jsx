import styled from 'styled-components'
import { useState, useEffect } from 'react'

function ThiepDetail({ selectedData }) {
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
      <ThiepDetailWrapper>
        <h1>Chọn một dòng để xem chi tiết.</h1>
      </ThiepDetailWrapper>
    )
  return (
    <ThiepDetailWrapper>
      <h3>Chi tiết thiệp mời</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã thiệp:</label>
            <input
              className="input"
              name="MaHoiTruong"
              value={formData.MaThiep || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Loại thiệp:</label>
            <input
              className="input"
              name="TenHoiTruong"
              value={formData.LoaiThiep || ''}
              onChange={handleInputChange}
              required
            />
          </div>
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
          <button id="btn-secoundary" type="button">
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
          <button id="btn-primary" type="submit">
            Thêm
          </button>
          <button id="btn-secoundary" type="submit">
            Cập nhật
          </button>
          <button id="btn-cancel" type="button" onClick={() => setFormData({})}>
            Xóa
          </button>
        </div>
      </form>
    </ThiepDetailWrapper>
  )
}

const ThiepDetailWrapper = styled.div`
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
      margin-top: 10px;
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

  .button-row {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
  }

  .image-preview-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 60px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`

export default ThiepDetail
