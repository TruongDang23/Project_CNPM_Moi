import styled from 'styled-components'
import { useState } from 'react'
import somCombodata from '../../../../data/someCombodata'
import DataTable from 'react-data-table-component'

import { columnCombo, customStyles } from './columnCombo'
import ComboDetail from './ComboDetail'

function Combo() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [filterText, setFilterText] = useState('')
  // Hàm xử lý khi nhấn vào dòng
  const handleRowClicked = (row) => {
    setSelectedRow(row) // Lưu dòng được chọn
  }

  // Lọc dữ liệu dựa trên giá trị filterText
  const filteredData = somCombodata.filter((item) =>
    // Tìm kiếm theo tất cả các trường
    Object.values(item).some((field) => {
      if (typeof field === 'string') {
        return field.toLowerCase().includes(filterText.toLowerCase())
      } else if (typeof field === 'boolean') {
        return (field ? 'Có' : 'Không')
          .toLowerCase()
          .includes(filterText.toLowerCase())
      } else if (typeof field === 'number') {
        return field.toString().includes(filterText)
      }
      return false
    })
  )
  return (
    <ComboWrapper>
      <h2>Quản lý Combo món ăn</h2>
      <div className="combo-content">
        <div className="combo-content-table">
          <h3>Danh sách hội trường</h3>
          <div className="actions">
            <p>Tìm kiếm:</p>
            <input
              type="text"
              placeholder="Nhập từ khóa..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <DataTable
            columns={columnCombo}
            data={filteredData} // Dữ liệu sau khi lọc
            onRowClicked={handleRowClicked}
            pagination // Tính năng phân trang
            customStyles={customStyles} // Tùy chỉnh giao diện
          />
        </div>
        <div className="hall-content-detail">
          <ComboDetail selectedData={selectedRow} />
        </div>
      </div>
    </ComboWrapper>
  )
}

const ComboWrapper = styled.section`
  font-family: 'Source Sans 3', sans-serif;
  h2 {
    color: var(--primary-color);
    width: 100%;
    font-size: 2.4rem;
    margin: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .combo-content {
    margin: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* Chia cột thành 2 phần bằng nhau */
    gap: 20px; /* Khoảng cách giữa 2 cột */

    .combo-content-table {
      max-width: 700px;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      height: auto;

      h3 {
        color: var(--primary-color);
        font-size: 1.6rem;
      }

      .actions {
        padding: 10px;
        display: flex;
        justify-content: flex-end;

        p {
          font-size: 1.4rem;
          margin-right: 10px;
          text-align: center;
          align-self: center;
        }

        input {
          width: 30%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid var(--primary-color);
        }
      }
    }

    .combo-content-detail {
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  }
`

export default Combo
