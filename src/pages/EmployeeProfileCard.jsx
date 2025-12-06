import React, { useState } from 'react'
import '../styles/EmployeeProfileStyle.css'
import Button from '../component/Button/Button';
import { useEffect } from 'react';
import { getRequest } from '../Service/Services';
import { GET_EMPLOYEE_BY_EMAIL, GET_PROJECT_BY_ID } from '../Service/urls';
import Label from '../component/Label/Label';

export default function EmployeeProfile({ setCurrentPage }) {
  const [projects, setProjects] = useState('N/A');
  const [manager, setManager] = useState('');
  
  const [data, setData] = useState({});

  useEffect(() => {
    getRequest(GET_EMPLOYEE_BY_EMAIL + localStorage.getItem('employeeEmail')).then((response) => {
      setData(response.data);
      setManager(response.data.managerName);
      localStorage.setItem('skillsSelected', response.data.empSkills);
      data.empProjectId && findProjectName(data.empProjectId[0])
    }).catch((error) => {
    })
  }, [])

  function findProjectName(id) {
    if(id){
      getRequest(GET_PROJECT_BY_ID + id).then((response) => {
        setProjects(response.data.projectName);
      }).catch((error) => {
      })
    }
  }

  return (
    <>
      {data.empProjectId && findProjectName(data.empProjectId[0])}

      <div className="employee-container">
        <div className="employee-dashboard-container">
          <div className="employee-id-row">
            <div className="employee-id-col">
              <div className="dashboard-label">
                <Label labelText={'EmpId: '} />
              </div>
              <div className="dashboard-value empId-value">
                <p>{data.empId}</p>
              </div>
            </div>
          </div>
          <div className="dashboard">
            <div className="dashboard-row">
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={'Name: '} />
                </div>
                <div className="dashboard-value">
                  <p>{data.empName}</p>
                </div>
              </div>
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={"Contact Number:"} />
                </div>
                <div className="dashboard-value">
                  <p>{data.empContactNo}</p>
                </div>
              </div>
            </div>
            <div className="dashboard-row">
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={"Email:"} />
                </div>
                <div className="dashboard-value">
                  <p className='paragraph-email'>{data.empEmail}</p>
                </div>
              </div>
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={"Project: "} />
                </div>
                <div className="dashboard-value">
                  <p>{projects}</p>
                </div>
              </div>
            </div>
            <div className="dashboard-row">
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={"DOB: "} />
                </div>
                <div className="dashboard-value">
                  <p>{data.empDob}</p>
                </div>
              </div>
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={"Manager: "} />
                </div>
                <div className="dashboard-value">
                  <p>{manager}</p>
                </div>
              </div>
            </div>
            <div className="dashboard-row">
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={"DOJ: "} />
                </div>
                <div className="dashboard-value">
                  <p>{data.empDoj}</p>
                </div>
              </div>
              <div className="dashboard-col">
                <div className="dashboard-label">
                  <Label labelText={"Location: "} />
                </div>
                <div className="dashboard-value">
                  <p>{data.empLocation}</p>
                </div>
              </div>
            </div>
            <div className="skills-row">
              <div className="skills-col">
                <div className="dashboard-label">
                  <Label labelText={"Skills: "} />
                </div>
                <div className="dashboard-value">
                  <p>{
                    data.empSkills && data.empSkills.length > 0 && data.empSkills.join(', ')
                  }</p>
                </div>
              </div>
            </div>
            <div className="update-skills">
              <Button className={'update-skills-button'} buttonText={"Update Skills"} onClick={() => setCurrentPage('update-skills')} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
