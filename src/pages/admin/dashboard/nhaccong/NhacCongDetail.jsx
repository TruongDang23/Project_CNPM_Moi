import styled from 'styled-components'
import { useState, useEffect } from 'react'
import APIClient from '../../../../api/client'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

function NhacCongDetail({ selectedData, onActionComplete }) {
  const apiClient = new APIClient('nhaccong')
  const [formData, setFormData] = useState({})

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false) // Trạng thái hiển thị Dialog
  const [dialogMessage, setDialogMessage] = useState('') // Nội dung thông báo từ server
  const [dialogTitle, setDialogTitle] = useState('') // Tiêu đề của Dialog

  // Các hàm xử lí mở, đóng Dialog
  // Hàm hiển thị Dialog
  const showDialog = (title, message) => {
    setDialogTitle(title)
    setDialogMessage(message)
    setDialogOpen(true)
  }

  // Hàm đóng Dialog
  const closeDialog = () => {
    setDialogOpen(false)
  }

  // Sử dụng useEffect để cập nhật formData khi selectedData thay đổi
  useEffect(() => {
    setFormData(selectedData || {}) // Cập nhật formData với selectedData mới
  }, [selectedData]) // Chạy lại khi selectedData thay đổi

  // hàm này sẽ xử lý sự kiện thay đổi giá trị của input
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

  // Hàm xử lý sự kiện thêm mới
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await apiClient.create(formData) // Gửi dữ liệu mới qua API
      showDialog('Thêm thành công', 'Nhạc công đã được thêm vào thành công.')
      setFormData({}) // Xóa dữ liệu form sau khi thêm thành công
      onActionComplete() // Gọi hàm tải lại dữ liệu
    } catch (error) {
      const regex = /ValidationError: (.+?)<br>/
      const match = error.response.data.match(regex)
      if (match) {
        showDialog(
          'Lỗi khi thêm',
          match[1] || 'Đã xảy ra lỗi.')
      }
    }
  }

  // Hàm xử lý sự kiện cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!formData.MaNhacCong)
      return showDialog('Lỗi', 'Vui lòng chọn một nhạc công để cập nhật.')
    try {
      const response = await apiClient.update(formData.MaNhacCong, formData)
      showDialog('Cập nhật thành công', 'Thông tin nhạc công đã được cập nhật.')
      onActionComplete() // Gọi hàm tải lại dữ liệu
    } catch (error) {
      const regex = /ValidationError: (.+?)<br>/
      const match = error.response.data.match(regex)
      if (match) {
        showDialog(
          'Lỗi khi cập nhật',
          match[1] || 'Đã xảy ra lỗi.')
      }
    }
  }

  // Hàm xử lý sự kiện xóa
  const handleDelete = async (e) => {
    e.preventDefault()
    if (!formData.MaNhacCong)
      return showDialog('Lỗi', 'Vui lòng chọn một nhạc công để xóa.')
    try {
      await apiClient.delete(formData.MaNhacCong)
      showDialog('Xóa thành công', 'Nhạc công đã được xóa.')
      setFormData({})
      onActionComplete() // Gọi hàm tải lại dữ liệu
    } catch (error) {
      const regex = /ValidationError: (.+?)<br>/
      const match = error.response.data.match(regex)
      if (match) {
        showDialog(
          'Lỗi khi xóa',
          match[1] || 'Đã xảy ra lỗi.')
      }
    }
  }

  return (
    <NhacCongDetailWrapper>
      <h3>Chi tiết nhạc công</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label" disabled>
              Mã nhạc công:
            </label>
            <input
              className="input disabled"
              name="MaNhacCong"
              value={formData.MaNhacCong || ''}
              onChange={handleInputChange}
              disabled
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Họ tên:</label>
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
            <label className="label">Số điện thoại:</label>
            <input
              className="input"
              name="SDT"
              value={formData.SDT || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Kinh nghiệm (năm):</label>
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
            <label className="label">Loại nhạc cụ:</label>
            <input
              className="input"
              name="LoaiNhacCu"
              value={formData.LoaiNhacCu || ''}
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
              <option value={true}>Đang hoạt động</option>
              <option value={false}>Không hoạt động</option>
            </select>
          </div>
        </div>
        <div className="form-row">
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
        </div>

        <div className="image-preview-wrapper">
          {formData.HinhAnh &&
            Array.isArray(formData.HinhAnh) &&
            formData.HinhAnh.map((img, index) => (
              <img key={index} src={img} alt="Hội trường" />
            ))}
        </div>

        <div className="button-row">
          <button id="btn-primary" type="submit" onClick={handleCreate}>
            Thêm
          </button>
          <button id="btn-secoundary" type="submit" onClick={handleUpdate}>
            Cập nhật
          </button>
          <button id="btn-cancel" type="button" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </form>

      {/* Dialog hiển thị thông báo */}
      <StyledDialog open={dialogOpen} onClose={closeDialog}>
        <StyledDialogTitle>{dialogTitle}</StyledDialogTitle>
        <StyledDialogContent>
          <p>{dialogMessage}</p>
        </StyledDialogContent>
        <StyledDialogActions>
          <button id="btn-primary" onClick={closeDialog}>
            Đóng
          </button>
        </StyledDialogActions>
      </StyledDialog>
    </NhacCongDetailWrapper>
  )
}

// Custom Dialog
const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    text-align: center;
    background-color: #f3f4f6;
    border-radius: 8px;
    padding: 16px;
  }
`

const StyledDialogTitle = styled(DialogTitle)`
  font-size: 2rem;
  text-transform: uppercase;
  color: var(--primary-color);
  font-weight: bold;
`

const StyledDialogContent = styled(DialogContent)`
  font-size: 1.6rem;
  color: var(--primary-color);
`

const StyledDialogActions = styled(DialogActions)`
  justify-content: center;
`

// Styled-component for NhacCongDetailWrapper
const NhacCongDetailWrapper = styled.div`
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

  .input.disabled {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    cursor: not-allowed;
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

export default NhacCongDetail
