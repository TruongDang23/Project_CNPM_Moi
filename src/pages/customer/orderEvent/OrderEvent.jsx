import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../../../components/Header'
import Bg from '../../../assets/bg-v1.png'
import MainOrder from './MainOrder'

function OrderEvent() {
  return (
    <>
      <Helmet>
        <title>Đặt sự kiện </title>
      </Helmet>
      <Header />
      <OrderEventWrapper>
        <MainOrder />
      </OrderEventWrapper>
    </>
  )
}

const OrderEventWrapper = styled.main`
  height: 90vh;
  background-image: url(${Bg});
  background-size: cover;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default OrderEvent
