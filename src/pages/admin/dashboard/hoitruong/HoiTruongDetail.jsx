import styled from 'styled-components'
import { useState, useEffect } from 'react'
import APIClient from '../../../../api/client'

function HoiTruongDetail({ selectedData }) {
  const [formData, setFormData] = useState({})
  const apiClient = new APIClient('hoitruong')

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
  }

  const addHall = () => {
    apiClient
      .create(formData)
      .then((response) => {
        if (response.status == 201)
          alert('Tạo mới hội trường thành công')
      })
      .catch((error) => {
        if (error.status == 404)
          alert('Tạo mới hội trường không thành công')
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  const updateHall = () => {
    apiClient
      .update(formData._id, formData)
      .then((response) => {
        if (response.status == 200)
          alert('Cập nhật thành công')
      })
      .catch((error) => {
        alert('Lỗi trong quá trình cập nhật hội trường')
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  const deleteHall = () => {
    apiClient
      .delete(formData.MaHoiTruong)
      .then((response) => {
        if (response.status == 204)
          alert('Xóa hội trường thành công')
      })
      .catch((error) => {
        if (error.status == 404)
          alert('Không tìm thấy hội trường với ID này')
        // eslint-disable-next-line no-console
        console.error(error)
      })
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
              <option value="true">Có</option>
              <option value="false">Không</option>
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
          <button id="btn-primary" type="submit" onClick={addHall}>
            Thêm
          </button>
          <button id="btn-secoundary" type="submit" onClick={updateHall}>
            Cập nhật
          </button>
          <button id="btn-cancel" type="button" onClick={deleteHall}>
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
