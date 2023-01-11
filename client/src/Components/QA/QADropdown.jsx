import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import s from './QADropdown.module.css'

const QADropdown = ({ question, answer }) => {
  const [show, setShow] = useState(false)
  const parent = useRef(null)
  const dm = useSelector(state => state.darkMode);

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return <div className={s.qa} ref={parent}>
    <br />
    <strong className={`dropdown-label ${dm ? s.DMquestion : s.question}`}  onClick={reveal}>{ question }&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown} /></strong>
    { show && <p className={`dropdown-content ${dm ? s.DManswer : s.answer}`} >{ answer }</p> }
  </div>
}

export default QADropdown