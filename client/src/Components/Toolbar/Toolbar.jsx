import React from 'react'
import './Toolbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Toolbar({openSidebar}) {
  return (
    <div className='ToolBar'>
      <div className='burger' onClick={openSidebar} >
        <FontAwesomeIcon className='menuBar' icon={faBars} />
      </div>
      <div className='title'>TECHBUNNY</div>
    </div>
  )
}

export default Toolbar