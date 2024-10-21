import { Route, Routes } from 'react-router-dom'
import OrderEvent from './orderEvent/OrderEvent'

export function Customer() {
  return (
    <>
      <Routes>
        <Route path="/customer/order-event" element={<OrderEvent />} />
      </Routes>
    </>
  )
}
