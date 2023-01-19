import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Register_Component/Register_State';
import Login from './Login_Component/Login_State'
import Home from './Home_Component/Home_Component';
import Dashboard from './Dashboard_Component/Dashboard';
import FAQ from './Dashboard_Component/FAQ';
import Orders from './Dashboard_Component/Orders_Display/Orders_State';
import Contact from './Dashboard_Component/Contact_Display/Contact_State';
import ClientDetail from './Dashboard_Component/Clinet_Detail/Client_Detail';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route path='faq' element={<FAQ />} />
          <Route path='orders' element={<Orders />} />
          <Route path='contact' element={<Contact />} />
          <Route path='client/:type' element={<ClientDetail />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;