import React, { useState } from 'react'
import '../styles/NavbarStyle.css'
import {useNavigate } from 'react-router-dom'
import Button from '../component/Button/Button';
export default function Navbar({title, logoutAll}) {
  
  const navigate = useNavigate();
  
  function allLogout(){
    localStorage.clear()
    logoutAll();
    navigate('/')
  }

  const [isLoggedIn, setIsLoggednIn] = useState(false);
  useState(()=>{
    setIsLoggednIn(window.localStorage.getItem('login'))
  },[]);

  return (
    <>
      <header>
        <div className="navbar">
          <div className="site-header">
            <h1>{title}</h1>
          </div> 
          <div className="logout">
            {isLoggedIn && <li className='logout-button'> <Button onClick={() => {allLogout()}} buttonText={'LogOut'}/> </li>}
          </div>
        </div>

      </header >
    </>
  )
}
