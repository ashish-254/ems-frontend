import React, { useState } from 'react';
import '../../styles/CardsStyle.css';
import PopUp from '../customealert/PopUpReadMore'
import Button from '../Button/Button';
export default function CardCopy({ data }) {

    const [popUpMessage, setPopUpMessage] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
    const [readMoreButton, setReadMoreButton] = useState(false);

    function readMore(description) {
        const resMessage = {};
        resMessage.message = description;
        setPopUpMessage(resMessage);
        setShowPopUp(true);
    }

    useState(() => {
        if (data.description.length > 50) {
            setReadMoreButton(true);
        }
    }, [])


    return (
        <>
            {showPopUp && <PopUp message={popUpMessage.message} onClose={() => { setShowPopUp(false); }} />}
            <div className="card-1">
                <div className="card-inner">
                    <div className="left-section-1">
                        <div className="employee-name-1 larger">{data.projectName}</div>
                        <div className="smaller-1"><strong>Head: </strong>{data.managerName}</div>
                    </div>
                    <div className="right-section-1">
                        <div className="field-1"><strong>Project Id: </strong>{data.id}</div>
                        <div className="field-1"><strong>Start Date: </strong>{data.startDate}</div>
                    </div>
                </div>
                <div className="full-width-description">
                    <div className="field-2">
                        <div className="field-2-inside"><label className='field-2-label'>Description:</label>
                            <span>
                                {data.description.slice(0, 50)}
                                {readMoreButton && <Button className={'read-more'} onClick={() => readMore(data.description)} buttonText={'...Read More'} />}
                            </span>
                        </div>
                    </div>

                    <div className="field-2"><span><label className='field-2-label'>Skills:</label>{data.skills.join(', ')}</span></div>
                    <div className="field-2"><label className='field-2-label'>Team:</label> {data.team.length === 0 ? 'N/A' : data.team.join(', ')}</div>
                </div>
            </div>

        </>
    )
}
