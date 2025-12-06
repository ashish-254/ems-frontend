import React, { useEffect, useState } from 'react';
import '../../styles/CardsStyle.css';
import PopUp from '../customealert/PopUpConfirm'
import Button from '../Button/Button';
import { getRequest, postRequest, putRequest } from '../../Service/Services';
import { CHECK_REQUEST_RESOURCE, GET_PROJECT_BY_ID, UNASSIGN_PROJECT_TO_EMPLOYEE } from '../../Service/urls';

export default function CardCopy({ data, setCurrentPage, setUserData,
    currentRolePage, setEmployeeId, toggleStateVariable }) {

    const [projects, setProjects] = useState('N/A');
    const [projectList, setProjectList] = useState([]);
    const [showRequestedButton, setShowRequestedButton] = useState(false);

    const popUpMessage = {
        message: "Do you really want to unassign project?"
    }
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        currentRolePage === 'manager' && apiCallToCheckRequested();
    }, [])

    async function apiCallToCheckRequested() {
        const givenData = {
            empId: data.empId,
            managerEmail: localStorage.getItem('managerEmail')
        }
        
        postRequest(CHECK_REQUEST_RESOURCE, givenData).then((response) => {
            if (response.data.message === "True") {
                setShowRequestedButton(true)
            }
        }).catch((error) => {
        })
    }

    function findProjectName(id) {
        
        getRequest(GET_PROJECT_BY_ID + id).then((response) => {
            setProjectList(prevProjectList => [...prevProjectList, response.data.projectName]);
        }).catch((error) => {
        })
    }

    function settingProjects() {
        if (projects === 'N/A') {
            const pro = projectList.join(', ');
            setProjects(pro);
        }
    }
    useState(async () => {
        setProjects('N/A')
        if (data.empProjectId !== null) {
            data.empProjectId.map((item) => {
                return findProjectName(item);
            })
        }
        settingProjects();
    }, [])

    function assignProjectPage() {
        setUserData(data);
        setCurrentPage('assign-project')
    }

    function requestResourse() {
        setEmployeeId(data.empId)
        setUserData(data);
        setCurrentPage('request-resourse');
    }

    async function handleConfirm() {
        
        putRequest(UNASSIGN_PROJECT_TO_EMPLOYEE + data.empId).then((response) => {
            toggleStateVariable();
            window.location.reload();
        }).catch((error) => {
        })
        setShowPopUp(false);
    }
    const formatDesignation = (value) => {
        const words = value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return words.join(' ');
      };

    return (
        <>
            {showPopUp && <PopUp message={popUpMessage.message} onConfirm={() => handleConfirm()} onClose={() => { setShowPopUp(false); }} />}
            <div className="card">
                <div className="left-section">
                    <div className="employee-name larger">{data.empName}</div>
                    <div className="field smaller">{formatDesignation(data.empDesignation)}</div>
                    <div className="field"><strong>Project Name: </strong>{projectList.length !== 0 ? projectList.join(', ') : "N/A"}</div>
                    <div className="field "><strong>Manager: </strong> {data.managerName}</div>
                    <div className="field"><strong>Contact: </strong>{data.empContactNo}</div>
                    <div className="field "><strong>Email: </strong> {data.empEmail}</div>
                    {(projectList.length === 0) && (currentRolePage === 'manager') &&
                        (!showRequestedButton
                            ? <div div className="field-button"><Button className={'request-resourse'} buttonText={'Request resourse'} onClick={requestResourse} /></div>
                            : <div div className="field-button"><Button className={'project-requested'} buttonText={'Requested'} disabled={true} /></div>
                        )
                    }
                </div>
                <div className="right-section">
                    <div className="field"><strong>Employee Id: </strong>{data.empId}</div>
                    <div><br /></div>
                    <div className="field "><strong>DOJ: </strong> {data.empDoj}</div>
                    <div className="field "><strong>DOB: </strong> {data.empDob}</div>
                    <div className="field "><strong>Location: </strong> {data.empLocation}</div>
                    {currentRolePage === 'manager' && <div className="field "><strong>Skills: </strong> {data.empSkills.join(', ')}</div>}

                    {((projectList.length === 0) && (currentRolePage !== 'manager')) && <div className="field-button"><Button className={'assign-project'} buttonText={'Assign Project'} onClick={assignProjectPage} /></div>}
                    {((projectList.length !== 0) && (currentRolePage !== 'manager')) && <div className="field-button"><Button className={'assign-project'} buttonText={'Unassign Project'} onClick={() => setShowPopUp(true)} /></div>}

                </div>
            </div >
        </>
    )
}
