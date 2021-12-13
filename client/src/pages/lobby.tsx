import React, { ReactElement, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './../styles/lobby.scss'
import Players from './../components/players'
import { useHistory } from 'react-router'
import { useAppSelector } from '../store/hooks'
import { socket } from '../service/socket'

export default function lobby(): ReactElement {
  const history = useHistory()
  const players = useAppSelector((state) => state.players.playersList)

  const handleClick = () => {
    socket.emit('playerReady')
  }

  useEffect(() => {
    const allPlayersReady = Object.keys(players).every((id) => players[id].ready)
    if (
      allPlayersReady &&
      Object.keys(players).filter((id) => players[id].name !== '').length > 1
    ) {
      history.push('/quizz')
    }
  }, [players])

  const readyIconAnimation = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
  }

  return (
    <motion.div
      className="content lobby"
      key="2"
      animate={{
        x: 0,
      }}
      initial={{
        x: '100%',
      }}
      exit={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
      <div className="blue-bg background"></div>
      <div>
        <h2 className="white">LOBBY</h2>
        <div className="lobby-content">
          <div className="lobby-title">Online users</div>
          <Players />
        </div>
        <div className="ready-content">
          <div className="ready-title">
            {Object.keys(players).filter((id) => players[id].name !== '').length === 1 ? (
              <>
                <i className="eva eva-alert-circle-outline"></i>
                <span>Waiting for another player to start a game</span>
              </>
            ) : (
              ''
            )}
          </div>
          <div onClick={handleClick} className="ready-button">
            <AnimatePresence exitBeforeEnter>
              {players[socket.id].ready ? (
                <motion.i
                  className="eva eva-checkmark-circle-2-outline confirm-ready"
                  initial="initial"
                  animate="in"
                  exit="initial"
                  variants={readyIconAnimation}
                ></motion.i>
              ) : (
                ''
              )}
            </AnimatePresence>
            Ready
          </div>
        </div>
      </div>
    </motion.div>
  )
}
