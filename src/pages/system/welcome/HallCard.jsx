import styled from 'styled-components'

function HallCard({ hall }) {
  const { TenHoiTruong, SucChua, Gia, TinhTrang, HinhAnh } = hall

  return (
    <HallCardWrapper>
      <div className="hall-img">
        <img src={HinhAnh[0]} alt={TenHoiTruong} />
      </div>
      <div className="hall-info">
        <h3>{TenHoiTruong}</h3>
        <ul>
          <li>Sức chứa: {SucChua}</li>
          <li>Tình trạng: {TinhTrang ? 'Còn trống' : 'Đã đặt'}</li>

          <li>
            <strong>Giá: {Gia}đ</strong>
          </li>
        </ul>
      </div>
      <div className="hall-button">
        <button>Đặt hội trường</button>
      </div>
    </HallCardWrapper>
  )
}

const HallCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  .hall-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .hall-info {
    padding: 20px;

    h3 {
      color: var(--primary-color);
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: 1.6rem;
        margin-bottom: 10px;

        strong {
          font-weight: 700;
        }
      }
    }
  }

  .hall-button {
    width: 100%;
    text-align: center;

    button {
      width: 100%;
      padding: 15px 20px;
      background-color: var(--primary-color);
      color: #fff;
      font-size: 1.3rem;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;

      &:hover,
      &:visited {
        background-color: var(--hover-color-1); /* Change background on hover */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
      }
    }
  }
`

export default HallCard
