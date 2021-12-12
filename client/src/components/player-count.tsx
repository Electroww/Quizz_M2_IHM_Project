import React from 'react'
import './../styles/player-count.scss'

export default function playerCount() {
  return (
    <div className="players">
      {[1, 2, 3].map((key) => (
        <div key={key} className={`user-icon`}>
          <i className="eva eva-person"></i>
        </div>
      ))}
    </div>
  )
}
