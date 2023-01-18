import React from 'react'
import './Toolbar.css'

function Backdrop({ SideBar, closeSidebar }) {
  return (
    <div className={SideBar ? `backdrop backdrop--open`: `backdrop`} onClick={closeSidebar} ></div>
  )
}

export default Backdrop