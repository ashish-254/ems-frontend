import React, { useEffect, useState } from 'react';
import '../../styles/CardsStyle.css';
import { getRequest } from '../../Service/Services';
import { GET_PROJECT_BY_MANAGER_ID } from '../../Service/urls';
import CommonSelect from '../CustomSelect/CommonSelect';

export default function CardCopyManager({ data }) {
    const [projectList, setProjectList] = useState({});
    const [skills, setSkills] = useState([]);
    const [teamList, setTeamList] = useState({})
    const [team, setTeam] = useState([]);

    function showSkill(e) {
        const combinedValue = e.target.value;
        const [tempTeam, tempSkills] = combinedValue.split('|');
        setSkills(tempSkills);
        setTeam(tempTeam);
    }

    useEffect(() => {

        data.empProjectId.length !== 0 && getRequest(GET_PROJECT_BY_MANAGER_ID + data.emId).then((response) => {
            const apiData = response.data;
            const keyValueData = {};
            const temporaryTeam = {};
            apiData.forEach((item) => {
                keyValueData[item.projectName] = item.skills.join(", ");
                temporaryTeam[item.projectName] = item.team;
            });

            if (apiData.length > 0) {
                setProjectList(keyValueData);
                setTeamList(temporaryTeam);
                setSkills(apiData[0].skills.length > 0 ? apiData[0].skills.join(', ') : 'N/A');
                setTeam(apiData[0].team.length > 0 ? apiData[0].team.join(', ') : 'N/A')
            }
            setProjectList(keyValueData);
        }).catch((error) => {
        })
    }, [data.emId])

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
                    <div className="field">
                        <strong>Project: </strong>
                        <CommonSelect
                            className={'project-dropdown'}
                            name={'project_dropdown'}
                            handleChange={showSkill}
                            placeholder={"No project assigned"}
                            showDefaultOption={!(skills.length === 0)}
                            options={Object.keys(projectList).map((key) => ({
                                value: `${teamList[key]}|${projectList[key]}`,
                                label: key
                            }))}
                        />
                    </div>
                    <div className="field"><strong>Contact: </strong>{data.empContactNo}</div>
                    <div className="field "><strong>Email: </strong> {data.empEmail}</div>
                </div>
                <div className="right-section">
                    <div className="field"><strong>Employee Id: </strong>{data.empId}</div>
                    <div><br /></div>
                    <div className="field "><strong>Project Skills: </strong>{skills.length > 0 ? skills : 'N/A'}</div>
                    <div className="field "><strong>Location: </strong> {data.empLocation}</div>
                    <div className="field "><strong>Team: </strong>{team.length > 0 ? team : 'N/A'}</div>
                </div>
            </div>
        </>
    )
}
