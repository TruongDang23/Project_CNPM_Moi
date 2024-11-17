import styled from 'styled-components'
import {useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import APIClient from '../../../../api/client'
import { columnsMC, customStyles, conditionalRowStyles } from './columnsMC'
import MCDetail from './MCDetail'

function MC() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [filterText, setFilterText] = useState('')
  const [reload, setReload] = useState(true)
  const [ncData, setMcData] = useState([])

  useEffect(() => {
    const apiClient = new APIClient('mc')
    apiClient
      .find()
      .then((response) => {
        setMcData(response.data.mc || [])
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }, [reload])

  // Hàm xử lý khi nhấn vào dòng
  const handleRowClicked = (row) => {
    setSelectedRow(row) // Lưu dòng được chọn
  }

  // Lọc dữ liệu dựa trên giá trị filterText
  const filteredData = ncData.filter((item) =>
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
    <MCWrapper>
      <h2>Quản lý MC</h2>
      <div className="hall-content">
        <div className="hall-content-table">
          <h3>Danh sách MC</h3>
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
            columns={columnsMC}
            data={filteredData} // Dữ liệu sau khi lọc
            onRowClicked={handleRowClicked}
            pagination // Tính năng phân trang
            conditionalRowStyles={conditionalRowStyles} // Tùy chỉnh giao diện dòng
            customStyles={customStyles} // Tùy chỉnh giao diện
          />
        </div>
        <div className="hall-content-detail">
          <MCDetail
            selectedData={selectedRow}
            setReload={setReload}/>
        </div>
      </div>
    </MCWrapper>
  )
}

const MCWrapper = styled.section`
  font-family: 'Source Sans 3', sans-serif;
  h2 {
    color: var(--primary-color);
    width: 100%;
    font-size: 2.4rem;
    margin: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .hall-content {
    margin: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* Chia cột thành 2 phần bằng nhau */
    gap: 20px; /* Khoảng cách giữa 2 cột */

    .hall-content-table {
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

    .hall-content-detail {
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  }
`

// eslint-disable-next-line react-refresh/only-export-components
export default MC
