import { useEffect, useState } from 'react'
import React from 'react'
import '../styles/AdminDashboardStyle.css';
import CardsCopy from '../component/Cards/CardCopy'
import skills from '../alllists/SkillsList'
import CustomMultipleDropdown from '../component/CustomMultipleDropdown/CustomMultipleDropdown';
import Button from '../component/Button/Button';
import { ALL_EMPLOYEE, FILTERED_EMPLOYEE } from '../Service/urls';
import { getRequest, postRequest } from '../Service/Services';
import Label from '../component/Label/Label';
import NoDataCard from '../component/Cards/NoDataCard'


const AdminEmployee = ({ setCurrentPage, setUserData, currentRolePage, setEmployeeId }) => {
  const [data, setData] = useState([]);
  const [showOnlyUnassigned, setShowOnlyUnassigned] = useState(false);

  const filteredSkills = [];

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [stateVariable, setStateVariable] = useState(false);

  async function toggleStateVariable() {
    setStateVariable(!stateVariable);
  }

  async function apiCall() {
    getRequest(ALL_EMPLOYEE).then((response) => {
      setData(response.data)
    }).catch((error) => {
    })
  }

  useEffect(() => {
    apiCall();
  }, [stateVariable]);

  function handleSkillChange(selectedOptions) {
    const selectedSkillsValues = selectedOptions.map(option => option.value);
    setSelectedSkills(selectedSkillsValues);
  }

  async function searchEmployeesByConditionApicall() {
    const dto = {
      selectedSkills: selectedSkills,
      showOnlyUnassigned: showOnlyUnassigned
    }
    postRequest(FILTERED_EMPLOYEE, dto).then((response) => {
      setData(response.data)
    }).catch((error) => {
    })
  }

  return (

    <>


      <div className='card-container'>
        {currentRolePage === 'manager' && <div className='searching-by-manager'>
          <div className='searching-by-manager-dropdown'>
            <CustomMultipleDropdown
              options={skills.map((skill) => ({
                value: skill,
                label: skill,
              }))}
              selectedOptions={filteredSkills.map((skill) => ({
                value: skill,
                label: skill,
              }))}
              onChange={handleSkillChange}
              placeholder="Select Skills"
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={showOnlyUnassigned}
                onChange={() => setShowOnlyUnassigned(!showOnlyUnassigned)}
              />
              <Label className={'searching-by-manager-unassigned-employee-label'} labelText={" Show only unassigned employees "} />
            </label>
          </div>

          <div className='filter-button-div'>
            <Button className={'filter-button'} onClick={searchEmployeesByConditionApicall} buttonText={'Search'} />
          </div>
        </div>
        }

        {
          data.length === 0 && <div className='no-data-div'>
            <NoDataCard message={"No employee exist in the system."} />
          </div>
        }

        {data.length !== 0 && <div className="outer-card">
          <div className="cards">
            {data
              .filter(object => object.empId !== 'N0001')
              .sort((a, b) => a.empName.localeCompare(b.empName))
              .map((object) => (
                <CardsCopy key={object.empId}
                  data={object}
                  setCurrentPage={setCurrentPage}
                  setUserData={setUserData}
                  currentRolePage={currentRolePage}
                  setEmployeeId={setEmployeeId}
                  toggleStateVariable={toggleStateVariable}
                />
              ))}
          </div>
        </div>}
      </div>
    </>
  )
}

export default AdminEmployee;
