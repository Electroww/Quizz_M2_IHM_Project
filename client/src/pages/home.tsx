import React, { createRef } from 'react'
import { useHistory } from 'react-router-dom'
import './../styles/home.scss'
import { motion } from 'framer-motion'
import { socket } from '../service/socket'
import { useAppSelector } from '../store/hooks'

export default function home() {
  const history = useHistory()
  const playerName = createRef<HTMLInputElement>()
  const players = useAppSelector((state) => state.players.playersList)
  const [nameTaken, setNameTaken] = React.useState(false)

  function handleClick() {
    const name = playerName.current?.value
    console.log(players)
    if (name && name !== '' && name?.length > 2 && !isPlayerNameExist()) {
      socket.emit('newPlayer', name)
      history.push('/lobby')
    }
  }

  function isPlayerNameExist() {
    const name = playerName.current?.value
    const exist = Object.keys(players).filter((id) => players[id].name === name)
    if (exist.length > 0) {
      setNameTaken(true)
      return true
    } else {
      return false
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleClick()
    }
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
          <input
            ref={playerName}
            onKeyPress={handleKeyPress}
            className="username"
            placeholder="Pseudonyme"
            type="text"
          />
          <div onClick={handleClick} className="button-start">
            Start
          </div>
        </div>
        {nameTaken ? <div className="error">Username already taken</div> : ''}
      </div>
    </motion.div>
  )
}
