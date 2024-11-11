import { createContext, useState } from 'react'

export const ListNCContext = createContext()

export const ListNCProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({})

  return (
    <ListNCContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </ListNCContext.Provider>
  )
}
