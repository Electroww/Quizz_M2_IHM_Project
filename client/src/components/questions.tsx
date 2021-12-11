import React, { ReactElement } from 'react'
import Container from 'react-bootstrap/Container'
import { Socket } from 'socket.io-client'

interface QuestionProps {
  questions: Array<Question>
  socket: Socket
}

export default function questions(props: QuestionProps): ReactElement {
  const handleClick = (q: Question, opt: string) => {
    console.log('Question : ' + q.id)
    console.log('Réponse : ' + opt)
  }
  // test
  return (
    <Container className="questions">
      <h2>Questions</h2>
      {props.questions.map((q: Question) => (
        <div key={q.id} className="question-block">
          <div className="question">
            <h3 id="question_title">
              {q.id} : {q.question}
            </h3>
            <br />
            {q.options.map((opt: string) => (
              <div key={q.id + '_' + opt}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={q.id}
                    id={opt}
                    onClick={() => handleClick(q, opt)}
                  />
                  <label className="form-check-label" htmlFor={opt}>
                    {opt}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  )
}
