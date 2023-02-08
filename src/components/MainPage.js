import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Admin from './adminPage/Admin'
import { NavBar } from './navBar/NavBar'
import User from './userPage/User'
import './mainpage.css'
import Register from './users/Register'
import Login from './users/Login'

 const MainPage = () => {
  return (
    <div className='main-container'>
        <Router>
        <NavBar />
            <Routes>
                <Route path='/' element={<User />}/>
                <Route path='Admin' element={<Admin />}/>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />

            </Routes>
        </Router>
    </div>
  )
}

export default MainPage