import styled from 'styled-components'

function HoiTruong() {
  return (
    <HoiTruongWrapper>
      <h2>Quản lý hội trường</h2>
      <div className="hall-content"></div>
    </HoiTruongWrapper>
  )
}

const HoiTruongWrapper = styled.section`
  h2 {
    font-size: 2.4rem;
    margin: 20px;
    text-align: center;
    text-transform: uppercase;
  }
`

export default HoiTruong
