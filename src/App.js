import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRegistration from './pages/AdminRegistration';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './pages/Navbar';
import { useState } from 'react';
import EmployeeDashboard from './pages/EmployeeDashboard';
import { useEffect } from 'react';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {

  const beforeLogin = "Employee Management System";

  const [headerName, setHeaderName] = useState("Employee Management System");

  const [isItLoggedin, setIsItLoggedIn] = useState(false);
  
  function settingIsItAdmin() {
    setIsItLoggedIn(true);
  }
  function settingIsItEmployee() {
    setIsItLoggedIn(true);
  }
  function settingIsItManager() {
    setIsItLoggedIn(true);
  }


  function logoutAll() {
    setIsItLoggedIn(false);
  }

  useEffect(() => {
    setIsItLoggedIn(window.localStorage.getItem('login'));
    setHeaderName(window.localStorage.getItem('header'))
  }, [])

  return (
    <BrowserRouter>
      {(!isItLoggedin) && <Navbar title={beforeLogin} logoutAll={logoutAll} />}
      {(isItLoggedin) && <Navbar title={headerName} logoutAll={logoutAll} />}
      <div>
        <Routes>
          <Route exact path='/' element={<Login settingIsItAdmin={settingIsItAdmin} settingIsItEmployee={settingIsItEmployee} settingIsItManager={settingIsItManager} setHeaderName={setHeaderName} />}></Route>
          <Route exact path='/add-admin' element={<AdminRegistration />}></Route>
          <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
          <Route exact path='/employee-dashboard' element={<EmployeeDashboard />} />
          <Route exact path='manager-dashboard' element={<ManagerDashboard />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
