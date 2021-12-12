import React, { ReactElement } from 'react'
import './../styles/question.scss'
// import PlayerCount from './player-count'
interface QuestionProps {
  question: Question
}

export default function question(props: QuestionProps): ReactElement {
  const handleClick = (q: Question, opt: string) => {
    console.log('Question : ' + question.id)
    console.log('Réponse : ' + opt)
  }
  const { question } = props
  // test
  return (
    <div className="question-content">
      <div key={question.id} className="question-block">
        <div className="question">
          <div className="question-head">
            <div className="question-id">{question.id.toUpperCase()}</div>
            <h3 className="question-title">{question.question}</h3>
          </div>
          <br />
          {question.options.map((opt: string) => (
            <div className="answer" key={question.id + '_' + opt}>
              <label htmlFor={opt} className="answer-check">
                <input
                  type="radio"
                  name={question.id}
                  id={opt}
                  onClick={() => handleClick(question, opt)}
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
