import React, { ReactElement } from 'react'
import { socket } from '../service/socket'
import './../styles/question.scss'
// import PlayerCount from './player-count'

interface QuestionProps {
  question: Question
  round: number
}

export default function question(props: QuestionProps): ReactElement {
  const handleClick = (q: Question, optIndex: number) => {
    console.log('Question : ' + q.id)
    console.log('Réponse : ' + optIndex)
    socket.emit('answerQuestion', props.round, optIndex)
  }

  console.log(props.question)
  // test
  return (
    <div className="question-content">
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
                <div className="answer-text">{opt}</div>
              </label>
              {/* <PlayerCount /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
