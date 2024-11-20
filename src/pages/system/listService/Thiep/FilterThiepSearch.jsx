import styled from 'styled-components'
import Bg from '../../../../assets/bg-tt.jpg'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListNCContext } from '../../../../context/ListNCContext'
function FilterThiepSearch() {
  const { updateSearchParams } = useContext(ListNCContext)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleTypeChange = (e) => {
    setType(e.target.value)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setPrice('')
    setType('')
  }

  const handleSearch = () => {
    const params = {}
    if (searchTerm) params.searchTerm = searchTerm
    if (price) params.price = price
    if (type) params.type = type
    updateSearchParams(params)

    const queryParams = new URLSearchParams(params).toString()
    navigate(`?${queryParams}`)
  }
  return (
    <FilterSearchWrapper>
      <h1>Danh sách Thiệp mời</h1>
      <div className="filter-container">
        <div className="filter-find">
          <h3>Tìm kiếm:</h3>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id="btn-primary" onClick={handleSearch}>
            Tìm
          </button>
        </div>
        <div className="filter-option">
          <h3>Lọc theo:</h3>
          <select defaultValue="" value={price} onChange={handlePriceChange}>
            <option disabled hidden value="">
              Chọn mức giá
            </option>
            <option value={1}>Tăng dần</option>
            <option value={-1}>Giảm dần</option>
          </select>
          <select defaultValue="" value={type} onChange={handleTypeChange}>
            <option disabled hidden value="">
              Chọn loại thiệp
            </option>
            <option value="Cưới">Cưới</option>
            <option value="Sinh Nhật">Sinh Nhật</option>
            <option value="Sự kiện">Sự kiện</option>
          </select>
          <button id="btn-cancel" onClick={handleClearFilters}>
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </FilterSearchWrapper>
  )
}

const FilterSearchWrapper = styled.section`
  overflow: hidden;
  background-image: url(${Bg});
  background-size: cover;
  object-fit: cover;
  padding: 2rem 0;
  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #fff;
    text-shadow: -5px -1px 0 var(--primary-color),
      1px -1px 0 var(--primary-color), -1px 1px 0 var(--primary-color),
      1px 1px 0 var(--primary-color); /* Border line effect */
  }

  input {
    flex: 1;
    padding: 10px;
    font-size: 1.4rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }

  select {
    flex: 1;
    padding: 10px;
    font-size: 1.4rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    option {
      padding: 5px;
    }
  }

  h3 {
    font-size: 1.6rem;
    color: var(--primary-color);
    white-space: nowrap;
  }

  .filter-container {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .filter-find {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-option {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    h3 {
      width: 100%;
    }

    select {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    .filter-container {
      width: 80%;

      .filter-option {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }

  @media (max-width: 425px) {
    .filter-container {
      width: 90%;
    }
  }
`

export default FilterThiepSearch
