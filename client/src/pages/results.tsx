import React from 'react'
import { motion } from 'framer-motion'
import './../styles/results.scss'
import { useAppSelector } from '../store/hooks'
import { socket } from '../service/socket'
export default function results() {
  const players = useAppSelector((state) => state.players.playersList)
  const questions = useAppSelector((state) => state.questions.questionsList)

  const playersRank = () => {
    const sortedPlayers = Object.keys(players).sort((a, b) => {
      return players[b].score - players[a].score
    })

    const podiumStyle = (index: number) => {
      if (index === 0) {
        return 'first'
      } else if (index === 1) {
        return 'second'
      } else if (index === 2) {
        return 'third'
      }
    }

    const playerTitle = (idPlayer: string) => {
      if (players[idPlayer].score === questions.length) {
        return <div className="player-rank-title flawless">Flawless</div>
      } else if (players[idPlayer].score === 0) {
        return <div className="player-rank-title">Very bad</div>
      }
    }

    const rank = sortedPlayers.map((idPlayer, index) => {
      return (
        <div className="player-rank pt-1 pb-1" key={idPlayer}>
          <div className="player-pos">
            <div className={`player-rank-position ${podiumStyle(index)}`}>
              {index + 1}
            </div>
            <div className="player-rank-name">
              {players[idPlayer].name}
              <span className="rank-icon-me">
                {socket.id === idPlayer ? <i className="eva eva-person"></i> : ''}
              </span>
            </div>
          </div>
          <div className="score-and-title">
            {playerTitle(idPlayer)}
            <div className="player-rank-score">{players[idPlayer].score}</div>
          </div>
        </div>
      )
    })
    return rank
  }

  return (
    <motion.div
      className="content results"
      key="2"
      animate={{
        x: 0,
      }}
      initial={{
        x: '-100%',
      }}
      exit={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
      <div className="background blue-bg"></div>
      <h2 className="white">RANKING</h2>
      <div className="white-content">
        <div className="player-rank titles">
          <div className="player-pos">
            <div className="position-title">POS</div>
            <div className="player-name-title">PLAYER</div>
          </div>
          <div className="score-title">SCORE</div>
        </div>
        {playersRank()}
      </div>
    </motion.div>
  )
}
