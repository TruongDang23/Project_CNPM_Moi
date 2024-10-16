import { createContext, useState } from 'react'
import OrderData from '../data/orderData'

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const markdata = OrderData
  const [selectedHall, setSelectedHall] = useState(null)
  const [selectedMC, setSelectedMC] = useState(null)
  const [selectedNC, setSelectedNC] = useState(null)
  const [selectedCombo, setSelectedCombo] = useState(null)
  const [selectedThiep, setSelectedThiep] = useState(null)

  const getAllSelections = () => {
    return {
      hoiTruong: selectedHall,
      mc: selectedMC,
      nhacCong: selectedNC,
      combo: selectedCombo,
      thiep: selectedThiep
    }
  }

  // Hàm kiểm tra điều kiện trước khi hoàn tất
  const canCompleteOrder = () => {
    if (!selectedHall) {
      return { valid: false, message: 'Hội trường không được để trống.' }
    }
    return { valid: true }
  }

  const value = {
    markdata,
    selectedHall,
    setSelectedHall,
    selectedMC,
    setSelectedMC,
    selectedNC,
    setSelectedNC,
    selectedCombo,
    setSelectedCombo,
    selectedThiep,
    setSelectedThiep,
    getAllSelections,
    canCompleteOrder
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
