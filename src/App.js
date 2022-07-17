import React from 'react'
import { Toaster } from "react-hot-toast"
import { Routes, Route } from "react-router-dom"
import Signin from './pages/Signin'
import Home from './pages/Home'
import Login from './pages/Login'
import Modal from './components/Modal'
import { useSelector } from 'react-redux'

const App = () => {

  const { open, data } = useSelector(state => state.modal)
  return (
    <div className='bg-cyan-400 w-screen h-screen'>
      <Toaster position='top-right' />
      {
        open && <Modal name={open} data={data} />
      }
      {/* <Modal name={open} data={data} /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App