import axios from 'axios'
import './register.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [formvalues,setformvalues] = useState({
        name:'',
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
        axios.post('http://localhost:4000/register',formvalues)
        .then(res =>{
            if(res.data){
                if(res.data.message == "Successs") navigate('/login')
            }
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
        <label>Name:</label>
        <input type='text' name='name' value={formvalues.name} onChange={handleRegister} />
        <label>Email:</label>
        <input type='email' name='email' value={formvalues.email} onChange={handleRegister} />
        <label>Password:</label>
        <input type='text' name='password' value={formvalues.password} onChange={handleRegister} />

        <div style={{display:'flex',gap:'8px'}}>
        <button type='submit' >Register</button><span>Already have account <Link className='regist-link' to='/login'>signin</Link></span>
        </div>
        
        </form>
    </div>
    </div>
  )
}

export default Register