import React, { useState } from 'react';
import '../../styles/CardsStyle.css';

export default function CardCopyEmployeeOrganization({ data }) {
    const [manager, setManager] = useState('');

    useState(async () => {
        setManager(data.managerName);
    }, [])

    const formatDesignation = (value) => {
        const words = value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return words.join(' ');
    };

    return (
        <>
            <div className="card">
                <div className="left-section">
                    <div className="employee-name larger">{data.empName}</div>
                    <div className="field smaller">{formatDesignation(data.empDesignation)}</div>
                    <div className="field "><strong>Email: </strong> {data.empEmail}</div>
                    <div className="field "><strong>Manager: </strong> {manager}</div>
                    <div className="field"><strong>Contact: </strong>{data.empContactNo}</div>
                </div>
                <div className="right-section">
                    <div className="field"><strong>Employee Id: </strong>{data.empId}</div>
                    <div><br /></div>
                    <div className="field "><strong>DOB: </strong> {data.empDob}</div>
                    <div className="field "><strong>DOJ: </strong> {data.empDoj}</div>
                    <div className="field "><strong>Location: </strong> {data.empLocation}</div>
                </div>
            </div>
        </>
    )
}
