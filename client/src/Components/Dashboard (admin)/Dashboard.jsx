import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import s from './Dashboard.module.css'

function Dashboard() {
  return (
    <div className={s.dashboard}>
        <Sidebar />
    </div>
  )
}

export default Dashboard