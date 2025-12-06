import React, { useEffect, useState } from 'react'
import '../styles/RequestResoursePageStyle.css'
import { getRequest } from '../Service/Services';
import { GET_ALL_REQUEST_RESOURCE } from '../Service/urls';
import Table from '../component/TableRowReqRes/Table';
import NoDataCard from '../component/Cards/NoDataCard'

export default function RequestResoursePage() {
    const [data, setData] = useState([]);
    const [stateVariable, setStateVariable] = useState(true);
    async function apiCall() {
        getRequest(GET_ALL_REQUEST_RESOURCE).then((response) => {
            setData(response.data);
        }).catch((error) => {
        })
    }
    useEffect(() => {
        apiCall();
    }, [stateVariable])
    return (
        <>
            {
                data.length === 0 && <NoDataCard message={"Not having any pending request."}/>
            }
            {data.length > 0 && <div className='req-res-table'>
                <div className='inside-req-res-table'>
                    <Table data={data} stateVariable={stateVariable} setStateVariable={setStateVariable} />
                </div>
            </div>}
        </>
    )
}
