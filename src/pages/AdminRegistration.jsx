import React, { useEffect, useState } from "react";
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../component/customealert/PopUpSuccess";
import location from "../alllists/LocationList";
import designation from "../alllists/DesignationList";
import '../styles/AdminRegistrationStyle.css'
import Button from "../component/Button/Button";
import LableAndInputField from "../component/LabelAndInputFIeld/LabelAndInputField";
import Select from "../component/CustomSelect/Select";
import { postRequest } from "../Service/Services";
import { ADD_ADMIN } from "../Service/urls";
import Label from "../component/Label/Label";

export default function AdminRegistration() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem('login')) {
            navigate('/')
        }
    }, []);

    const [regData, setRegData] = useState(
        {
            name: "",
            email: "",
            empId: "",
            dob: "",
            doj: "",
            location: "",
            designation: "",
            contactNo: "",
            password: "",
            confirmPassword: ""
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
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

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
            setErrorEmpId("Employee id is required");
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


        if (!regData.password) {
            setErrorPassword("Password is required");
        }

        if (!regData.confirmPassword) {
            setErrorConfirmPassword("Confirm password is required");
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
            else if (value === 'ankita.sharma@nucleusteq.com')
                setErrorEmail("");
            else
                setErrorEmail("Invalid Email");
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
                setErrorDob("DOJ should not be a future date");
            } else if (!validAge(value)) {
                setErrorDob("The Age should be above 18 from current date");
            } else {
                setErrorDob("");
            }
        }

        if (name === 'doj') {
            if (value.trim() === '') {
                setErrorDoj("DOJ is required");
            } else if (!datePattern.test(value)) {
                setErrorDoj("Date should be it the form of DD-MM-YYYY");
            } else if (!validDay(value)) {
                setErrorDoj("DOJ should not be a future date");
            } else if (!validDoj(value)) {
                setErrorDoj("DOJ should be 18 year more than DOB.")
            }
            else {
                setErrorDoj("");
            }
        }

        if (name === 'location') {
            if (value === '') {
                setErrorLocation("Location is required");
            } else {
                setErrorLocation("");
            }
        }

        if (name === 'designation') {
            if (value === '') {
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

        if (name === 'password') {
            if (value.trim() === "") {
                setErrorPassword("password is required");
            } else if (value.length < 8) {
                setErrorPassword("Password must be of length 8");
            } else {
                setErrorPassword("");
            }
        }

        if (name === 'confirmPassword') {
            if (value.trim() === "") {
                setErrorConfirmPassword("Confirm password is required");
            } else if (!(regData.password === value)) {
                setErrorConfirmPassword("Password does not match");
            } else {
                setErrorConfirmPassword("");
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
            errorPassword === "" &&
            errorConfirmPassword === ""
        ) {
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
        const empId = data.empId;
        const empName = data.name;
        const empEmail = data.email;
        const empDob = data.dob;
        const empDoj = data.doj;
        const empLocation = data.location;
        const empDesignation = data.designation;
        const empContactNo = data.contactNo;
        const empPassword = data.password;
        const empRole = "Admin";

        const admin1 = { empId, empName, empEmail, empDob, empDoj, empLocation, empDesignation, empContactNo, empPassword, empRole }
        const resMessage = {};

        postRequest(ADD_ADMIN, admin1).then((response) => {
            resMessage.message = "Registration Successful. Now login on next page.";
            setShowPopUp(true);
            setTimeout(() => {
                navigate('/')
            }, 1000);
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

    function handleSubmit(event) {
        event.preventDefault();

        checkEmptyData();
        if (!checkErrors() || Object.values(regData).some(value => value === '')) {

        } else {
            const hashedPassword = hashPassword(regData.password);
            const hashedData = { ...regData, password: hashedPassword, confirmPassword: hashedPassword };
            apiCall(hashedData);
        }


    }

    return (
        <>
            {showPopUp && <PopUp message={popUpMessage.message} onClose={() => { setShowPopUp(false); }} />}
            <div className="container">
                <div className="inner_container">
                    <div className="title">
                        <Label id={'title_name'} labelText={'Registration Page'} />
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
                                <LableAndInputField label_text={'Contact Number'} input_name={'contactNo'} input_placeHolder={'Enter Contact Number'} onChange={handleChange} />
                                {errorContactNo && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorContactNo}</span>
                                </div>}
                            </div>

                            <div className="row">
                                <LableAndInputField label_text={'Password'} input_type={'password'} input_name={'password'} input_placeHolder={'Enter Password'} onChange={handleChange} />
                                {errorPassword && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorPassword}</span>
                                </div>}
                            </div>

                            <div className="row">
                                <LableAndInputField label_text={'Confirm Password'} input_type={'password'} input_name={'confirmPassword'} input_placeHolder={'Enter Confirm Password'} onChange={handleChange} />
                                {errorConfirmPassword && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorConfirmPassword}</span>
                                </div>}
                            </div>

                            <div className="rows">
                                <Button className={'submit_btn'} type={'submit'} buttonText={'Register'} />
                            </div>

                            <div className="message">
                                <label className='signin'> Already have a acount? <Link to="/"> Login</Link> here.</label>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
