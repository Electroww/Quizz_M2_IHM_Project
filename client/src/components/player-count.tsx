import React, { useEffect } from 'react'
import { useAppSelector } from '../store/hooks'
import './../styles/player-count.scss'

interface PlayerCountProps {
  countSelectedOpt: number
}

export default function playerCount(props: PlayerCountProps) {
  const players = useAppSelector((state) => state.players.playersList)
  console.log(props.countSelectedOpt)
  return (
    <div className="players">
      {Object.keys(players).map((_, index) => {
        return index <= props.countSelectedOpt - 1 ? (
          <div key={index} className="user-icon selected">
            <i className="eva eva-person"></i>
          </div>
        ) : (
          <div key={index} className="user-icon">
            <i className="eva eva-person"></i>
          </div>
        )
      })}
    </div>
  )
}
