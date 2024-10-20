import { Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import Welcome from './welcome/Welcome'
import ListHall from './listService/Hall/ListHall'

export function System() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list-hall" element={<ListHall />} />
      </Routes>
    </>
  )
}
