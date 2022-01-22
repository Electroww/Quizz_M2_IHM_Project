import React, { ReactElement } from 'react'
import { socket } from '../service/socket'
import { useAppSelector } from '../store/hooks'
import './../styles/players.scss'

export default function users(): ReactElement {
  const players = useAppSelector((state) => state.players.playersList)

  return (
    <div className="player-list-content">
      {Object.keys(players)
        .filter((id: string) => players[id].name !== '')
        .map((id: string) => (
          <div className="player-item" key={id}>
            <div className="item-right">
              <div className="pic-profile">
                {players[id].name.slice(0, 2).toUpperCase()}
              </div>
              <div className="player-username">{players[id].name}</div>
              <div className="player-you">
                {id === socket.id ? <i className="eva eva-person"></i> : ''}
              </div>
            </div>
            <div>
              <div
                className={`player-ready ${players[id].ready ? 'ready' : 'not-ready'}`}
              >
                <i className="eva eva-checkmark-outline"></i>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
