import React from 'react'
import CardsCopy from '../component/Cards/CardCopyEmployeeOrganization';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRequest } from '../Service/Services';
import { ALL_ORGANIZATION_EMPLOYEE } from '../Service/urls';
export default function EmployeeOrganizationPage() {
    const [data, setData] = useState([]);
    async function apiCall() {
        getRequest(ALL_ORGANIZATION_EMPLOYEE).then((response) => {
            setData(response.data)
        }).catch((error) => {
        })
    }
    useEffect(() => {
        apiCall();
    }, []);

    return (
        <div>
            <div className="card-container">
                <div className="outer-card">
                    <div className="cards">
                        {data
                            .sort((a, b) => a.empName.localeCompare(b.empName))
                            .map((object) => (
                                object.empId !== 'N0001' && <CardsCopy key={object.empId} data={object} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
