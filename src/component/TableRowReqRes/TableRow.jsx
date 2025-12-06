import React, { useState } from 'react';
import PopUp from '../customealert/PopUp';
import '../../styles/TableRowStyle.css';
import { deleteRequest, postRequest } from '../../Service/Services';
import { ACCEPT_REQUEST, DELETE_REQUEST } from '../../Service/urls';

export default function TableRow({ data, stateVariable, setStateVariable }) {

    const [popUpMessage, setPopUpMessage] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);

    async function rejectRequest() {
        const resMessage = {};

        deleteRequest(DELETE_REQUEST + data.id).then((response) => {
            setStateVariable(!stateVariable);
        }).catch((error) => {
            resMessage.message = error.response.data.message;
            setShowPopUp(true);
        })
        setPopUpMessage(resMessage);
    }

    function acceptRequest() {
        const resMessage = {};
        const updateDto = {
            projectId: data.projectId,
            managerId: data.managerId,
            employeeId: data.employeeId
        }

        postRequest(ACCEPT_REQUEST, updateDto).then((response) => {
            setStateVariable(!stateVariable);
        }).catch((error) => {
            resMessage.message = error.response.data.message;
            setShowPopUp(true);
        })
        setPopUpMessage(resMessage);
    }

    return (
        <>
            {showPopUp && <PopUp message={popUpMessage.message} onClose={() => { setShowPopUp(false); }} />}
            <tr>
                <td>{data.id}</td>
                <td>{data.projectName}</td>
                <td>{data.managerName}</td>
                <td>{data.empName}</td>
                <td>{data.comment}</td>
                <td className='action-column'>
                    <div className='action-button-div'>
                        <button className='action-button-accept' onClick={() => acceptRequest()}>Accept</button>
                        <button className='action-button-reject' onClick={() => rejectRequest()}>Reject</button>
                    </div>
                </td>
            </tr>
        </>
    )
}
