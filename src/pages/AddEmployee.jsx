import React, { useState } from "react";
import bcrypt from 'bcryptjs';
import PopUp from "../component/customealert/PopUp";
import location from "../alllists/LocationList";
import designation from "../alllists/DesignationList";
import role from "../alllists/Role";
import skills from "../alllists/SkillsList";
import CustomMultipleDropdown from '../component/CustomMultipleDropdown/CustomMultipleDropdown'
import Button from "../component/Button/Button";
import LableAndInputField from "../component/LabelAndInputFIeld/LabelAndInputField";
import Select from "../component/CustomSelect/Select";
import { postRequest } from "../Service/Services";
import { ADD_EMPLOYEE } from "../Service/urls";
import Label from "../component/Label/Label";

export default function AddEmployee({ setCurrentPage }) {

  const [regData, setRegData] = useState({
    name: "",
    email: "",
    empId: "",
    dob: "",
    doj: "",
    location: "",
    designation: "",
    contactNo: "",
    skills: [],
    role: ""
  }
  )

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorEmpId, setErrorEmpId] = useState("");
  const [errorDob, setErrorDob] = useState("");
  const [errorDoj, setErrorDoj] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [errorDesignation, setErrorDesignation] = useState("");
  const [errorContactNo, setErrorContactNo] = useState("");
  const [errorRole, setErrorRole] = useState("");
  const [errorSkills, setErrorSkills] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [popUpMessage, setPopUpMessage] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);
  
  const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  }

  function checkEmptyData() {
    if (!regData.name) {
      setErrorName("Name is required");
    }
    if (!regData.email) {
      setErrorEmail("Email is required");
    }

    if (!regData.empId) {
      setErrorEmpId("Employee Id is required");
    }
    if (!regData.dob) {
      setErrorDob("DOB is required");
    }
    if (!regData.doj) {
      setErrorDoj("DOJ is required");
    }

    if (!regData.location) {
      setErrorLocation("Location is required");
    }
    if (!regData.designation) {
      setErrorDesignation("Designation is required");
    }
    if (!regData.contactNo) {
      setErrorContactNo("Contact number is required");
    }


    if (!regData.role) {
      setErrorRole("Role is required");
    }

    if (regData.skills.length === 0) {
      setErrorSkills("Skills are required");
    }

  }
  function validateData(name, value) {

    if (name === 'name') {
      const alphaPattern = /^^[A-Za-z ]+$/;
      if (value.trim() === '') {
        setErrorName("Name is required");
      } else if (!alphaPattern.test(value)) {
        setErrorName("Name must containe only letters");
      }
      else {
        setErrorName("");
      }
    }

    if (name === 'email') {
      const pattern = /^[[a-zA-Z][a-zA-Z0-9._]+@nucleusteq\.com$/;
      if (value.trim() === '')
        setErrorEmail("Email is required");
      else if (!pattern.test(value))
        setErrorEmail("Email should be of domain @nucleusteq.com")
      else
        setErrorEmail("");
    }

    if (name === 'empId') {
      const empIdPattern = /N\d{4}$/;
      if (value.trim() === '') {
        setErrorEmpId("Employee id required");
      } else if (!empIdPattern.test(value)) {
        setErrorEmpId("Employee id Should be of pattern 'NXXXX'");
      } else if (value === 'N0000') {
        setErrorEmpId("N0000 is not a valid employee id")
      } else {
        setErrorEmpId("");
      }
    }

    const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/

    if (name === 'dob') {
      if (value.trim() === '') {
        setErrorDob("DOB is required");
      } else if (!datePattern.test(value)) {
        setErrorDob("Date should be of Pattern 'DD-MM-YYYY");
      } else if (!validDay(value)) {
        setErrorDob("DOB should not be a future date.");
      } else if (!validAge(value)) {
        setErrorDob("The Age should be above 18");
      } else {
        setErrorDob("");
      }
    }

    if (name === 'doj') {
      if (value.trim() === '') {
        setErrorDoj("DOJ is required");
      } else if (!datePattern.test(value)) {
        setErrorDoj("Date should be of Pattern 'DD-MM-YYYY");
      } else if (!validDay(value)) {
        setErrorDoj("DOJ should not be a future date.");
      } else if (!validDoj(value)) {
        setErrorDoj("DOJ should be 18 year more than DOB.")
      } else {
        setErrorDoj("");
      }
    }

    if (name === 'location') {
      if (value.trim() === '') {
        setErrorLocation("Location is required");
      } else {
        setErrorLocation("");
      }
    }

    if (name === 'designation') {
      if (value.trim() === '') {
        setErrorDesignation("Designation is required");
      } else {
        setErrorDesignation("")
      }
    }

    if (name === 'contactNo') {
      if (value.trim() === '') {
        setErrorContactNo("Contact number is required");
      } else if (!(value.length === 10)) {
        setErrorContactNo("Contact No should be of 10 digits");
      } else {
        setErrorContactNo("");
      }
    }

    if (name === 'role') {
      if (value === "") {
        setErrorRole("Role is equired");
      } else {
        setErrorRole("");
      }
    }

    if (name === 'skills') {
      if (value.length === 0) {
        setErrorSkills("Skills are required");
      } else {
        setErrorSkills("");
      }
    }
  }

  function checkErrors() {

    if (errorName === "" &&
      errorEmail === "" &&
      errorEmpId === "" &&
      errorDob === "" &&
      errorDoj === "" &&
      errorLocation === "" &&
      errorDesignation === "" &&
      errorContactNo === "" &&
      errorRole === "" &&
      errorSkills === ""
    ) {
      return true;
    }
    return false;
  }
  function validAge(date) {
    const [day1, month1, year1] = date.split('-').map(Number);

    const date1Obj = new Date(year1, month1 - 1, day1);
    const date2Obj = new Date();

    const yearDiff = date2Obj.getFullYear() - date1Obj.getFullYear();
    const monthDiff = date2Obj.getMonth() - date1Obj.getMonth();
    const dayDiff = date2Obj.getDate() - date1Obj.getDate();

    if (yearDiff < 18 || (yearDiff === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      return false;
    }
    return true;
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
  function validDoj(date) {
    const [day1, month1, year1] = regData.dob.split('-').map(Number);
    const [day2, month2, year2] = date.split('-').map(Number);

    const date1Obj = new Date(year1, month1 - 1, day1);
    const date2Obj = new Date(year2, month2 - 1, day2);

    const yearDiff = date2Obj.getFullYear() - date1Obj.getFullYear();
    const monthDiff = date2Obj.getMonth() - date1Obj.getMonth();
    const dayDiff = date2Obj.getDate() - date1Obj.getDate();

    if (yearDiff < 18 || (yearDiff === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      return false;
    }
    return true;
  }

  async function apiCall(data) {
    const resMessage = {};
    postRequest(ADD_EMPLOYEE, data).then((response) => {
      setCurrentPage('employee')
    }).catch((error) => {
      resMessage.message = error.response.data.message;
      setShowPopUp(true);
    })
    setPopUpMessage(resMessage);
  }

  function handleChange(event) {
    setRegData({ ...regData, [event.target.name]: event.target.value });
    validateData(event.target.name, event.target.value);
  }

  function handleSkillChange(selectedOptions) {
    setSelectedSkills(selectedOptions);
    const selectedSkillsValues = selectedOptions.map(option => option.value);
    setRegData({ ...regData, skills: selectedSkillsValues });
    validateData('skills', selectedSkillsValues)
  }

  function createPassword() {
    const [day, month, year] = regData.dob.split('-');

    const genPassword = regData.empId + "@" + day + month + year;

    return genPassword;
  }

  function handleSubmit(event) {
    event.preventDefault();

    checkEmptyData();
    const hashedPassword = hashPassword(createPassword());
    const hashedData = { ...regData, password: hashedPassword };

    const employee = ({
      empId: hashedData.empId,
      empName: hashedData.name,
      empEmail: hashedData.email,
      empDob: hashedData.dob,
      empDoj: hashedData.doj,
      empLocation: hashedData.location,
      empDesignation: hashedData.designation,
      empContactNo: hashedData.contactNo,
      empPassword: hashedData.password,
      empRole: regData.role,
      empSkills: regData.skills,
    })
    if (!checkErrors() || Object.values(regData).some(value => value === '') || regData.skills.length === 0) {

    } else {
      apiCall(employee);
    }

  }
  return (
    <div className="container">
      {showPopUp && <PopUp message={popUpMessage.message} onClose={() => { setShowPopUp(false); }} />}
      <div className="inner_container">
        <div className="title">
          <Label id={'title_name'} labelText={'Add Employee'} />
        </div>

        <form className='admin_form' onSubmit={handleSubmit}>
          <div className="data">

            <div className="row">
              <LableAndInputField label_text={'Name'} input_name={'name'} input_placeHolder={'Enter Name'} onChange={handleChange} />
              {errorName && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorName}</span>
              </div>}
            </div>

            <div className="row">
              <LableAndInputField label_text={'Email'} input_name={'email'} input_placeHolder={'e.g. example@nucleusteq.com'} onChange={handleChange} />
              {errorEmail && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorEmail}</span>
              </div>}
            </div>

            <div className="row">
              <LableAndInputField label_text={'Employee Id'} input_name={'empId'} input_placeHolder={'e.g. NXXXX'} onChange={handleChange} />
              {errorEmpId && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorEmpId}</span>
              </div>}
            </div>

            <div className="row">
              <LableAndInputField label_text={'DOB'} input_name={'dob'} input_placeHolder={'DD-MM-YYYY'} onChange={handleChange} />
              {errorDob && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorDob}</span>
              </div>}
            </div>

            <div className="row">
              <LableAndInputField label_text={'DOJ'} input_name={'doj'} input_placeHolder={'DD-MM-YYYY'} onChange={handleChange} />
              {errorDoj && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorDoj}</span>
              </div>}
            </div>

            <div className="row">
              <div className="inputs">
                <Label className={'input_label'} labelText={'Location'} />
                <Select
                  className={'input_field'}
                  name={'location'}
                  placeholder={'Enter Location'}
                  options={location}
                  handleChange={handleChange}
                />
              </div>
              {errorLocation && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorLocation}</span>
              </div>}
            </div>

            <div className="row">
              <div className="inputs">
                <Label className={'input_label'} labelText={'Designation'} />
                <Select
                  className={'input_field'}
                  name={'designation'}
                  placeholder={'Enter Designation'}
                  options={designation}
                  handleChange={handleChange}
                />
              </div>
              {errorDesignation && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorDesignation}</span>
              </div>}
            </div>

            <div className="row">
              <LableAndInputField label_text={'Contact No'} input_name={'contactNo'} input_placeHolder={'Enter Contact No'} onChange={handleChange} />
              {errorContactNo && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorContactNo}</span>
              </div>}
            </div>
            <div className="row">
              <div className="inputs">
                <Label className={'input_label'} labelText={'Role'} />
                <Select
                  className={'input_field'}
                  name={'role'}
                  placeholder={'Select Role'}
                  options={role}
                  handleChange={handleChange}
                />
              </div>
              {errorRole && <div className="error-div">
                <div className="error-div-empty"></div>
                <span className='errors'>{errorRole}</span>
              </div>}
            </div>

            <div className="row">
              <div className="inputs">
                <Label className={'input_label'} labelText={'Skills'} />
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

            <div className="submit">
              <Button className={'submit_btn'} type={'submit'} buttonText={'Add Employee'} />
            </div>

            <div className="cancel">
              <Button className={'cancel_btn'} type={'text'} onClick={() => setCurrentPage('employee')} buttonText={'Cancel'} />
            </div>

          </div>
        </form>
      </div>

    </div>
  )
}