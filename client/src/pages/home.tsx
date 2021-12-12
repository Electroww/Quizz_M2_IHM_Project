import React, { createRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './../styles/home.scss'
import { motion } from 'framer-motion'
import { useAppSelector } from './../store/hooks'
import { socket } from '../service/socket'

export default function home() {
  const history = useHistory()
  const players = useAppSelector((state) => state.players.playersList)

  const playerName = createRef<HTMLInputElement>()

  function handleClick() {
    const name = playerName.current?.value
    if (name && name !== '' && name?.length > 2) {
      socket.emit('newPlayer', name)
      history.push('/lobby')
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  useEffect(() => {
    console.log('players home', players)
  }, [players])

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
      </div>
    </motion.div>
  )
}
