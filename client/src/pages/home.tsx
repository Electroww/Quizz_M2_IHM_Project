import React from 'react'
import './../styles/home.scss'

export default function home() {
  return (
    <div className="content">
      <div className="main-title">
        <div className="bar"></div>
        <h1>LEAGUE OF LEGENDS QUIZZ</h1>
      </div>
      <div className="content-element">
        <div className="input-content">
          <input className="username" placeholder="Pseudonyme" type="text" />
          <div className="button-start">Start</div>
        </div>
        {/* <div className="online-users">Online users</div> */}
      </div>
    </div>
  )
}
