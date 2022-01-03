import React, { ReactElement, useEffect, useState } from 'react'
import { socket } from '../service/socket'
import './../styles/question.scss'
import PlayerCount from './player-count'

interface QuestionProps {
  question: Question
  round: number
  countdown: number
}
interface PlayersOpt {
  [key: string]: number
}

export default function question(props: QuestionProps): ReactElement {
  const [playersOpt, setPlayersOpt] = useState<PlayersOpt>({})
  const [answer, setAnswer] = useState('')

  const handleClick = (q: Question, optIndex: number) => {
    socket.emit('answerQuestion', optIndex, props.round)
  }

  useEffect(() => {
    socket.on('newAnswer', (player, opt) => {
      setPlayersOpt((prev) => {
        return { ...prev, [player]: opt }
      })
    })

    socket.on('newRound', (answer) => {
      setAnswer(answer)
      // wait 5 seconds to clear the playersOpt
      setTimeout(() => setPlayersOpt({}), 5000)
    })
  }, [])

  const getCountSelectedOpt = (opt: number) => {
    let count = 0
    Object.keys(playersOpt).forEach((key) => {
      if (playersOpt[key] === opt) count++
    })
    return count
  }

  // test
  return (
    <div className="question-content">
      {props.countdown > 0 ? (
        <div className="countdown-answer">Next round in {props.countdown}</div>
      ) : null}
      <div key={props.question.id} className="question-block">
        <div className="question">
          <div className="question-head">
            <div className="question-id">{props.question.id.toUpperCase()}</div>
            <h3 className="question-title">{props.question.text}</h3>
          </div>
          <br />
          {props.question.options.map((opt: string, index: number) => (
            <div className="answer" key={props.question.id + '_' + opt}>
              <label htmlFor={opt} className="answer-check">
                <input
                  type="radio"
                  name={props.question.id}
                  id={opt}
                  onClick={() => handleClick(props.question, index)}
                />
                <span className="answer-checkbox"></span>
                <span className="answer-text">{opt}</span>
                {props.countdown > 0 && parseInt(answer) === index ? (
                  <span className="q-answer">was the good answer</span>
                ) : null}
              </label>
              <PlayerCount countSelectedOpt={getCountSelectedOpt(index)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
