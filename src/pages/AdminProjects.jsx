import React, { useEffect, useState } from 'react'
import '../styles/AdminDashboardStyle.css'
import Card from '../component/Cards/CardCopyProject'
import '../styles/AdminProjectStyle.css'
import { getRequest } from '../Service/Services'
import { GET_ALL_PROJECT } from '../Service/urls'
import NoDataCard from '../component/Cards/NoDataCard'

const AdminProject = () => {
  const [data, setData] = useState([]);
  async function apiCall() {
    getRequest(GET_ALL_PROJECT).then((response) => {
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
        data.length === 0 && <NoDataCard message={"No project exist in the system."} />
      }
      {data.length !== 0 && <div>
        <div className="card-container">
          <div className="outer-card">
            <div className="cards">
              {data
                .sort((a, b) => a.projectName.localeCompare(b.projectName))
                .map((object) => (
                  <Card key={object.id} data={object} />
                ))}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default AdminProject;