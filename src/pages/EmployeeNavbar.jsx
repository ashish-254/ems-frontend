import React, { useState } from 'react'
import '../styles/AdminNavbarStyle.css'
import Button from '../component/Button/Button';
const EmployeeNavbar = ({ currentPage, setCurrentPage }) => {

    function isActive(page) {
        return (page === currentPage) ? true : false;
    }

    return (
        <>
            <nav className="employeenavbar">
                <div className="flexing">
                    <ul className="menu">
                        <li className='page-links'> <Button className={` ${isActive('myprofile') ? 'active' : 'page-links-link'}`} onClick={() => { setCurrentPage('myprofile') }} buttonText={'My Profile'}/> </li>
                        <li className='page-links'><Button className={` ${isActive('organization') ? 'active' : 'page-links-link'}`} onClick={() => { setCurrentPage('organization') }} buttonText={'Organization'}/></li>
                    </ul>
                </div>

            </nav>
        </>
    )
}

export default EmployeeNavbar;
