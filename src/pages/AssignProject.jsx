import React, { useEffect, useState } from 'react'
import Button from '../component/Button/Button';
import { getRequest, putRequest } from '../Service/Services';
import { ASSIGN_PROJECT_TO_EMPLOYEE, GET_ALL_PROJECT } from '../Service/urls';
import CommonSelect from '../component/CustomSelect/CommonSelect';
import Label from '../component/Label/Label';

export default function AssignProject({ userData, setCurrentPage }) {

    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [projectManagerId, setProjectManagerId] = useState('');
    const [errorProject, setErrorProject] = useState("");

    function allProjectList() {
        getRequest(GET_ALL_PROJECT).then((response) => {
            setProjects(response.data);
        })
    }
    useEffect(() => {
        allProjectList();
    }, []);

    async function validateData() {
        if (projectId === '' || projectManagerId === '') {
            setErrorProject("Project is Required");
        } else {
            setErrorProject("");
        }
    }
    async function checkErrors() {
        if (errorProject === "") {
            return true;
        }
        return false;
    }

    function handleChange(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        if (!selectedOption) {
            setProjectId('');
            setProjectManagerId('');
            setErrorProject('Select a project.');
            return;
        }
        const selectedValue = selectedOption.value;
        try {
            const selectedProjectObject = JSON.parse(selectedValue);
            setProjectId(selectedProjectObject.id);
            setProjectManagerId(selectedProjectObject.managerId);
            setErrorProject('');
        } catch (error) {
            setProjectId('');
            setProjectManagerId('');
            setErrorProject('Select a project.');
        }
    }

    function apiCall() {
        const dto = {
            projectId: projectId,
            projectManagerId: projectManagerId
        }
        
        putRequest(ASSIGN_PROJECT_TO_EMPLOYEE + userData.empId, dto).then((response) => {
            setCurrentPage('employee');
        }).catch((error) => {
        })
    }


    function handleSubmit(event) {
        event.preventDefault();
        validateData();
        if (checkErrors() && projectId && projectManagerId) {
            apiCall();
        }
    }

    return (
        <>

            <div className="container">
                <div className="inner_container">
                    <div className="title">
                        <Label id={'title_name'} labelText={'Assign Project'} />
                    </div>

                    <form className='admin_form' onSubmit={handleSubmit}>
                        <div className="data">
                            <div className="row">
                                <div className="inputs">
                                    <Label className={'input_label_for_name'} labelText={userData.empName} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="inputs">
                                    <Label className={'input_label'} labelText={'Project'} />
                                    <CommonSelect
                                        className={'input_field'}
                                        name={'managerId'}
                                        placeholder={'Select Project'}
                                        handleChange={handleChange}
                                        options={projects.map((item) => ({
                                            value: JSON.stringify(item),
                                            label: item.projectName
                                        }))}
                                    />
                                </div>
                                {errorProject && <span className='errors'>{errorProject}</span>}
                            </div>

                            <div className="submit">
                                <Button className={'submit_btn'} type={'submit'} buttonText={'Assign Project'} />
                            </div>

                            <div className="cancel">
                                <Button className={'cancel_btn'} type={'text'} onClick={() => setCurrentPage('employee')} buttonText={'Cancel'} />
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
