
import AdminNavbar from "../pages/AdminNavbar";
import '../styles/AdminDashboardStyle.css';
import { useEffect, useState } from "react";
import AdminEmployee from "./AdminEmployee";
import AdminManager from "./AdminManager";
import AdminProject from "./AdminProjects";
import AddEmployee from "./AddEmployee";
import AddProject from "./AddProject";
import { useNavigate } from "react-router-dom";
import AssignProject from "./AssignProject";
import RequestResoursePage from "./RequestResoursePage";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const isLoggedin = localStorage.getItem('login');
    const isAdmin = localStorage.getItem('admin')
    if (!isLoggedin || !isAdmin) {
      navigate('/')
    }
  }, [])
  const [currentPage, setCurrentPage] = useState('employee');
  
  const setToProjectsPage = () => {
    setCurrentPage('projects');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'employee': return <AdminEmployee setCurrentPage={setCurrentPage} setUserData={setUserData} />;
      case 'manager': return <AdminManager />;
      case 'projects': return <AdminProject />;
      case 'add-employee': return <AddEmployee setCurrentPage={setCurrentPage} />;
      case 'add-project': return <AddProject setCurrentPage={setCurrentPage}  setToProjectsPage={setToProjectsPage}/>
      case 'assign-project': return <AssignProject userData={userData} setCurrentPage={setCurrentPage}/>
      case 'requests': return <RequestResoursePage />
      default: return <AdminEmployee />
    }
  }
  
  const currentNavbar = 'admin';
  return (
    <>
      {(currentPage !== 'add-project' && currentPage !== 'add-employee' && currentPage!=='assign-project') && <AdminNavbar currentPage={currentPage} setPage={setCurrentPage} currentNavbar={currentNavbar}/>}

      {renderPage()}

    </>
  )
}

export default AdminDashboard;