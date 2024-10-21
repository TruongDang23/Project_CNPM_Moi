import { Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import Welcome from './welcome/Welcome'
import ListHall from './listService/Hall/ListHall'
import ListCombo from './listService/Combo/ListCombo'
import ListNC from './listService/NC/ListNC'

export function System() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list-hall" element={<ListHall />} />
        <Route path="/list-combo" element={<ListCombo />} />
        <Route path="/list-nc" element={<ListNC />} />
      </Routes>
    </>
  )
}
