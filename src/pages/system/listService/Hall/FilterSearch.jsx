import styled from 'styled-components'
import Bg from '../../../../assets/bg-v1.png'

function FilterSearch() {
  return (
    <FilterSearchWrapper>
      <h1>Danh sách hội trường</h1>
      <div className="filter-container">
        <div className="filter-find">
          <h3>Tìm kiếm:</h3>
          <input type="text" placeholder="Tìm kiếm..." />
          <button id="btn-primary">Tìm</button>
        </div>
        <div className="filter-option">
          <h3>Lọc theo:</h3>
          <select defaultValue="">
            <option value="" disabled hidden>
              Sức chứa
            </option>
            <option value="all">Bỏ lọc sức chứa</option>
            <option value="10">&#62; 10</option>
            <option value="50">&#62; 50</option>
            <option value="100">&#62; 100</option>
          </select>
          <select defaultValue="">
            <option value="" disabled hidden>
              Wi-Fi
            </option>
            <option value="all">Bỏ lọc Wi-Fi</option>
            <option value={1}>Có Wi-Fi</option>
            <option value={0}>Không Wi-Fi</option>
          </select>
          <select defaultValue="">
            <option value="" disabled hidden>
              Máy lạnh
            </option>
            <option value="all">Bỏ lọc máy lạnh</option>
            <option value={1}>Có máy lạnh</option>
            <option value={0}>Không máy lạnh</option>
          </select>
          <select defaultValue="">
            <option value="" disabled hidden>
              Tình trạng
            </option>
            <option value="all">Bỏ lọc tình trạng</option>
            <option value={1}>Sẵn có</option>
            <option value={0}>Không sẵn có</option>
          </select>
          <select defaultValue="">
            <option value="" disabled hidden>
              Giá
            </option>
            <option value="all">Bỏ lọc giá</option>
            <option value={1}>Tăng dần</option>
            <option value={-1}>Giảm dần</option>
          </select>
          <button id="btn-cancel">Xóa bộ lọc</button>
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
    font-size: 2.4rem;
    margin-bottom: 2rem;
    color: var(--primary-color);
    text-align: center;
  }

  input {
    flex: 1;
    padding: 10px;
    font-size: 1.2rem;
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
    font-size: 1.2rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    option {
      padding: 10px;
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

export default FilterSearch
