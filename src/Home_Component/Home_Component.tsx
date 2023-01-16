import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    return (<div style={{ height: "100vh" }} className=' d-flex justify-content-center align-items-center'>
        <div className=''>
            <h1 className='text-light' style={{ fontSize: "100px" }}>Welcome,<br /> It's Computer Service</h1>
            <div className='d-flex justify-content-center'>
                <button type='button' className='btn btn-success btn-lg' onClick={() => navigate('/register')}> Navigate to Register Form</button>
                <button type='button' className='btn btn-warning ms-5 btn-lg' onClick={() => navigate('/login')}> Navigate to Login Form</button>
            </div>
        </div>
    </div >);
}

export default Home;