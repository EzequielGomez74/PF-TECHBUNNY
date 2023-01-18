import React, { useState } from 'react'
import Backdrop from '../Toolbar/Backdrop'
import Sidebar from '../Toolbar/Sidebar'
import Toolbar from '../Toolbar/Toolbar'
import data from './mock-data.json'

function Dashboard() {

  const [sidebar, setSidebar] = useState(false)

  const [contacts, setContacts] = useState(data);

  const toggleSidebar = () => {
    setSidebar((prevState)=> !prevState)
  }

  return (
    <div>
      <div>
        <Toolbar openSidebar={toggleSidebar} />
        <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
        <Sidebar SideBar={sidebar} />
      </div>
      <div className='app-container'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jenny Chan</td>
              <td>3 waterfoot road</td>
              <td>333-962-7516</td>
              <td>jenny.chan@email.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard