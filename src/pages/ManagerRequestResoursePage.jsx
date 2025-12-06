import React, { useEffect, useState } from 'react'
import Button from '../component/Button/Button'
import '../styles/AdminRegistrationStyle.css'
import { ADD_REQUEST, GET_ALL_PROJECT_BY_MANAGER_EMAIL } from '../Service/urls'
import { getRequest, postRequest } from '../Service/Services'
import CommonSelect from '../component/CustomSelect/CommonSelect'
import Label from '../component/Label/Label'
import LabelAndTextarea from '../component/LabelAndInputFIeld/LabelAndTextarea'

export default function ManagerRequestResoursePage({ employeeId, setCurrentPage, userData }) {
  const [regData, setRegData] = useState({
    managerEmail: localStorage.getItem('managerEmail'),
    empId: employeeId,
    projectId: '',
    comment: ''
  })
  const [projects, setProjects] = useState([]);
  const [errorProject, setErrorProject] = useState("");
  const [errorDescription, setErrorDescription] = useState("");

  function allProjectList() {
    getRequest(GET_ALL_PROJECT_BY_MANAGER_EMAIL + localStorage.getItem('managerEmail')).then((response) => {
      setProjects(response.data);
    }).catch((error)=>{
    })
  }
  useEffect(() => {
    allProjectList();
  }, [])

  function checkEmptyData() {
    if (!regData.projectId) {
      setErrorProject("Project name is required");
    }
    if (!regData.comment) {
      setErrorDescription("Comment is required");
    }
  }

  function validateData(name, value) {
    if (name === 'comment') {
      if (value === '') {
        setErrorDescription("Comment is required")
      } else {
        setErrorDescription("");
      }
    }
    if (name === 'projectId') {
      if (value === '') {
        setErrorProject("Select a project.")
      } else {
        setErrorProject("")
      }
    }
  }

  function checkErrors() {
    if (errorDescription === "" &&
      errorProject === "") {
      return true;
    }
    return false;
  }

  function apiCall(regdata) {
    postRequest(ADD_REQUEST, regData).then((response) => {
      setCurrentPage('employee')
    }).catch((error) => {
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    checkEmptyData();
    if (!checkErrors() || Object.values(regData).some(value => value === '')) {
    } else {
      apiCall(regData)
    }
  }

  function handleChange(event) {
    setRegData({ ...regData, [event.target.name]: event.target.value })
    validateData(event.target.name, event.target.value);
  }

  return (
    <>
      <div className="container">
        <div className="inner_container">
          <div className="title">
            <Label id={'title_name'} labelText={'Request Resource'}/>
          </div>

          <form className='admin_form' onSubmit={handleSubmit}>
            <div className="data">

              <div className="row">
                <div className="inputs">
                  <Label className={'input_label_for_name'} labelText={userData.empName}/>
                </div>
              </div>

              <div className="row">
                <div className="inputs">
                  <Label className={'input_label'} labelText={'Project Name'}/>
                  <CommonSelect
                    className={'input_field'}
                    name={'projectId'}
                    placeholder={'Select project'}
                    handleChange={handleChange}
                    options={projects.map((item) => ({
                      value: item.id,
                      label: item.projectName
                  }))}
                  />
                </div>
                {errorProject && <span className='errors'>{errorProject}</span>}
              </div>

              <div className="row">
                <LabelAndTextarea label_text={'Comment'} input_name={'comment'} input_placeHolder={'Write comment'} onChange={handleChange} />
                {errorDescription && <span className='errors'>{errorDescription}</span>}
              </div>


              <div className="submit">
                <Button className={'submit_btn'} type={'submit'} buttonText={'Request'} />
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
