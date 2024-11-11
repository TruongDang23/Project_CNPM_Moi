import styled from 'styled-components'
import Bg from '../../../../assets/bg-v1.png'
import { useState, useContext } from 'react'
import { ListNCContext } from '../../../../context/ListNCContext'

function FilterNCSearch() {
  const { updateSearchParams } = useContext(ListNCContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [instrument, setInstrument] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleInstrumentChange = (e) => {
    setInstrument(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setInstrument('')
    setPrice('')
    setStatus('')
  }

  const handleSearch = () => {
    const params = {}
    if (searchTerm) params.searchTerm = searchTerm
    if (instrument) params.instrument = instrument
    if (price) params.price = price
    if (status) params.status = status
    updateSearchParams(params)
  }

  return (
    <FilterSearchWrapper>
      <h1>Danh sách nhạc công</h1>
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
          <select value={instrument} onChange={handleInstrumentChange}>
            <option value="">Chọn nhạc cụ</option>
            <option value="Guitar">Guitar</option>
            <option value="Piano">Piano</option>
            <option value="Violin">Violin</option>
            <option value="Saxophone">Saxophone</option>
          </select>
          <select value={price} onChange={handlePriceChange}>
            <option value="">Chọn mức giá</option>
            <option value="all">Bỏ lọc giá</option>
            <option value={1}>Tăng dần</option>
            <option value={-1}>Giảm dần</option>
          </select>
          <select value={status} onChange={handleStatusChange}>
            <option value="">Chọn tình trạng</option>
            <option value="all">Bỏ lọc tình trạng</option>
            <option value="true">Sẵn sàng</option>
            <option value="false">Không sẵn thuê</option>
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
    color: var(--primary-color);
    text-align: center;
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

export default FilterNCSearch
