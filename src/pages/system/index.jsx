import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Welcome from "./welcome/Welcome"

export function System() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}