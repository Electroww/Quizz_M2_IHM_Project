import React from 'react'
import { useHistory } from 'react-router-dom'
import './../styles/home.scss'
import { motion } from 'framer-motion'

export default function home() {
  const history = useHistory()

  function handleClick() {
    history.push('/lobby')
  }

  return (
    <motion.div
      key="1"
      exit={{ opacity: 0 }}
      className="content home"
      transition={{ delay: 2 }}
    >
      <div className="background white-bg"></div>
      <div className="main-title">
        <div className="bar"></div>
        <h1>LEAGUE OF LEGENDS QUIZZ</h1>
      </div>
      <div className="content-element">
        <div className="input-content">
          <input className="username" placeholder="Pseudonyme" type="text" />
          <div onClick={handleClick} className="button-start">
            Start
          </div>
        </div>
        {/* <div className="online-users">Online users</div> */}
      </div>
    </motion.div>
  )
}
