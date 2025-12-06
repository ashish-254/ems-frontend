import React, { useEffect, useState } from 'react'
import '../styles/AdminRegistrationStyle.css'
import PopUp from '../component/customealert/PopUp'
import skills from '../alllists/SkillsList'
import CustomMultipleDropdown from '../component/CustomMultipleDropdown/CustomMultipleDropdown'
import Button from '../component/Button/Button';
import LableAndInputField from '../component/LabelAndInputFIeld/LabelAndInputField';
import LabelAndTextarea from '../component/LabelAndInputFIeld/LabelAndTextarea'
import { getRequest, postRequest, putRequest } from '../Service/Services';
import { ADD_PROJECT, ALL_MANAGER_FOR_PROJECT, ASSIGN_PROJECT_TO_MANAGER } from '../Service/urls';
import CommonSelect from '../component/CustomSelect/CommonSelect'
import Label from '../component/Label/Label'

export default function AddProject({ setCurrentPage, setToProjectsPage }) {

    const [manager, setManager] = useState([])

    async function ManagerApiCall() {
        getRequest(ALL_MANAGER_FOR_PROJECT).then((response) => {
            setManager(response.data);
        }).catch((error) => {
        })
    }

    useEffect(() => {
        ManagerApiCall();
    }, [])

    const [regData, setRegData] = useState({
        projectName: "",
        managerId: "",
        startDate: "",
        skills: [],
        description: ""
    })

    const [errorprojectName, setErrorprojectName] = useState("");
    const [errorManagerId, setErrorManagerId] = useState("");
    const [errorStartDate, setErrorStartDate] = useState("");
    const [errorSkills, setErrorSkills] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [popUpMessage, setPopUpMessage] = useState({})
    const [showPopUp, setShowPopUp] = useState(false);

    function checkEmptyData() {
        if (!regData.projectName) {
            setErrorprojectName("Project name is required");
        }
        if (!regData.managerId) {
            setErrorManagerId("Manager is required");
        }
        if (!regData.startDate) {
            setErrorStartDate("Start date is required");
        }
        if (!regData.description) {
            setErrorDescription("Description is required");
        }
        if (regData.skills.length === 0) {
            setErrorSkills("Skills are required");
        }
    }

    function validateData(name, value) {
        if (name === 'projectName') {
            const alphaPattern = /^^[A-Za-z ]+$/;
            if (value.trim() === '') {
                setErrorprojectName("Project name is required")
            } else if (!alphaPattern.test(value)) {
                setErrorprojectName("Project Name must contain only letters.");
            }
            else {
                setErrorprojectName("");
            }
        }

        if (name === 'managerId') {
            if (value.trim() === '') {
                setErrorManagerId("Manager is required")
            } else {
                setErrorManagerId("");
            }
        }

        const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/;
        if (name === 'startDate') {
            if (value.trim() === '') {
                setErrorStartDate("Start date is required");
            } else if (!datePattern.test(value)) {
                setErrorStartDate("Start Date Should be in form of DD-MM-YYYY");
            } else if (!validDay(value)) {
                setErrorStartDate("Start Date should not be future date.")
            } else {
                setErrorStartDate("");
            }
        }

        if (name === 'skills') {
            if (value.length === 0) {
                setErrorSkills("Skills are required");
            } else {
                setErrorSkills("");
            }
        }

        if (name === 'description') {
            if (value.trim() === '') {
                setErrorDescription("Description is required");
            } else {
                setErrorDescription("");
            }
        }
    }

    function checkErrors() {
        if (errorprojectName === "" &&
            errorManagerId === "" &&
            errorStartDate === "" &&
            errorSkills === "" &&
            errorDescription === "") {
            return true;
        }
        return false;
    }

    const validDay = (inputDate) => {
        const [day, month, year] = inputDate.split('-').map(Number);

        const givneDate = new Date(year, month - 1, day);
        const currentDate = new Date();

        const yearDiff = currentDate.getFullYear() - givneDate.getFullYear();
        const monthDiff = currentDate.getMonth() - givneDate.getMonth();
        const dayDiff = currentDate.getDate() - givneDate.getDate();
        if (yearDiff < 0 || (yearDiff === 0 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            return false;
        }
        return true;
    };

    async function addProjectToManger(emId, projectId) {
        const projectDto = {
            empProjectId: projectId,
        }
        putRequest(ASSIGN_PROJECT_TO_MANAGER + emId, projectDto).then((response) => {
        }).catch((error) => {
        })
    }

    async function apiCall(data) {
        const resMessage = {};
        postRequest(ADD_PROJECT, data).then((response) => {
            addProjectToManger(regData.managerId, response.data.id);
            resMessage.message = "Project Added successfully.";
            setCurrentPage('projects')
        }).catch((error) => {
            resMessage.message = error.response.data.message;
            setPopUpMessage(resMessage)
            setShowPopUp(true);
        })
    }

    function handleChange(event) {
        setRegData({ ...regData, [event.target.name]: event.target.value })
        validateData(event.target.name, event.target.value);
    }

    function handleSkillChange(selectedOptions) {
        setSelectedSkills(selectedOptions);
        const selectedSkillsValues = selectedOptions.map(option => option.value);
        setRegData(prevRegData => ({
            ...prevRegData,
            skills: selectedSkillsValues
        }));
        validateData('skills', selectedSkillsValues)
    }

    function handleSubmit(event) {
        event.preventDefault();
        checkEmptyData();
        if (!checkErrors() || Object.values(regData).some(value => value === '') || regData.skills.length===0) {
        } else {
            apiCall(regData)
        }

    }


    return (
        <>
            <div className="container">
                {showPopUp && <PopUp message={popUpMessage.message} onClose={() => { setShowPopUp(false); }} />}
                <div className="inner_container">
                    <div className="title">
                        <label id="title_name">Add Project</label>
                    </div>

                    <form className='admin_form' onSubmit={handleSubmit}>
                        <div className="data">

                            <div className="row">
                                <LableAndInputField label_text={'Project Name'} input_name={'projectName'} input_placeHolder={'Enter Project Name'} onChange={handleChange} />
                                {errorprojectName && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorprojectName}</span>
                                </div>}
                            </div>

                            <div className="row">
                                <div className="inputs">
                                    <Label className={'input_label'} labelText={'Manager'}/>
                                    <CommonSelect
                                        className={'input_field'}
                                        name={'managerId'}
                                        placeholder={'Select manager'}
                                        handleChange={handleChange}
                                        options={manager.map((item) => ({
                                            value: item.emId,
                                            label: `${item.empId} - ${item.empName}`
                                        }))}
                                    />
                                </div>
                                {errorManagerId && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorManagerId}</span>
                                </div>}
                            </div>

                            <div className="row">
                                <LableAndInputField label_text={'Start Date'} input_name={'startDate'} input_placeHolder={'DD-MM-YYYY'} onChange={handleChange} />
                                {errorStartDate && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorStartDate}</span>
                                </div>}
                            </div>

                            <div className="row">
                                <div className="inputs">
                                    <Label className={'input_label'} labelText={'Skill Required'}/>
                                    <CustomMultipleDropdown
                                        options={skills.map((skill) => ({
                                            value: skill,
                                            label: skill,
                                        }))}
                                        selectedOptions={selectedSkills.map((skill) => ({
                                            value: skill,
                                            label: skill,
                                        }))}
                                        onChange={handleSkillChange}
                                        placeholder="Select Skills"
                                    />
                                </div>
                                {errorSkills && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorSkills}</span>
                                </div>}
                            </div>

                            <div className="row">
                                <LabelAndTextarea label_text={'Description'} input_name={'description'} input_placeHolder={'Write description'} onChange={handleChange} />
                                {errorDescription && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorDescription}</span>
                                </div>}
                            </div>

                            <div className="submit">
                                <Button className={'submit_btn'} type={'submit'} buttonText={'Add Project'} />
                            </div>

                            <div className="cancel">
                                <Button className={'cancel_btn'} type={'text'} onClick={setToProjectsPage} buttonText={'Cancel'} />
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
