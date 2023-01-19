import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
function ClientDetail() {
    const { type } = useParams();
    return (
        <div style={{ height: "90vh" }} className=' d-flex justify-content-center align-items-center text-light'>
            <h1 style={{ fontSize: "80px" }}>Hi, {sessionStorage.getItem('name')}<br></br>
                Your account type: {type}<br></br>
                Your email: {sessionStorage.getItem('email')} <br></br>
            </h1>
        </div >
    );
}

export default ClientDetail;