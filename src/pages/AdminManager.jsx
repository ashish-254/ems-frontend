import React, { useEffect, useState } from 'react'
import '../styles/AdminDashboardStyle.css'
import CardsCopy from '../component/Cards/CardCopyManager'
import { getRequest } from '../Service/Services';
import { ALL_MANAGER } from '../Service/urls';
import NoDataCard from '../component/Cards/NoDataCard'

export default function AdminManager() {
  const [data, setData] = useState([]);

  async function apiCall() {
    getRequest(ALL_MANAGER).then((response) => {
      setData(response.data)
    }).catch((error) => {
    })
  }
  useEffect(() => {
    apiCall();
  }, []);

  return (
    <>
      {
        data.length === 0 && <NoDataCard message={"No manager exist in the system."} />
      }
      {data.length !== 0 && <div>
        <div className="card-container">
          <div className="outer-card">
            <div className="cards">
              {data
                .sort((a, b) => a.empName.localeCompare(b.empName))
                .map((object) => (
                  <CardsCopy key={object.empId} data={object} />
                ))}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
