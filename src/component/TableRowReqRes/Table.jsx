import React from 'react'
import TableRow from './TableRow'

export default function Table({data, stateVariable, setStateVariable}) {
    return (
        <table>
            <thead>
                <tr>
                    <th className='th-id'>ID</th>
                    <th className='th-projectName'>Project Name</th>
                    <th className='th-managerName'>Manager Name</th>
                    <th className='th-employeeName'>Employee Name</th>
                    <th className='th-description'>Description</th>
                    <th className='th-action'>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((object) => {
                    return <TableRow key={object.id} data={object} stateVariable={stateVariable} setStateVariable={setStateVariable} />
                })}
            </tbody>
        </table>
    )
}
