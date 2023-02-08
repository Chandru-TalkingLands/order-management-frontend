import axios from 'axios'
import './login.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [formvalues,setformvalues] = useState({
        email:'',
        password:'',
    })
    
    const handleRegister =(e)=>{
        console.log(e.target.value)
        setformvalues({
            ...formvalues,
            [e.target.name]:e.target.value
        })

    }

    const handleformSubmit = (e) =>{
        e.preventDefault()
        console.log(formvalues)
        axios.post('http://localhost:4000/login',formvalues)
        .then(res =>{
            if(res.data.message == 'Success'){
                navigate('/')
            }
            console.log(res.data)
        })
        .catch(err =>console.log(err))
    }

  return (
    <div className='register-main-container'>

        <div className='register-image-container'>
            <img src='https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=600' />
        </div>

   
    <div className='register-container'>
        <h2>Register</h2>
        <form onSubmit={handleformSubmit}>
        <label>Email:</label>
        <input type='email' name='email' value={formvalues.email} onChange={handleRegister} />
        <label>Password:</label>
        <input type='text' name='password' value={formvalues.password} onChange={handleRegister} />

        <div style={{display:'flex',gap:'8px'}}>
        <button type='submit' >Login</button><span>Dont have account <Link className='regist-link' to='/register'>Register</Link></span>
        </div>
        
        </form>
    </div>
    </div>
  )
}

export default Login