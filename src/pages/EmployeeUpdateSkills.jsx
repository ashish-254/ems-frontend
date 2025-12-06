import React, { useEffect, useState } from 'react'
import skills from '../alllists/SkillsList'
import CustomMultipleDropdown from '../component/CustomMultipleDropdown/CustomMultipleDropdown'
import Button from '../component/Button/Button';
import { GET_EMPLOYEE_BY_EMAIL, UPDATE_SKILLS } from '../Service/urls';
import { getRequest, putRequest } from '../Service/Services';
import Label from '../component/Label/Label';

export default function EmployeeUpdateSkills({ setCurrentPage }) {
  const [regData, setRegData] = useState({
    skills: []
  })

  const [errorSkills, setErrorSkills] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [alreadySelectedSkills, setAlreadySelectedSkills] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    getRequest(GET_EMPLOYEE_BY_EMAIL + localStorage.getItem('employeeEmail')).then((response) => {
      setSelectedSkills(response.data.empSkills)
      setRegData({...regData, skills: response.data.empSkills});
      setAlreadySelectedSkills(response.data.empSkills);
      setTimeout(() => {
        setDataFetched(true);
      }, 200);
    }).catch((error) => {
    })
  }, [])

  function checkEmptyData() {
    if (regData.skills.length === 0) {
      setErrorSkills("Skills are required");
    }
  }

  function validateData(name, value) {
    if (name === 'skills') {
      if (value.length === 0) {
        setErrorSkills("Skills are required");
      } else {
        setErrorSkills("");
      }
    }
  }

  function handleSkillChange(selectedOptions) {
    setSelectedSkills(selectedOptions);
    const selectedSkillsValues = selectedOptions.map(option => option.value);
    setRegData({ ...regData, skills: selectedSkillsValues });
    validateData('skills', selectedSkillsValues)
  }

  function checkError() {
    if (errorSkills === '') {
      return true;
    }
    return false
  }

  function apiCall() {
    putRequest(UPDATE_SKILLS + localStorage.getItem('employeeEmail'), regData).then((response) => {
      setCurrentPage('myprofile');
    }).catch((error) => {
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    checkEmptyData();
    if (checkError()) {
      apiCall();
    }
  }


  return (
    <>
      <div className="container">
        <div className="inner_container">
          <div className="title">
            <Label id={'title_name'} labelText={'Update Skills'}/>
          </div>

          <form className='admin_form' onSubmit={handleSubmit}>
            <div className="data">
              <div className="row">
                <div className="inputs">
                  <Label className={'input_label'} labelText={'Skills'}/>
                  {dataFetched && <CustomMultipleDropdown
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
                    alreadySelectedSkills={alreadySelectedSkills}
                  />}
                </div>
                {errorSkills && <span className='errors'>{errorSkills}</span>}

                <div className="submit">
                  <Button className={'submit_btn'} type={'submit'} buttonText={'Update'} />
                </div>

                <div className="cancel">
                  <Button className={'cancel_btn'} type={'text'} onClick={() => setCurrentPage('myprofile')} buttonText={'Cancel'} />
                </div>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}