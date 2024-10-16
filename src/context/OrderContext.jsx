import { createContext, useState } from 'react'
import OrderData from '../data/orderData'

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const orderdata = OrderData
  const [selectedHall, setSelectedHall] = useState(null)
  const [selectedMC, setSelectedMC] = useState(null)
  const [selectedNC, setSelectedNC] = useState(null)
  const [selectedCombo, setSelectedCombo] = useState(null)
  const [selectedThiep, setSelectedThiep] = useState(null)

  const value = {
    orderdata,
    selectedHall,
    setSelectedHall,
    selectedMC,
    setSelectedMC,
    selectedNC,
    setSelectedNC,
    selectedCombo,
    setSelectedCombo,
    selectedThiep,
    setSelectedThiep
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
