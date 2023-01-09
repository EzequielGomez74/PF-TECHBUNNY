import React from 'react'
import s from './Sidebar.module.css'
import {SidebarData} from './SidebarData'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
  return (
    <div className={s.Sidebar}>
        <ul className={s.SidebarList}>
            {SidebarData.map((val,key)=>{
                return(
                    <Link to={val.link} ><li key={key} className={s.row}>
                        {''}
                        <div className={s.icon}>{val.icon}</div>{''}
                        <div className={s.title}>
                            {val.title}
                        </div>
                    </li></Link>
                )
            })}
        </ul>
        <div className={s.icon}><FontAwesomeIcon icon={faRightFromBracket} /></div>{''}
        <div className={s.title}>Salir</div>
    </div>
  )
}

export default Sidebar