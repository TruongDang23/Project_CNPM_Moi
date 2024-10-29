import styled from 'styled-components'
import { useState, useEffect } from 'react'

function DonDatHangDetail({ selectedData }) {
  const [formData, setFormData] = useState({});

  // Sử dụng useEffect để cập nhật formData khi selectedData thay đổi
  useEffect(() => {
    setFormData(selectedData || {}); // Cập nhật formData với selectedData mới
  }, [selectedData]); // Chạy lại khi selectedData thay đổi

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit ở đây
    console.log(formData);
  };

  if (!selectedData)
    return (
      <DonDatHangDetailWrapper>
        <h1>Chọn một đơn đặt hàng để xem chi tiết.</h1>
      </DonDatHangDetailWrapper>
    );

  return (
    <DonDatHangDetailWrapper>
      <h3>Chi tiết Đơn Đặt Hàng</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Họ và tên:</label>
            <input
              className="input"
              name="HoTen"
              value={formData.HoTen || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Ngày đặt:</label>
            <input
              className="input"
              name="ThoiDiemDat"
              value={formData.ThoiDiemDat || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Thời gian bắt đầu:</label>
            <input
              className="input"
              name="ThoiDiemBatDau"
              value={formData.ThoiDiemBatDau || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Thời gian kết thúc:</label>
            <input
              className="input"
              name="ThoiDiemKetThuc"
              value={formData.ThoiDiemKetThuc || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Số giờ:</label>
            <input
              className="input"
              name="SoGio"
              value={formData.SoGio || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Tình trạng:</label>
            <select
              className="select"
              name="TrangThai"
              value={formData.TrangThai ? 'true' : 'false'}
              onChange={handleInputChange}
            >
              <option value="true">Hoàn tất</option>
              <option value="false">Chưa hoàn tất</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Số lượng bàn:</label>
            <input
              className="input"
              name="SoLuongBan"
              value={formData.DichVu?.SoLuongBan || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Số lượng thiệp:</label>
            <input
              className="input"
              name="SoLuongThiep"
              value={formData.DichVu?.SoLuongThiep || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã combo:</label>
            <input
              className="input"
              name="MaCombo"
              value={formData.DichVu?.MaCombo || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Mã thiệp:</label>
            <input
              className="input"
              name="MaThiep"
              value={formData.DichVu?.MaThiepMoi || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã MC:</label>
            <input
              className="input"
              name="MaMC"
              value={formData.DichVu?.MaMC || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Mã nhạc công:</label>
            <input
              className="input"
              name="MaNhacCong"
              value={formData.DichVu?.MaNhacCong || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã hội trường:</label>
            <input
              className="input"
              name="MaHoiTruong"
              value={formData.DichVu?.MaHoiTruong || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label">Ghi chú:</label>
          <textarea
            className="textarea"
            name="Note"
            value={formData.Note || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-row">
          <button id="btn-secoundary" type="submit">
            Cập nhật
          </button>
          <button id="btn-cancel" type="button" onClick={() => setFormData({})}>
            Xóa
          </button>
        </div>
      </form>

    </DonDatHangDetailWrapper>
  );
}

const DonDatHangDetailWrapper = styled.div`
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

export default DonDatHangDetail