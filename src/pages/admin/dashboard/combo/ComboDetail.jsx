import styled from 'styled-components'
import { useState, useEffect } from 'react'

function ComboDetail({ selectedData }) {
  const [formData, setFormData] = useState({})
  const [newMonAn, setNewMonAn] = useState('')
  const [danhSachMonAn, setDanhSachMonAn] = useState([])

  useEffect(() => {
    setFormData(selectedData || {})
    setDanhSachMonAn(selectedData?.DanhSachMonAn || []) // Cập nhật danh sách món ăn nếu có sẵn
  }, [selectedData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleAddMonAn = () => {
    if (newMonAn.trim() !== '') {
      setDanhSachMonAn((prev) => [...prev, newMonAn])
      setNewMonAn('')
    }
  }

  const handleRemoveMonAn = (index) => {
    const updatedList = danhSachMonAn.filter((_, i) => i !== index)
    setDanhSachMonAn(updatedList)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedData = { ...formData, DanhSachMonAn: danhSachMonAn }
    // Xử lý submit ở đây
    console.log(updatedData)
  }

  if (!selectedData)
    return (
      <ComboDetailWrapper>
        <h1>Chọn một dòng để xem chi tiết.</h1>
      </ComboDetailWrapper>
    )

  return (
    <ComboDetailWrapper>
      <h3>Chi tiết hội trường</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã combo:</label>
            <input
              className="input"
              name="MaHoiTruong"
              value={formData.MaCombo || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Tên combo:</label>
            <input
              className="input"
              name="TenHoiTruong"
              value={formData.TenCombo || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Loại Combo:</label>
            <input
              className="input"
              name="SucChua"
              value={formData.LoaiCombo || ''}
              onChange={handleInputChange}
              required
            />
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

        <div className="form-group list-combo">
          <label className="label">Danh sách món ăn:</label>
          <div className="mon-an-input">
            <input
              className="input"
              type="text"
              value={newMonAn}
              onChange={(e) => setNewMonAn(e.target.value)}
              placeholder="Thêm món ăn"
            />
            <button type="button" onClick={handleAddMonAn} id="btn-primary">
              Thêm
            </button>
          </div>
          <ul className="danh-sach-mon-an">
            {danhSachMonAn.map((monAn, index) => (
              <li key={index}>
                {monAn}
                <button
                  type="button"
                  onClick={() => handleRemoveMonAn(index)}
                  id="btn-cancel"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
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
    </ComboDetailWrapper>
  )
}

const ComboDetailWrapper = styled.div`
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

  .list-combo {
    .mon-an-input {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .danh-sach-mon-an {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        margin-bottom: 5px;

        button {
          font-size: 1rem !important;
        }
      }
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

export default ComboDetail
