import React from 'react'

export default function NoData({message}) {
    return (
        <div className='no-pending-request-outer'>
            <div className='no-pending-request-inner'>
                <div className="no-pending-request-message">
                    {message}
                </div>
            </div>
        </div> 
    );
}
