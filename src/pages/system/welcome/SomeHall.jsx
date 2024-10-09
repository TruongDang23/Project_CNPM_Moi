import styled from 'styled-components'
import HallCard from './HallCard'

function SomeHall({ someHallData }) {
  return (
    <SomeHallWrapper>
      <h2>Một Số Hội Trường Nổi Bật</h2>
      <div className="hall-container">
        {someHallData.map((hall) => {
          return <HallCard key={hall.MaHoiTruong} hall={hall} />
        })}
      </div>
    </SomeHallWrapper>
  )
}

const SomeHallWrapper = styled.section`
  margin: 5rem 0;
  h2 {
    color: #252525;
    font-size: 3rem;
    margin-bottom: 5rem;
    text-align: center;
  }
  .hall-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`

export default SomeHall
