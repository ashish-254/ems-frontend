import React, { useState } from 'react'
import '../styles/AdminNavbarStyle.css'
import Button from '../component/Button/Button';
const AdminNavbar = ({ setPage, currentPage, currentNavbar }) => {

    const [currentButton, setCurrentButton] = useState('employee');

    const renderButton = () => {
        switch (currentPage) {
            case 'employee': return <Button className={'add-button'} onClick={() => handlePageChange('add-employee')} buttonText={'Add Employee'} />;
            case 'manager': return <div className='manager-button'></div>;
            case 'projects': return <Button className={'add-button'} onClick={() => handlePageChange('add-project')} buttonText={'Add Project'} />;
            default: return <div></div>
        }
    }

    function isActive(page) {
        return (page === currentPage) ? true : false;
    }


    function handlePageChange(pagename) {
        setPage(pagename);
        if (pagename === 'employee' || pagename === 'manager' || pagename === 'projects') {
            setCurrentButton(pagename);
        }
        if (pagename === 'add-employee') {
            setCurrentButton('employee')
        }
        if (pagename === 'add-project') {
            setCurrentButton('projects')
        }
    };

    return (
        <>
            <nav className={`${currentNavbar === 'manager' ? 'managernavbar' : 'adminnavbar'} `}>
                <div className="flexing">
                    <ul className="menu">
                        {currentNavbar === 'admin' && <li className='page-links'><button className={` ${isActive('requests') ? 'active' : 'page-links-link'}`} onClick={() => handlePageChange('requests')}>Request</button></li>}

                        <li className='page-links'> <Button className={` ${isActive('employee') ? 'active' : 'page-links-link'}`} onClick={() => handlePageChange('employee')} buttonText={'Employee'}/> </li>
                        <li className='page-links'> <Button className={` ${isActive('manager') ? 'active' : 'page-links-link'}`} onClick={() => handlePageChange('manager')} buttonText={'Manager'}/></li>
                        <li className='page-links'> <Button className={` ${isActive('projects') ? 'active' : 'page-links-link'}`}  onClick={() => handlePageChange('projects')} buttonText={'Project'}/> </li>

                    </ul>
                </div>
                {currentNavbar !== 'manager' && <div className="button-style">
                    <li className='add-employee'><div className="add-employee-div">{renderButton()}</div></li>
                </div>}
            </nav>
        </>
    )
}

export default AdminNavbar;
