import React, { createRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './../styles/home.scss'
import { motion } from 'framer-motion'
import { useAppSelector, useAppDispatch } from './../store/hooks'
import { setPlayers } from '../store/features/players-slice'
import { socket } from '../service/socket'

export default function home() {
  const history = useHistory()
  const players = useAppSelector((state) => state.players.playersList)
  const dispatch = useAppDispatch()
  const [player, setPlayer] = useState({})
  const playerName = createRef<HTMLInputElement>()

  function handleClick() {
    // dispatch(setPlayers(players))

    // revoir la logique (creation du player directos dans le store dans app )
    const name = playerName.current?.value
    if (name && name !== '' && name?.length > 2) {
      setPlayer({
        name: name,
        id: '',
        score: 0,
        ready: false,
      })
      socket.emit('newPlayer', player)
      history.push('/lobby')
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
