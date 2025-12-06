import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminEmployee from './AdminEmployee';
import AdminManager from './AdminManager';
import AdminProject from './AdminProjects';
import AdminNavbar from './AdminNavbar';
import ManagerRequestResoursePage from './ManagerRequestResoursePage';

export default function ManagerDashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = window.localStorage.getItem('login')
        const isManager = window.localStorage.getItem('manager')
        if (!isLoggedIn || !isManager) {
            navigate('/');
        }
    }, [])

    const [currentPage, setCurrentPage] = useState('employee');
    const [employeeId, setEmployeeId] = useState('');
    const [userData, setUserData] = useState({});

    const currentNavbar = 'manager';
    const currentRolePage = 'manager';

    const renderPage = () => {
        switch (currentPage) {
            case 'employee': return <AdminEmployee setCurrentPage={setCurrentPage} currentRolePage={currentRolePage} setEmployeeId={setEmployeeId} setUserData={setUserData}/>;
            case 'manager': return <AdminManager />;
            case 'projects': return <AdminProject />;
            case 'request-resourse': return <ManagerRequestResoursePage setCurrentPage={setCurrentPage} employeeId={employeeId} userData={userData}/> ;
            default: return <AdminEmployee setCurrentPage={setCurrentPage} currentRolePage={currentRolePage} setEmployeeId={setEmployeeId} setUserData={setUserData}/>
        }
    }

    return (
        <div>
            {currentPage!=='request-resourse' && <AdminNavbar currentPage={currentPage} setPage={setCurrentPage} currentNavbar={currentNavbar} />}

            {renderPage()}
        </div>
    )
}
