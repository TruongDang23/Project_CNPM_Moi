import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../../../components/Header'
import Bg from '../../../assets/bg-v1.png'
import MainOrder from './MainOrder'

import { OrderProvider } from '../../../context/OrderContext'

import OrderData from '../../../data/orderData'

function OrderEvent() {
  return (
    <>
      <Helmet>
        <title>Đặt dich vụ </title>
      </Helmet>
      <Header />
      <OrderEventWrapper>
        <OrderProvider>
          <MainOrder/>
        </OrderProvider>
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
