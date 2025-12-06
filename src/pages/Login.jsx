import React, { useEffect } from 'react'
import '../styles/AdminLoginStyle.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import PopUp from '../component/customealert/PopUp'
import { Base64 } from 'js-base64'
import Button from '../component/Button/Button';
import LableAndInputField from '../component/LabelAndInputFIeld/LabelAndInputField';
import { postRequest } from '../Service/Services';
import { LOGIN } from '../Service/urls';
import Label from '../component/Label/Label';

export default function AdminLogin({ settingIsItAdmin, settingIsItEmployee, settingIsItManager, setHeaderName }) {

    useEffect(() => {
        window.localStorage.getItem('admin') && navigate('/admin-dashboard')
        window.localStorage.getItem('employee') && navigate('/employee-dashboard')
        window.localStorage.getItem('manager') && navigate('/manager-dashboard')
    }, []);

    const [data, setData] = useState(
        {
            email: "",
            password: ""
        }
    )
    const [popUpMessage, setPopUpMessage] = useState({})
    const [showPopUp, setShowPopUp] = useState(false);
    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('')

    function checkEmptyData() {
        if (data.email === '') {
            setErrorEmail("Email field should not be empty.");
        }
        if (data.password === '') {
            setErrorPassword("Password field should not be empty.");
        }
    }

    function validateData(name, value) {
        const pattern = /^[a-zA-Z][a-zA-Z0-9._]+@nucleusteq\.com$/;
        if (name === 'email') {
            if (value === "")
                setErrorEmail("Email is required");
            else if (pattern.test(value))
                setErrorEmail("");
            else
                setErrorEmail("Email should be of domain @nucleusteq.com")
        }

        if (name === 'password') {
            if (value === "") {
                setErrorPassword("required");
            } else if (value.length < 8) {
                setErrorPassword("Password must of length 8");
            } else {
                setErrorPassword("");
            }
        }
    }

    function checkErrors() {
        if (errorEmail === '' && errorPassword === '') {
            return true;
        }
        return false;
    }

    async function apiCall(reqData) {
        const resMessage = {};

        postRequest(LOGIN, reqData).then((response) => {
            resMessage.message = response.data.message;
            const firstName = response.data.empName ? response.data.empName.split(" ")[0] : "";
            setHeaderName('Hello, ' + firstName + '!')
            window.localStorage.setItem("header", 'Hello, ' + firstName + '!')
            window.localStorage.setItem('login', true)
            if (response.data.role === 'Admin') {
                window.localStorage.setItem('admin', true);
                settingIsItAdmin();
                window.localStorage.setItem('adminEmail', reqData.empEmail)
                navigate("/admin-dashboard")
            }
            if (response.data.role === 'Employee') {
                window.localStorage.setItem('employee', true)
                settingIsItEmployee();
                window.localStorage.setItem('employeeEmail', reqData.empEmail)
                navigate('/employee-dashboard')
            }
            if (response.data.role === 'Manager') {
                window.localStorage.setItem('manager', true)
                settingIsItManager();
                window.localStorage.setItem('managerEmail', reqData.empEmail)
                navigate('/manager-dashboard')
            }
        }).catch((error) => {
            resMessage.message = error.response.data.message;
            setShowPopUp(true);
        })


        setPopUpMessage(resMessage);
    };

    function handleChange(event) {
        setData({ ...data, [event.target.name]: event.target.value })
        validateData(event.target.name, event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        checkEmptyData();
        if (!checkErrors() || Object.values(data).some(value => value === '')) {
            
        } else {
            const encodedPassword = Base64.encode(data.password);
            const empEmail = data.email;
            const empPassword = encodedPassword;
            const loginData = { empEmail, empPassword }
            apiCall(loginData);
        }
    }

    return (
        <>
            {showPopUp && <PopUp message={popUpMessage.message} onClose={() => { setShowPopUp(false); }} />}
            <div className="container">
                <div className="inner_container">
                    <div className="title">
                        <Label id={'title_name'} labelText={'Login Form'}/>
                    </div>
                    <form onSubmit={handleSubmit} className='admin_form' id="id">
                        <div className="data">

                            <div className="row">
                                <LableAndInputField label_text={'E-Mail'} input_name={'email'} input_placeHolder={'Enter your email here'} onChange={handleChange} />
                                {errorEmail && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorEmail}</span>
                                </div>}
                            </div>

                            <div className="row">
                                <LableAndInputField label_text={'Password'} input_type={'password'} input_name={'password'} input_placeHolder={'Enter your password here'} onChange={handleChange} />
                                {errorPassword && <div className="error-div">
                                    <div className="error-div-empty"></div>
                                    <span className='errors'>{errorPassword}</span>
                                </div>}
                            </div>

                            <div className="submit">
                                <Button className={'submit_btn'} type={'submit'} buttonText={'Login'} />
                            </div>

                            <div className="message">
                                <label className='signin'> Not have any account? <Link to="/add-admin">Sign Up</Link> here.</label>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
