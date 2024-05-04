import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import User from './Components/User'
import CreateUser from './Components/CreateUser'
import UpdateUser from './Components/UpdateUser'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/CreateUser" element={<CreateUser />} />
      <Route path="/UpdateUser" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
    </>
    

  )
}

