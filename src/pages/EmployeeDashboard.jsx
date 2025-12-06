import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import EmployeeProfile from './EmployeeProfileCard';
import '../styles/EmployeeDashboardStyle.css';
import EmployeeOrganizationPage from './EmployeeOrganizationPage';
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeUpdateSkills from './EmployeeUpdateSkills';

export default function EmployeeDashboard() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState('myprofile');

    useEffect(() => {
        const isLoggedIn = window.localStorage.getItem('login')
        const isEmployee = window.localStorage.getItem('employee')
        if (!isLoggedIn || !isEmployee) {
            navigate('/');
        }
    }, [])

    function renderPage() {
        switch (currentPage) {
            case 'myprofile': return (<div className="employee-card"><EmployeeProfile setCurrentPage={setCurrentPage} /></div>);
            case 'organization': return (<EmployeeOrganizationPage />);
            case 'update-skills': return (<EmployeeUpdateSkills setCurrentPage={setCurrentPage} />);
            default: return (<EmployeeProfile />)
        }
    }

    return (
        <>
            {currentPage !== 'update-skills' && <EmployeeNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            {renderPage()}
        </>
    )
}
