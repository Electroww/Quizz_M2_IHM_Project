import React from 'react'
import { motion } from 'framer-motion'
import './../styles/results.scss'
import { useAppSelector } from '../store/hooks'
export default function results() {
  const players = useAppSelector((state) => state.players.playersList)
  const playersRank = () => {
    const sortedPlayers = Object.keys(players).sort((a, b) => {
      return players[b].score - players[a].score
    })
    const rank = sortedPlayers.map((idPlayer, index) => {
      return (
        <div className="player-rank" key={idPlayer}>
          <div className="player-pos">
            <div className="player-rank-position">{index + 1}</div>
            <div className="player-rank-name">{players[idPlayer].name}</div>
          </div>
          <div className="player-rank-score">{players[idPlayer].score}</div>
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
        <div className="player-rank">
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
