import React, { createContext, useState, useEffect } from 'react'
import APIClient from '../api/client'

export const AdminTQContext = createContext()

export const AdminTQProvider = ({ children }) => {
  const [countData, setCountData] = useState({})

  useEffect(() => {
    const apiClient = new APIClient('admin/count-active')
    apiClient
      .find()
      .then((response) => {
        setCountData(response.data.count)
        console.log(response.data.count)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const value = { countData }

  return (
    <AdminTQContext.Provider value={value}>{children}</AdminTQContext.Provider>
  )
}
