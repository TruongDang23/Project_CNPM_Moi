import styled from 'styled-components'
import { useState, useEffect } from 'react'

function MCDetail({ selectedData }) {
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
      <MCDetailWrapper>
        <h1>Chọn một MC để xem chi tiết.</h1>
      </MCDetailWrapper>
    )

  return (
    <MCDetailWrapper>
      <h3>Chi tiết MC</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã MC:</label>
            <input
              className="input"
              name="MaMC"
              value={formData.MaMC || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Họ Tên:</label>
            <input
              className="input"
              name="HoTen"
              value={formData.HoTen || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Số Điện Thoại:</label>
            <input
              className="input"
              name="SDT"
              value={formData.SDT || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Kinh Nghiệm (năm):</label>
            <input
              className="input"
              name="KinhNghiem"
              value={formData.KinhNghiem || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Tình Trạng:</label>
            <select
              className="select"
              name="TinhTrang"
              value={formData.TinhTrang}
              onChange={handleInputChange}
            >
              <option value={true}>Đang hoạt động</option>
              <option value={false}>Không hoạt động</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Giá (VND):</label>
            <input
              className="input"
              name="Gia"
              value={formData.Gia || ''}
              onChange={handleInputChange}
              required
            />
          </div>
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
    </MCDetailWrapper>
  )
}
const MCDetailWrapper = styled.div`
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
export default MCDetail
