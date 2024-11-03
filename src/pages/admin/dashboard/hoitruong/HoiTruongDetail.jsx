import styled from 'styled-components'
import { useState, useEffect } from 'react'
import APIClient from '../../../../api/client'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CancelIcon from '@mui/icons-material/Cancel'

function HoiTruongDetail({ selectedData, setReload }) {
  const [formData, setFormData] = useState({})
  const apiClient = new APIClient('hoitruong')
  const [dialogOpen, setDialogOpen] = useState(false) // Trạng thái hiển thị Dialog
  const [dialogMessage, setDialogMessage] = useState('') // Nội dung thông báo từ server
  const [dialogTitle, setDialogTitle] = useState('') // Tiêu đề của Dialog
  const [newHinhAnh, setNewHinhAnh] = useState('')
  const [danhSachHinhAnh, setDanhSachHinhAnh] = useState([])

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

  const handleInputImage = (e) => {
    setNewHinhAnh(e.target.value)
  }

  const handleAddHinhAnh = () => {
    if (newHinhAnh.trim() !== '') {
      setDanhSachHinhAnh((prev) => [...prev, newHinhAnh])
      setNewHinhAnh('')
      setFormData((prev) => ({
        ...prev,
        HinhAnh: [
          ...prev.HinhAnh || [],
          newHinhAnh
        ]
      }))
    }
  }

  const handleRemoveHinhAnh = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      HinhAnh: prevFormData.HinhAnh.filter((_, i) => i !== index)
    }))
  }

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
        if (response.status == 201) {
          showDialog(
            'Tạo mới thành công',
            ``)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        if (error.status == 404)
          showDialog(
            'Lỗi khi tạo mới hội trường',
            error.response?.data?.message || 'Đã xảy ra lỗi.')
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  const updateHall = () => {
    apiClient
      .update(formData._id, formData)
      .then(async (response) => {
        if (response.status == 200) {
          showDialog(
            'Cập nhật thành công',
            `Thông tin của hội trường ${formData.MaHoiTruong} đã được cập nhật`)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        showDialog(
          'Lỗi khi cập nhật hội trường',
          error.response?.data?.message || 'Đã xảy ra lỗi.')
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  const deleteHall = () => {
    apiClient
      .delete(formData.MaHoiTruong)
      .then((response) => {
        if (response.status == 204) {
          showDialog(
            'Xóa thành công',
            `Trạng thái của hội trường ${formData.MaHoiTruong} đã được cập nhật`)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        if (error.status == 404)
          showDialog(
            'Lỗi khi xóa',
            error.response?.data?.message || 'Đã xảy ra lỗi.')
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  return (
    <HoiTruongDetailWrapper>
      <h3>Chi tiết hội trường</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label" disabled>Mã hội trường:</label>
            <input
              disabled
              className="input disabled"
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
              <option value="true">Có</option>
              <option value="false">Không</option>
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
              <option value="true">Có</option>
              <option value="false">Không</option>
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
            value={newHinhAnh || ''}
            onChange={handleInputImage}
          />
          <button id="btn-secoundary" type="button" onClick={handleAddHinhAnh}>
            Chèn
          </button>
        </div>
        <div className="image-preview-wrapper">
          {formData.HinhAnh &&
            Array.isArray(formData.HinhAnh) &&
            formData.HinhAnh.map((img, index) => (
              // <img key={index} src={img} alt="Hội trường" />
              <div className="image-container" key={index}>
                <img src={img} alt="Combo món ăn" />
                <span
                  className="delete-icon"
                  onClick={() => handleRemoveHinhAnh(index)} // Thêm hàm xóa tại đây
                >
                  <CancelIcon sx={{ fontSize: 30 }} />
                </span>
              </div>
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
    </HoiTruongDetailWrapper>
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
    margin-top: 40px;
  }

  .image-preview-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    max-width: 700px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .image-container {
    position: relative;
    display: inline-block; /* Giúp hình ảnh hiển thị liền kề nhau */
  }

  .delete-icon {
    display: none; /* Ẩn biểu tượng xóa theo mặc định */
    position: absolute;
    top: 5px; /* Điều chỉnh vị trí */
    right: 5px; /* Điều chỉnh vị trí */
    cursor: pointer;
    color: red; /* Màu sắc biểu tượng xóa */
  }

  .image-container:hover .delete-icon {
    display: block; /* Hiện biểu tượng khi rê chuột vào */
  }

  .image-container img {
    transition: filter 0.3s ease; /* Hiệu ứng chuyển đổi cho hình ảnh */
  }

  .image-container:hover img {
    filter: blur(2px); /* Làm mờ hình ảnh khi rê chuột vào */
  }
`

export default HoiTruongDetail
