import { Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import Welcome from './welcome/Welcome'
import ListHall from './listService/Hall/ListHall'
import ListCombo from './listService/Combo/ListCombo'
import ListNC from './listService/NC/ListNC'
import ListMC from './listService/MC/ListMC'
import ListThiep from './listService/Thiep/ListThiep'
import SignUp from './signup/SignUp'
import ForgotPass from './forgotPass/ForgotPass'
import ChatAI from './chatAI/ChatAI'

export function System() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-pass" element={<ForgotPass />} />
        <Route path="/chat-ai" element={<ChatAI />} />
        <Route path="/list-hall" element={<ListHall />} />
        <Route path="/list-combo" element={<ListCombo />} />
        <Route path="/list-nc" element={<ListNC />} />
        <Route path="/list-mc" element={<ListMC />} />
        <Route path="/list-thiep" element={<ListThiep />} />
      </Routes>
    </>
  )
}
